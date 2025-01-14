import OwnerServices from "@/api/owner.services";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { getLocalFriendlyDate } from "@/utils/utils";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import emptyImg from "@/assets/images/no_data.png";


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
    }[];
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
    inspection: Inspection[];
};
type Inspection = {
    _id: string;
    rider: string;
    vehicle: string;
    description: string;
    status: string;
    due_date: string;
    inspector: string | null;
    createdAt: string;
    updatedAt: string;
};


export default function InspectionBikeDetails() {
    const { id } = useParams();
    const [vehicleDetails, setVehicleDetails] = useState<OwnerBikeDetailsProps | null>();

    useEffect(() => {
        const fetchDetails = async () => {
            const res = await OwnerServices.getVehicleDetails(id ?? "");

            if (res != null) {
                setVehicleDetails(res as OwnerBikeDetailsProps)
            }
        }

        fetchDetails();
    }, [])

    return (
        <>
            {vehicleDetails && <div className="container mx-auto p-4 space-y-8">
                <div className="grid md:grid-cols-3 gap-8 w-full">
                    {/* Image Gallery */}
                    <div className="space-y-4 col-span-2 md:col-span-1">
                        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg">
                            <img
                                src={vehicleDetails.vehicle.vehicle_images[0]}
                                alt="Motorcycle main view"
                                className="object-cover"
                            />
                        </div>
                        <div className="grid grid-cols-3 gap-2 justify-center">
                            {vehicleDetails.vehicle.vehicle_images.slice(1).map((src, i) => (
                                <div key={i} className="relative aspect-square overflow-hidden rounded-lg w-full">
                                    <img
                                        src={src}
                                        alt={`Motorcycle view ${i + 2}`}
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-6 col-span-2">
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h1 className="text-2xl font-bold mb-2">{vehicleDetails.vehicle.make} - {vehicleDetails.vehicle.vehicle_number}</h1>
                                    <p className="text-muted-foreground">{vehicleDetails.vehicle.model}</p>
                                </div>
                                <Badge className={cn(vehicleDetails.vehicle.active_vehicle ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600")}>
                                    {vehicleDetails.vehicle.active_vehicle ? "Active" : "Inactive"}
                                </Badge>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold mb-4">Health status</h2>
                            <div className="grid gap-4">
                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                                        Chasis State
                                    </h3>
                                    <p className="font-medium capitalize">{vehicleDetails.vehicle.chasis_state}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                                        Initial Mileage
                                    </h3>
                                    <p className="font-medium">{vehicleDetails.vehicle.initial_mileage}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Inspection Table */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <h2 className="text-lg font-semibold">Inspection</h2>
                        <Badge variant="outline">Every 2 weeks</Badge>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                        <Card className="lg:col-span-4">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Inspection Date</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Inspector</TableHead>
                                        <TableHead>Due Date</TableHead>
                                    </TableRow>
                                </TableHeader>
                                {vehicleDetails.inspection.length > 0 ? <TableBody>
                                    {vehicleDetails.inspection.map((inspection, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">{getLocalFriendlyDate(inspection.createdAt)}</TableCell>
                                            <TableCell>
                                                <p className="text-xs">{inspection.description}</p>
                                            </TableCell>
                                            <TableCell>
                                                <span
                                                    className={cn(
                                                        "px-2 py-1 rounded text-sm font-medium",
                                                        inspection.status === "pending"
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : inspection.status === "completed"
                                                                ? "bg-green-100 text-green-700"
                                                                : "bg-red-100 text-red-700"
                                                    )}
                                                >
                                                    {inspection.status}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <p className="text-xs">{inspection.inspector ?? "Not assigned"}</p>
                                            </TableCell>
                                            <TableCell>
                                                <p className="text-xs">{getLocalFriendlyDate(inspection.due_date)}</p>
                                            </TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody> :
                                    <TableBody>
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center">
                                                <img src={emptyImg} className="w-52 mx-auto" />{" "}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                }
                            </Table>
                        </Card>
                    </div>
                </div>
            </div>}
            {/* Skeleton loader */}
            {!vehicleDetails && (
                <div className="container animate-pulse space-y-8">
                    <div className="grid md:grid-cols-3 gap-8 w-full">
                        <div className="space-y-4 col-span-2 md:col-span-1">
                            <div className="relative w-full aspect-[4/3] bg-gray-300 rounded-lg"></div>
                            <div className="grid grid-cols-3 gap-2 justify-center">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="relative aspect-square bg-gray-300 rounded-lg w-full"></div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-6 col-span-2">
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <div className="h-6 bg-gray-300 rounded w-1/2 mb-2"></div>
                                        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                                    </div>
                                    <div className="h-6 bg-gray-300 rounded w-16"></div>
                                </div>
                            </div>
                            <div>
                                <div className="h-5 bg-gray-300 rounded w-1/4 mb-4"></div>
                                <div className="grid gap-4">
                                    <div>
                                        <div className="h-4 bg-gray-300 rounded w-1/3 mb-1"></div>
                                        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                                    </div>
                                    <div>
                                        <div className="h-4 bg-gray-300 rounded w-1/3 mb-1"></div>
                                        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-5 bg-gray-300 rounded w-1/4"></div>
                            <div className="h-5 bg-gray-300 rounded w-16"></div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                            <Card className="lg:col-span-4">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            {[...Array(5)].map((_, i) => (
                                                <TableHead key={i}>
                                                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                                                </TableHead>
                                            ))}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {[...Array(3)].map((_, i) => (
                                            <TableRow key={i}>
                                                {[...Array(5)].map((_, j) => (
                                                    <TableCell key={j}>
                                                        <div className="h-4 bg-gray-300 rounded w-full"></div>
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Card>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
