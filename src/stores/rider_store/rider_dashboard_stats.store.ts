import { create } from "zustand";

interface DashboardStats {
  total_payments: string;
  weekly_due: string;
  outstanding_payments: string;
  inspection_count: number;
  days_to_next_inspection: number;
}

interface RiderDashboardStatStore {
  stats: DashboardStats | null;
  setStats: (stats: DashboardStats) => void;
  reset: () => void;
}

const useRiderDashboardStatStore = create<RiderDashboardStatStore>((set) => ({
  stats: null,
  setStats: (stats) => set({ stats }),
  reset: () => set({ stats: null }),
}));

export default useRiderDashboardStatStore;
