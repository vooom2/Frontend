import { create } from 'zustand'

interface WalletStats {
    wallet: {
        balance: number,
        pin: string
    },
    totalWithdrawn: number,
    totalThisWeek: number,
    totalUnpaid: number,
    setStats: (stat: WalletStats) => void,
}


export const useOwnerWalletStatsStore = create<WalletStats>((set) => ({
    wallet: {
        balance: 0,
        pin: ''
    },
    totalWithdrawn: 0,
    totalThisWeek: 0,
    totalUnpaid: 0,
    setStats: (stats) => set(stats),
}))