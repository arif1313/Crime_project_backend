export interface IUser {
  _id?: string;
  name: string;
  email: string;
  contactNumber: string;
  password: string;
  role: "localUser" | "localPolice" | "centerPolice"|"actionTeam";
  isBlocked?: boolean;
  isDeleted?: boolean;
}
