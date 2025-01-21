import { useNotificationStore } from "@/stores/notification_store"
import { Card } from "./ui/card"
import { Skeleton } from "./ui/skeleton"
import { useEffect } from "react";
import UserService from "@/api/user.services";
import { Bell, Mail, AlertCircle, BellOffIcon } from "lucide-react";

export const NotificationIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "message":
      return <Mail className="w-5 h-5 text-blue-500" />;
    case "alert":
      return <AlertCircle className="w-5 h-5 text-red-500" />;
    default:
      return <Bell className="w-5 h-5 text-gray-500" />;
  }
};

function NotificationPanel() {
  const notificationStore = useNotificationStore();
  useEffect(() => {
    const fetch = async () => {
      const res = (await UserService.getNotifications()) as {
        notifications: [];
      };
      if (res) {
        notificationStore.setNotifications(res.notifications);
      }
    };
    fetch();
  }, []);
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Notifications</h2>
        {/* <button className="text-orange-500 text-sm hover:underline">
                    View All
                </button> */}
      </div>
      <Card className="p-4">
        {notificationStore.notifications ? (
          notificationStore.notifications.length > 0 ? (
            notificationStore.notifications.map((notification) => (
              <div key={notification._id} className="flex gap-3">
                <NotificationIcon type={notification.message} />
                <div className="flex-1">
                  <p className="text-sm text-gray-600">
                    {notification.message}
                  </p>
                  <span className="text-xs text-gray-400">
                    {notification.createdAt}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div>
              <div className="flex justify-center">
                <BellOffIcon className="w-10 h-10 opacity-10" />
              </div>
              <p className="text-xs text-center mt-3 text-gray-400">
                You're all caught up here.
              </p>
            </div>
          )
        ) : (
          <Card>
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </Card>
        )}
      </Card>
    </div>
  );
}

export default NotificationPanel