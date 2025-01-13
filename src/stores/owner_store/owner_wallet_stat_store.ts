import { create } from 'zustand'

interface WalletStats {
    wallet: {
        balance: number,
        pin: string 
    },
    totalWithdrawn: number,
    totalThisWeek: number,
    totalUnpaid: number,
    hasLoaded: boolean,
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
    hasLoaded: false,
    setStats: (stats) => set({...stats, hasLoaded: true}),
}))