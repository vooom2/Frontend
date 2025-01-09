import { create } from 'zustand'

interface Documents {
    vio: string;
    amac: string;
    lga: string;
    insurance: string;
    receipt: string;
}

interface Vehicle {
    _id: string;
    vehicle_owner: string;
    vehicle_images: string[];
    vehicle_type: string;
    state: string;
    lga: string;
    vehicle_number: string;
    plate_number: string;
    initial_mileage: string;
    make: string;
    model: string;
    chasis_state: string;
    features: string[];
    verified_vehicle: boolean;
    active_vehicle: boolean;
    rider: string;
    documents: Documents;
    createdAt: string;
}

interface VehicleStore {
    vehicle?: Vehicle | null;    
    setVehicle: (vehicle: Vehicle) => void;
}

export const useRiderVehicleStore = create<VehicleStore>((set) => ({
    vehicle: null,
    setVehicle: (vehicle) => set({ vehicle: vehicle }),
}));