import UserModel from "../../user/user.model";

export default interface UserSession {
  id: string;
  location: { x: number, y: number };
}