import { create } from 'zustand'

interface VehicleStats {
    totalActiveVehicles: number
    totalInactiveVehicles: number
    totalVehicles: number,
    setStats: (stat: VehicleStats) => void,
}


export const useOwnerVehicleStatsStore = create<VehicleStats>((set) => ({
    totalActiveVehicles: 0,
    totalInactiveVehicles: 0,
    totalVehicles: 0,
    setStats: (stats) => set(stats),
}))