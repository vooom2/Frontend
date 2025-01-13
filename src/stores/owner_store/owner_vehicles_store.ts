import { create } from 'zustand';

interface RiderRating {
    payment_reliability: string;
    default_history: string;
}

interface Rider {
    _id: string;
    rider_rating: RiderRating;
    account_type: string;
    full_name: string;
    email: string;
    phone_number: number;
    password: string;
    gender: string;
    email_verified: boolean;
    number_verified: boolean;
    account_verified: boolean;
    account_active: boolean;
    protection_plan_subscription: null | string;
    vehicle: null | string;
    missed_payments: number;
    img:string;
    verification_documents: string[];
    guarantor_documents: string[];
    createdAt: string;
    verification_started: boolean;
}
interface Remittance{
payment_amount: number,
payment_status: string,
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
    rider: Rider;
    createdAt: string;
    updatedAt: string;
    inspection_count: number;
    remittance: Remittance[] | null
}

interface VehicleStore {
    vehicles: Vehicle[] | null;
    addVehicle: (vehicle: Vehicle[]) => void;
}

export const useOwnerVehiclesStore = create<VehicleStore>((set) => ({
    vehicles: null,
    addVehicle: (vehicles: Vehicle[]) => 
        set(() => ({ vehicles: vehicles })),
}));