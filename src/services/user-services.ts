import { User, UserData } from "../types/user.types";
import { DepartmentStats } from "../types/user.types";
import { capitalize } from "../utils/string-utils";

interface UserService {
  groupByUsers: (userData: UserData) => Record<string, DepartmentStats>;
}

const getInitialDepartmentStats = (): DepartmentStats => ({
  male: 0,
  female: 0,
  ageRange: "",
  hair: {},
  addressUser: {},
});

const updateGenderCount = (stats: DepartmentStats, user: User): void => {
  stats.male += user.gender === "male" ? 1 : 0;
  stats.female += user.gender === "female" ? 1 : 0;
};

const updateAgeStats = (stats: DepartmentStats, age: number): void => {
  const currentRange = stats.ageRange;
  if (!currentRange) {
    stats.ageRange = `${age}-${age}`;
    return;
  }

  const [min, max] = currentRange.split("-").map(Number);
  stats.ageRange = `${Math.min(min, age)}-${Math.max(max, age)}`;
};

const updateHairStats = (stats: DepartmentStats, hairColor?: string): void => {
  if (hairColor) {
    stats.hair[hairColor] = (stats.hair[hairColor] || 0) + 1;
  }
};

const updateAddressStats = (
  stats: DepartmentStats,
  firstName: string,
  lastName: string,
  address?: string
): void => {
  if (address) {
    const fullName = capitalize(firstName) + capitalize(lastName);
    stats.addressUser[fullName] = address;
  }
};

const userService: UserService = {
  groupByUsers: (userData: UserData) => {
    const departmentStats: Record<string, DepartmentStats> = {};

    userData?.users?.forEach((user) => {
      const { department } = user.company;

      if (!departmentStats[department]) {
        departmentStats[department] = getInitialDepartmentStats();
      }

      const stats = departmentStats[department];

      updateGenderCount(stats, user);
      updateAgeStats(stats, user.age);
      updateHairStats(stats, user.hair.color);
      updateAddressStats(
        stats,
        user.firstName,
        user.lastName,
        user.address.address
      );
    });

    return departmentStats;
  },
};

export default userService;
