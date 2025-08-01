import { Types } from "mongoose";
import { UserDocument } from "../../models/user.model";

declare global {
  namespace Express {
    interface User extends UserDocument {}
  }
}

export {};
