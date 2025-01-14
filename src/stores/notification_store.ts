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
    notifications: Notification[] | null
    setNotifications: (notification: Notification[]) => void
}

export const useNotificationStore = create<NotificationStore>((set) => ({
    notifications: null,
    setNotifications: (notifications) =>
        set(() => ({
            notifications: notifications,
        })),

}))