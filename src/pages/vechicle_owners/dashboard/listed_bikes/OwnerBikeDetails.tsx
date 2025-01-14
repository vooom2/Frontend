/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { FileText } from "lucide-react"
import BikeRemittanceTable from "./bike_remittance_table"
import { useParams } from "react-router"
import { useEffect, useState } from "react"
import OwnerServices from "@/api/owner.services"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { getLocalFriendlyDate } from "@/utils/utils"

type Vehicle = {
    _id: string;
    vehicle_owner: string;
    vehicle_images: string[];
    state: string;
    lga: string;
    vehicle_number: string;
    initial_mileage: string;
    make: string;
    model: string;
    chasis_state: string;
    features: {
        transmission: string;
        bluetooth: string;
        android: string;
        camera: string;
        aux: string;
        gps: string;
        usbInput: string;
        usbOutput: string;
    };
    verified_vehicle: boolean;
    active_vehicle: boolean;
    rider: {
        _id: string;
        full_name: string;
        email: string;
        img: string;
        createdAt: string;
    };
    documents: {
        vio: string;
        amac: string;
        lga: string;
        insurance: string;
        receipt: string;
        _id: string;
    };
    createdAt: string;
    updatedAt: string;
};

type OwnerBikeDetailsProps = {
    vehicle: Vehicle;
    inspection: any[];
};

export default function OwnerBikeDetails() {
    const { id } = useParams();
    const [vehicleDetails, setVehicleDetails] = useState<OwnerBikeDetailsProps | null>();

    useEffect(() => {
        const fetchDetails = async () => {
            const res = await OwnerServices.getVehicleDetails(id ?? "");
            console.log(res);
            if (res != null) {
                setVehicleDetails(res as OwnerBikeDetailsProps)
            }
        }

        fetchDetails();
    }, [])
    return (
        <div className="mx-auto w-full space-y-8 relative container">
            {vehicleDetails && <>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <Card className="bg-gray-100 p-6 space-y-4">
                            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                                <img
                                    src={vehicleDetails.vehicle.vehicle_images[0]}
                                    alt="vehicle image"
                                    className="object-cover"
                                />
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                {vehicleDetails.vehicle.vehicle_images.slice(1).map((src, i) => (
                                    <div key={i} className="relative aspect-square overflow-hidden rounded-lg">
                                        <img
                                            src={src}
                                            alt={`Motorcycle view ${i + 2}`}
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </Card>
                        <Card className="bg-gray-100 p-6">
                            <div className="flex items-center justify-between">
                                <div className="w-full">
                                    <div className="flex justify-between w-full">
                                        <h1 className="text-2xl font-bold">{vehicleDetails.vehicle.model}</h1>
                                        <Badge
                                            variant="secondary"
                                            className={
                                                vehicleDetails.vehicle.verified_vehicle
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-red-100 text-red-800"
                                            }
                                        >
                                            {vehicleDetails.vehicle.verified_vehicle ? "Assigned" : "Not assigned"}
                                        </Badge>
                                    </div>
                                    <div className="flex gap-6 justify-between text-sm text-gray-500 mt-4">
                                        <p className="space-y-2 text-center">Reg number
                                            <span className="block font-bold text-bold text-black text-sm">{vehicleDetails.vehicle.vehicle_number}</span>
                                        </p>
                                        <p className="space-y-2 text-center">Bike Make
                                            <span className="block font-bold text-bold text-black text-sm">{vehicleDetails.vehicle.make}</span>
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </Card>

                        {vehicleDetails.vehicle.rider && <Card className="bg-gray-100 p-6">
                            <h3 className="text-sm font-medium text-gray-500">Rider</h3>
                            <div className="flex items-center gap-4 mt-3">
                                <Avatar className="w-14 h-14 rounded-full">
                                    <AvatarImage src={vehicleDetails.vehicle.rider?.img} className="rounded-full" />
                                    <AvatarFallback>
                                        <img
                                            src={"https://ui-avatars.com/api/?name=" + vehicleDetails.vehicle.rider.full_name}
                                            alt="Profile preview"
                                            className="rounded-lg object-cover w-20"
                                        />
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h2 className="text-xl font-semibold text-black">{vehicleDetails.vehicle.rider.full_name}</h2>
                                    <p className="text-sm text-gray-500">Since {getLocalFriendlyDate(vehicleDetails.vehicle.rider.createdAt)}</p>
                                </div>

                            </div>
                        </Card>}
                    </div>

                    <div className="space-y-6">
                        <Card className="p-6 bg-gray-100">
                            <h2 className="text-lg font-semibold mb-4">Features</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10">

                                {Object.entries(vehicleDetails.vehicle.features).map(([key, value], i) => (
                                    <div key={i}>
                                        <p className="text-sm text-gray-500 capitalize">{key.replace(/_/g, ' ')}</p>
                                        <p className="font-medium">{value}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-10">
                                <h2 className="text-lg font-semibold mb-4">Health Status</h2>
                                <div className="flex flex-wrap gap-10">

                                    <div >
                                        <p className="text-sm text-gray-500">Chasis State</p>
                                        <p className="font-medium">{vehicleDetails.vehicle.chasis_state}</p>
                                    </div>
                                    <div >
                                        <p className="text-sm text-gray-500">Initial Milage</p>
                                        <p className="font-medium">{vehicleDetails.vehicle.initial_mileage}</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {Object.keys(vehicleDetails.vehicle.documents)
                        .filter(doc => doc !== '_id')
                        .map((doc, i) => (
                            <a
                                key={i}
                                className="flex flex-col items-center gap-2"
                                href={vehicleDetails.vehicle.documents[doc]}
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
                <BikeRemittanceTable />
            </>}
            {/* Skeleton
             */}
            {!vehicleDetails && (
                <>
                    <div className="grid md:grid-cols-2 gap-8 animate-pulse">
                        <div className="space-y-4">
                            <div className="bg-gray-200 h-[300px] rounded-lg" />
                            <div className="grid grid-cols-4 gap-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="bg-gray-200 h-20 rounded-lg" />
                                ))}
                            </div>
                            <div className="bg-gray-200 h-32 rounded-lg" />
                            <div className="bg-gray-200 h-24 rounded-lg" />
                        </div>
                        <div className="space-y-6">
                            <div className="bg-gray-200 h-96 rounded-lg" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex flex-col items-center gap-2">
                                <div className="bg-gray-200 w-16 h-16 rounded-lg" />
                                <div className="bg-gray-200 w-20 h-4 rounded" />
                            </div>
                        ))}
                    </div>

                    <TableSkeleton />
                </>
            )}
        </div>
    )
}


const TableSkeleton = () => {
    const loadingRows = Array(5).fill(null);
    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-4 rounded-md overflow-clip">
                <Table>
                    <TableHeader className="bg-black">
                        <TableRow>
                            {/* Header Skeletons */}
                            {Array(5).fill(null).map((_, index) => (
                                <TableHead key={`header-${index}`}>
                                    <div className="h-4 bg-gray-500 rounded animate-pulse w-24"></div>
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loadingRows.map((_, rowIndex) => (
                            <TableRow
                                key={`row-${rowIndex}`}
                                className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                            >
                                <TableCell>
                                    <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                                </TableCell>
                                <TableCell>
                                    <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                                </TableCell>
                                <TableCell>
                                    <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                                </TableCell>
                                <TableCell>
                                    <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                                </TableCell>
                                <TableCell>
                                    <div className="h-4 bg-gray-200 rounded animate-pulse w-28"></div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};
