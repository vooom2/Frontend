import { create } from 'zustand'

interface Notification {
    _id: string
    message: string
    user: string
    global: boolean
    priority: string
    seen: boolean
    createdAt: string
}

interface NotificationStore {
    notifications: Notification[]
    setNotifications: (notification: Notification[]) => void
}

export const useNotificationStore = create<NotificationStore>((set) => ({
    notifications: [],
    setNotifications: (notifications) =>
        set(() => ({
            notifications: notifications,
        })),

}))