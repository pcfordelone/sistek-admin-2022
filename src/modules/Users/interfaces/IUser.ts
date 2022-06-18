import { IEmployee } from "../../Employees/interfaces/IEmployee";

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "MASTER" | "ADMIN" | "USER";
  isActive: boolean;
  Employee?: IEmployee[];
}
