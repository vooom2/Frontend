import { Bell, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import MobileNav from './mobile_nav'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Link, useLocation } from 'react-router'
import { USER_ROLES } from '@/utils/constant'
import useUserStore from '@/stores/user_store'
import { Skeleton } from './ui/skeleton'
import { Input } from './ui/input'
import { useEffect } from 'react'
import UserService from '@/api/user.services'
import { useNotificationStore } from '@/stores/notification_store'
import { Card } from './ui/card'
import { NotificationIcon } from './notification_panel'

function DashboardHeader() {
  const location = useLocation();
  const userInfo = useUserStore((state) => state.userInfo);
  const notificationStore = useNotificationStore();
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
              <span className="capitalize"> {userInfo?.full_name ?? ""}</span>
              👋, Welcome to your dashboard
            </p>
          </div>

          {/* Right Section: Search, Notification, and Buttons */}
          <div className="flex items-center gap-4 flex-none md:flex-1 justify-end">
            {/* Search Input */}
            <div className="relative w-full hidden lg:block">
              <Input
                type="text"
                placeholder="Search Notification..."
                className="h-10 px-4 py-2 rounded-lg border text-sm bg-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary w-full"
              />
            </div>

            <div className="relative">
              <Popover>
                <PopoverTrigger asChild>
                  <div>
                    <Bell className="cursor-pointer" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold h-4 w-4 flex items-center justify-center rounded-full">
                      {notificationStore.notifications.length}
                    </span>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-80 space-y-2">
                  <div>
                    {notificationStore.notifications ? notificationStore.notifications.length > 0 ? notificationStore.notifications.map((notification) => (
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
                    )) :
                      <p className="text-xs text-center">Notification is empty!</p>
                      :
                      <Card >
                        <div className="space-y-4">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-full" />
                        </div>
                      </Card>

                    }
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
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader