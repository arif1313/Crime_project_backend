export interface IUser {
  _id?: string;
  name: string;
  email: string;
  contactNumber: string;
  password: string;
  role: "localUser" | "localPolice" | "centerPolice";
  isBlocked?: boolean;
  isDeleted?: boolean;
}
