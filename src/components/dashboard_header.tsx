import { Bell, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import MobileNav from './mobile_nav'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Link, useLocation } from 'react-router'
import { USER_ROLES } from '@/utils/constant'
import useUserStore from '@/stores/user_store'
import { Skeleton } from './ui/skeleton'
import { useEffect, useState } from 'react'
import UserService from '@/api/user.services'
import { Notification, useNotificationStore } from '@/stores/notification_store'
import { NotificationIcon } from './notification_panel'
import { convertToLocalTime, getLocalFriendlyDate } from '@/utils/utils'

function DashboardHeader() {
  const location = useLocation();
  const userInfo = useUserStore((state) => state.userInfo);
  const notificationStore = useNotificationStore();
  const [selectedNotification, setSelectedNotificaton] = useState<Notification | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const readNotification = async (notification: Notification) => {
    setSelectedNotificaton(notification);
    setShowDialog(true);
    notificationStore.updateNotification(notification);
    await UserService.updateNotification(notification._id);
  }
  useEffect(() => {
    const fetch = async () => {
      const res = await UserService.getNotifications() as { notifications: [] };

      if (res) {
        notificationStore.setNotifications(res.notifications);
      }
    }
    fetch();
  }, [])
  return (
    <div className="sticky top-0 bg-background z-10 py-6 px-0 md:px-4">
      <div className="flex h-16 items-center px-4 gap-4 ">
        {/* Mobile Navigation */}
        <MobileNav />

        {/* Main Content */}
        <div className="flex-1 flex sm:flex-row sm:items-center sm:justify-between gap-2 ">
          {/* Left Section: Title and Welcome Text */}
          <div className="flex flex-col gap-1 flex-1">
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <p className="text-xs md:text-sm text-muted-foreground ">
              Hi{" "}
              <span className="capitalize">
                {" "}
                {userInfo?.full_name.split(" ")[0] ?? ""}
              </span>
              👋, Welcome to your dashboard
            </p>
          </div>

          {/* Right Section: Search, Notification, and Buttons */}
          <div className="flex items-center gap-4 flex-none md:flex-1 justify-end">
            {/* Search Input */}
            {/* <div className="relative w-full hidden lg:block">
              <Input
                type="text"
                placeholder="Search Notification..."
                className="h-10 px-4 py-2 rounded-lg border text-sm bg-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary w-full"
              />
            </div> */}
            <AlertDialog open={showDialog}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Notification Details</AlertDialogTitle>
                  <AlertDialogDescription>
                    <div>
                      <p className="text-sm font-medium">{selectedNotification?.message}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {selectedNotification?.priority}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {selectedNotification && getLocalFriendlyDate(selectedNotification?.createdAt)}{" "}
                        {selectedNotification && convertToLocalTime(selectedNotification?.createdAt)}
                      </p>
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction onClick={() => setShowDialog(false)}>close</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <div className="relative">
              <Popover>
                <PopoverTrigger asChild>
                  <div>
                    <Bell className="cursor-pointer" />
                    {notificationStore.notifications && notificationStore.notifications.filter((e) => e.seen == false).length > 0 && (
                      <span className="absolute -top-3 -right-2 bg-red-500 text-white text-[0.6rem] font-bold h-6 w-6 flex items-center justify-center rounded-full">
                        {notificationStore.notifications.filter((e) => e.seen == false).length > 99
                          ? "99+"
                          : notificationStore.notifications.filter((e) => e.seen == false).length}
                      </span>
                    )}
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-80 space-y-2 max-h-80 overflow-y-auto p-2">
                  <div className="space-y-2">
                    {notificationStore.notifications ? (
                      notificationStore.notifications.length > 0 ? (
                        notificationStore.notifications.map((notification) => (
                          <div key={notification._id} className={`flex gap-3 cursor-pointer ${notification.seen ? "" : "bg-muted"} p-4`}
                            onClick={() => readNotification(notification)}
                          >
                            <NotificationIcon type={notification.message} />
                            <div className="flex-1">
                              <p className="text-sm text-gray-600">
                                {notification.message}
                              </p>
                              <span className="text-[0.6rem] md:text-xs text-gray-400">
                                {getLocalFriendlyDate(notification.createdAt)}{" "}
                                {convertToLocalTime(notification.createdAt)}
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-center">
                          Notification is empty!
                        </p>
                      )
                    ) : (
                      <div className="space-y-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Contact Fleet Manager Button */}
            {location.pathname.indexOf(`${USER_ROLES.RIDER}`) != -1 && (
              <Link to={`/${USER_ROLES.RIDER}/dashboard/fleet`}>
                <Button
                  size="sm"
                  className="bg-onprimary hover:bg-onprimary/90 text-white whitespace-nowrap hidden md:block"
                >
                  Contact Fleet Manager
                </Button>
              </Link>
            )}
            {/* Host vehicle fbutton */}
            {location.pathname.indexOf(`${USER_ROLES.OWNER}`) != -1 && (
              <Link to={`/${USER_ROLES.OWNER}/dashboard/host`}>
                <Button
                  size="sm"
                  className="bg-onprimary hover:bg-onprimary/90 text-white whitespace-nowrap hidden md:block"
                >
                  Host Vehicle
                </Button>
              </Link>
            )}
            {/* Profile/Menu Icon */}
            <Link
              to={
                location.pathname.indexOf(`${USER_ROLES.RIDER}`) != -1
                  ? `/${USER_ROLES.RIDER}/dashboard/profile`
                  : `/${USER_ROLES.OWNER}/dashboard/profile`
              }
            >
              <div className="items-center gap-2 border rounded-md px-2 py-1 hidden md:block">
                <User className="h-5 w-5" />
                {/* <img
                  src={userInfo?.img ? userInfo.img : "https://ui-avatars.com/api/?name=" + userInfo?.full_name}
                  alt="Profile preview"
                  className="rounded-lg object-cover w-20 h-20"
                /> */}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader