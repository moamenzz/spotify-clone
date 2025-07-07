import NotificationComponent from "../components/NotificationComponent";

export type Notification = {
  id: number;
  title: string;
  cover: string;
  artist: string;
  slug: string;
  type: "Single" | "Album" | "Episode";
  releaseDate: Date;
};

const NotificationsPage = () => {
  const notifications: Notification[] = [
    {
      id: 1,
      title: "After All",
      artist: "Mellina Tey",
      cover: "mellina.jpg",
      slug: "after-all",
      releaseDate: new Date("Feb 27, 2025"),
      type: "Single",
    },
    {
      id: 2,
      title: "KKKK",
      artist: "Shehab",
      cover: "KKKK-shehab.jpg",
      slug: "kkkk",
      releaseDate: new Date("Feb 27, 2025"),
      type: "Single",
    },
  ];

  return (
    <div className="min-h-screen bg-[#131312] py-4">
      <div className="mx-auto max-w-[40rem]">
        <div className="flex flex-col space-y-5">
          {/* Header */}
          <div>
            <h1 className="font-bold text-2xl text-white">What's New</h1>
            <p className="text-sm font-semibold text-[#888989] flex">
              The latest releases from artists, podcasts, and shows you follow
            </p>
          </div>

          {/* Notifications */}
          <div>
            <h1 className="font-bold text-lg text-white py-3">Earlier</h1>

            {notifications.map((notification) => (
              <NotificationComponent
                key={notification.id}
                notification={notification}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
