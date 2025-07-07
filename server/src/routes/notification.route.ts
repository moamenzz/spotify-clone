import express from "express";
import { getNotifications } from "../controllers/notification.controller";

const notificationRouter = express.Router();

notificationRouter.get("/", getNotifications);

export default notificationRouter;
