import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import userService from "../services/user-services";

interface UserController {
  groupByUsers: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
}

const DATA_URL = "https://dummyjson.com/users";

const userController: UserController = {
  groupByUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await fetch(DATA_URL);
      const data = await response.json();
      const transformedData = userService.groupByUsers(data);

      res.status(StatusCodes.OK).json({
        success: true,
        groupedData: transformedData,
      });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: "Failed to fetch and process user data",
      });
    }
  },
};

export default userController;
