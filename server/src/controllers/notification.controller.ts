import { NOT_FOUND } from "../constants/HttpStatusCode";
import NotificationModel from "../models/notification.model";
import UserModel from "../models/user.model";
import appAssert from "../utils/AppAssert";
import catchErrors from "../utils/catchError";

export const getNotifications = catchErrors(async (req, res) => {
  const userId = req.userId;

  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  const userNotifications = await NotificationModel.find({ userId });

  res.status(200).json(userNotifications);
});
