import { FC } from "react";
import { Notification } from "../pages/NotificationsPage";
import { Link } from "react-router-dom";

interface NotificationProps {
  notification: Notification;
}

const NotificationComponent: FC<NotificationProps> = ({ notification }) => {
  return (
    <Link
      to={
        notification.type === "Single"
          ? `/single/${notification.slug}`
          : notification.type === "Album"
          ? `/album/${notification.slug}`
          : notification.type === "Episode"
          ? `/episode/${notification.slug}`
          : `/playlist/${notification.slug}`
      }
      className="flex p-6 group hover:bg-[#888989] gap-4 border-t border-[#888989]"
    >
      {/* Cover */}
      <div className="h-25 w-25">
        <img
          src={`/${notification.cover}`}
          alt={`${notification.title}-cover`}
          className="rounded-lg object-cover h-full w-full"
        />
      </div>

      {/* Details */}
      <div>
        <h1 className="font-bold font-lg text-white">{notification.title}</h1>
        <p className="text-sm font-semibold text-white">
          {notification.artist}
        </p>
        <p className="text-sm font-semibold text-white pt-1">
          {notification.type} · {notification.releaseDate.toLocaleString()}
        </p>
      </div>

      {/* Interaction Buttons */}
      <div className="flex mt-20"></div>
    </Link>
  );
};

export default NotificationComponent;
