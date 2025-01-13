/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router"
import { useEffect } from "react"
import { useOwnerVehiclesStore } from "@/stores/owner_store/owner_vehicles_store"
import { Skeleton } from "@/components/ui/skeleton"
import { getLocalFriendlyDate } from "@/utils/utils"
import OwnerServices from "@/api/owner.services"
import emptyImg from "@/assets/images/no_data.png";

export default function Inspection() {
    const vehicleStore = useOwnerVehiclesStore((state) => state);

    useEffect(() => {
        const fetchInfo = async () => {
            const res = await OwnerServices.getOwnerVehicles() as { vehicles: any }

            if (res != null) {
                vehicleStore.addVehicle(res.vehicles);
            }
        };
        fetchInfo();
    }, []);
    console.log(vehicleStore.vehicles);
    return (
        <div className="w-full container mx-auto p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <h2 className="text-xl font-semibold">Inspection</h2>
                {vehicleStore.vehicles ? <span className="text-sm text-onprimary">Total bikes {vehicleStore.vehicles.length}</span> :
                    <Skeleton />}
            </div>
            {vehicleStore.vehicles && <div className="space-y-4">
                {vehicleStore.vehicles.length > 0 ? vehicleStore.vehicles.map((vehicle, index) => (
                    <div
                        key={index}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-lg border gap-4 h-fit"
                    >
                        <div className="flex items-center gap-4">
                            <div className=" w-44 h-40  relative">
                                <img
                                    src={vehicle.vehicle_images[0]}
                                    alt="Motorcycle"
                                    className="object-cover rounded-md relative w-full h-full"
                                />
                            </div>
                            <div className="space-y-1 min-w-0">
                                <div className="font-medium truncate">{vehicle.model}</div>
                                <div className="text-sm text-muted-foreground">
                                    {getLocalFriendlyDate(vehicle.createdAt)}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                            <span className="text-sm text-muted-foreground whitespace-nowrap">
                                {vehicle.inspection_count} Inspection
                            </span>
                            <Badge variant="secondary" className="bg-orange-100 text-orange-600 hover:bg-orange-100">
                                {vehicle.state}
                            </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                            <Avatar className="w-12 h-12 rounded-full">
                                <AvatarImage src={vehicle.rider?.img} className="rounded-full" />
                                <AvatarFallback>
                                    <img
                                        src={"https://ui-avatars.com/api/?name=" + vehicle?.rider?.full_name}
                                        alt="Profile preview"
                                        className="rounded-lg object-cover w-20"
                                    />
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col gap-1">
                                <span className="text-sm font-medium">
                                    {vehicle?.rider?.full_name}
                                </span>
                                <span className="text-sm font-medium text-muted-foreground">
                                    Rider
                                </span>
                            </div>
                        </div>
                        <Link to={`${index}`}>
                            <Button variant="secondary" size="sm" className="w-full sm:w-auto">
                                View Details
                            </Button>
                        </Link>
                    </div>
                )) :
                    <img src={emptyImg} className="w-52 mx-auto" />
                }
            </div>}
            {!vehicleStore.vehicles && <div className="space-y-4 animate-pulse">
                {[1, 2, 3].map((_, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-lg border gap-4 h-fit">
                        <div className="flex items-center gap-4">
                            <div className="w-44 h-40 bg-gray-200 rounded-md"></div>
                            <div className="space-y-2">
                                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                                <div className="h-3 w-24 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                            <div className="h-4 w-24 bg-gray-200 rounded"></div>
                            <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                            <div className="flex flex-col gap-1">
                                <div className="h-4 w-20 bg-gray-200 rounded"></div>
                                <div className="h-4 w-16 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                        <div className="h-8 w-24 bg-gray-200 rounded"></div>
                    </div>
                ))}
            </div>}
        </div >
    )
}

