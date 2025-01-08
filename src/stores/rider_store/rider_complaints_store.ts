import { create } from "zustand";

interface ManagerResponse {
  timestamp: string;
  response: string;
}

interface Complaint {
  _id: string;
  rider: string;
  vehicle: string;
  category: string;
  date: string;
  time: string;
  fleetManager: string;
  location: string;
  detail: string;
  images: string[];
  status: "Pending" | "Resolved" | "In Progress";
  managerResponses: ManagerResponse[];
  createdAt: string;
}

interface ComplaintsStore {
  complaints: Complaint[] | null;
  setComplaints: (complaints: Complaint[]) => void;
}
const useRiderComplaintStore = create<ComplaintsStore>((set) => ({
  complaints: null,

  setComplaints: (complaints) => set({ complaints }),
}));

export default useRiderComplaintStore;
