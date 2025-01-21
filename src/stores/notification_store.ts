import { create } from 'zustand'

export interface Notification {
    _id: string
    message: string
    user: string
    global: boolean
    priority: string
    seen: boolean
    createdAt: string
}

interface NotificationStore {
    notifications: Notification[] | null
    setNotifications: (notification: Notification[]) => void
    updateNotification: (notification: Notification) => void 
}

export const useNotificationStore = create<NotificationStore>((set) => ({
    notifications: null,
    setNotifications: (notifications) =>
        set(() => ({
            notifications: notifications,
        })),
    updateNotification: (notification ) => {
        set((state) =>({
            notifications: state.notifications?.map((e) => e._id == notification._id ? {...notification, seen: true} : e)
        }))
    }
}))