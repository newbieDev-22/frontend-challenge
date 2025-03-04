import express from "express";
import userController from "../controllers/user-controller";

const userRoute = express.Router();

userRoute.get("/group-by-users", userController.groupByUsers);

export default userRoute;
