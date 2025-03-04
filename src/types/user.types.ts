export interface User {
  firstName: string;
  lastName: string;
  gender: "male" | "female";
  age: number;
  hair: {
    color?: string;
  };
  address: {
    address?: string;
  };
  company: {
    department: string;
  };
}

export interface UserData {
  users?: User[];
}

export interface DepartmentStats {
  male: number;
  female: number;
  ageRange: string;
  hair: Record<string, number>;
  addressUser: Record<string, string>;
}
