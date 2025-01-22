/* eslint-disable @typescript-eslint/no-explicit-any */
import UserService from "@/api/user.services";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useRiderVehicleStore } from "@/stores/rider_store/rider_vehicle_store";
import { FileText } from "lucide-react";
import { useEffect } from "react";

export default function MotorcycleDetails() {

    const setVehicle = useRiderVehicleStore((state) => state.setVehicle);
    const vehicle = useRiderVehicleStore((state) => state.vehicle);
    useEffect(() => {
        const fetchApprovedVehicles = async () => {
            const res = (await UserService.getRiderVehicle()) as { vehicle: any };
            if (res != null) {
                setVehicle(res.vehicle);
            }
        };

        fetchApprovedVehicles();
    }, []);

    return (
        <div>

            {vehicle ? <div className="max-w-6xl mx-auto p-4  space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                            <img
                                src={vehicle.vehicle_images[0] || "https://images.unsplash.com/photo-1603039997315-6dcb72ec1204"}
                                alt="Motorcycle main view"
                                className="object-cover"
                            />
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                            {vehicle.vehicle_images.slice(1).map((src, i) => (
                                <div
                                    key={i}
                                    className="relative aspect-square overflow-hidden rounded-lg"
                                >
                                    <img
                                        src={src}
                                        alt={`Motorcycle view ${i + 2}`}
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="w-full mt-4">
                                <div className="flex justify-between w-full">
                                    <h1 className="text-2xl font-bold">{vehicle.make}</h1>
                                    <Badge
                                        variant="secondary"
                                        className="bg-green-100 text-green-800"
                                    >
                                        {vehicle.active_vehicle ? "Active" : "Inactive"}
                                    </Badge>
                                </div>
                                <div className="flex gap-6 justify-between text-sm text-gray-500 mt-4">
                                    <p className="space-y-2 text-center">
                                        Reg number
                                        <span className="block font-bold text-bold text-black text-sm">
                                            {vehicle.vehicle_number}
                                        </span>
                                    </p>
                                    <p className="space-y-2 text-center">
                                        Vehicle number
                                        <span className="block font-bold text-bold text-black text-sm">
                                            {vehicle.vehicle_type}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <Card className="p-6 bg-gray-100">
                            <h2 className="text-lg font-semibold mb-4">Features</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10">

                                {
                                    Object.entries(vehicle.features).map(([key, value], i) => (
                                        <div key={i}>
                                            <p className="text-sm text-gray-500 capitalize">{key}</p>
                                            <p className="font-medium">{value ? "Yes" : "No"}</p>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="mt-10">
                                <h2 className="text-lg font-semibold mb-4">Health Status</h2>
                                <div className="flex flex-wrap gap-10">
                                    <div>
                                        <p className="text-sm text-gray-500">Chasis state</p>
                                        <p className="font-medium">{vehicle.chasis_state}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Initial Milage</p>
                                        <p className="font-medium">{vehicle.initial_mileage}</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {Object.keys(vehicle.documents)
                        .filter(doc => doc !== '_id')
                        .map((doc, i) => (
                            <a
                                key={i}
                                className="flex flex-col items-center gap-2"
                                href={vehicle.documents[doc]}
                            >
                                <div className="w-16 h-16 flex items-center justify-center bg-red-100 rounded-lg">
                                    <FileText className="w-8 h-8 text-red-600" />
                                </div>
                                <p className="text-xs text-center capitalize">
                                    {doc}
                                    <br />
                                    <span className="text-red-600">Available</span>
                                </p>
                            </a>
                        ))}
                </div>
            </div> : <SkeletonLoader />}
        </div>
    );
}

function SkeletonLoader() {
    return (
        <div className="max-w-6xl mx-auto p-4 space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-200 animate-pulse"></div>
                    <div className="grid grid-cols-4 gap-2">
                        {Array(4)
                            .fill(0)
                            .map((_, i) => (
                                <div
                                    key={i}
                                    className="relative aspect-square overflow-hidden rounded-lg bg-gray-200 animate-pulse"
                                ></div>
                            ))}
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="w-full mt-4">
                            <div className="flex justify-between w-full">
                                <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                                <div className="h-6 bg-gray-200 rounded w-1/6 animate-pulse"></div>
                            </div>
                            <div className="flex gap-6 justify-between text-sm text-gray-500 mt-4">
                                <div className="space-y-2 text-center w-1/2">
                                    <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto animate-pulse"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto animate-pulse"></div>
                                </div>
                                <div className="space-y-2 text-center w-1/2">
                                    <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto animate-pulse"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <Card className="p-6 bg-gray-100">
                        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4 animate-pulse"></div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10">
                            {Array(6)
                                .fill(0)
                                .map((_, i) => (
                                    <div key={i}>
                                        <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                                        <div className="h-4 bg-gray-200 rounded w-2/3 mt-2 animate-pulse"></div>
                                    </div>
                                ))}
                        </div>
                        <div className="mt-10">
                            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4 animate-pulse"></div>
                            <div className="flex flex-wrap gap-10">
                                <div>
                                    <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                                    <div className="h-4 bg-gray-200 rounded w-2/3 mt-2 animate-pulse"></div>
                                </div>
                                <div>
                                    <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                                    <div className="h-4 bg-gray-200 rounded w-2/3 mt-2 animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Array(5)
                    .fill(0)
                    .map((_, i) => (
                        <div key={i} className="flex flex-col items-center gap-2">
                            <div className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-lg animate-pulse"></div>
                            <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
