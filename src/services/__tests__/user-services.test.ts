import userService from "../user-services";
import { UserData } from "../../types/user.types";
import { describe, it, expect } from "@jest/globals";

describe("UserService", () => {
  describe("groupByUsers", () => {
    it("should correctly group users by department and calculate stats", () => {
      const mockUserData: UserData = {
        users: [
          {
            firstName: "john",
            lastName: "doe",
            age: 25,
            gender: "male",
            hair: { color: "black" },
            address: { address: "123 Main St" },
            company: { department: "IT" },
          },
          {
            firstName: "jane",
            lastName: "smith",
            age: 30,
            gender: "female",
            hair: { color: "brown" },
            address: { address: "456 Oak Ave" },
            company: { department: "IT" },
          },
          {
            firstName: "bob",
            lastName: "wilson",
            age: 35,
            gender: "male",
            hair: { color: "black" },
            address: { address: "789 Pine Rd" },
            company: { department: "HR" },
          },
        ],
      };

      const result = userService.groupByUsers(mockUserData);

      // Test IT department stats
      expect(result["IT"]).toBeDefined();
      expect(result["IT"].male).toBe(1);
      expect(result["IT"].female).toBe(1);
      expect(result["IT"].ageRange).toBe("25-30");
      expect(result["IT"].hair).toEqual({
        black: 1,
        brown: 1,
      });
      expect(result["IT"].addressUser).toEqual({
        JohnDoe: "123 Main St",
        JaneSmith: "456 Oak Ave",
      });

      // Test HR department stats
      expect(result["HR"]).toBeDefined();
      expect(result["HR"].male).toBe(1);
      expect(result["HR"].female).toBe(0);
      expect(result["HR"].ageRange).toBe("35-35");
      expect(result["HR"].hair).toEqual({
        black: 1,
      });
      expect(result["HR"].addressUser).toEqual({
        BobWilson: "789 Pine Rd",
      });
    });

    it("should handle empty user data", () => {
      const emptyUserData: UserData = {
        users: [],
      };

      const result = userService.groupByUsers(emptyUserData);
      expect(result).toEqual({});
    });

    it("should handle undefined user data", () => {
      const undefinedUserData: UserData = {
        users: undefined,
      };

      const result = userService.groupByUsers(undefinedUserData);
      expect(result).toEqual({});
    });

    it("should handle users with missing optional fields", () => {
      const mockUserData: UserData = {
        users: [
          {
            firstName: "test",
            lastName: "user",
            age: 28,
            gender: "male",
            hair: { color: undefined },
            address: { address: undefined },
            company: { department: "IT" },
          },
        ],
      };

      const result = userService.groupByUsers(mockUserData);

      expect(result["IT"]).toBeDefined();
      expect(result["IT"].male).toBe(1);
      expect(result["IT"].female).toBe(0);
      expect(result["IT"].ageRange).toBe("28-28");
      expect(result["IT"].hair).toEqual({});
      expect(result["IT"].addressUser).toEqual({});
    });
  });
});
