/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Link } from "react-router";
import { Card } from "@/components/ui/card";
import OwnerServices from "@/api/owner.services";
import { useOwnerVehiclesStore } from "@/stores/owner_store/owner_vehicles_store";
import { useEffect } from "react";
import { getLocalFriendlyDate } from "@/utils/utils";
import { FileWarning } from "lucide-react";
import { APP_NAME } from "@/utils/constant";

function StatusBadge({ status }: { status: string }) {
    if (status === "Active") {
        return (
            <Badge className="bg-green-500 hover:bg-green-500 text-white">
                Active
            </Badge>
        );
    }
    return (
        <Badge className="bg-red-500 hover:bg-red-500 text-white">Inactive</Badge>
    );
}

export default function BikesRecordTable() {
    const vehiclesStore = useOwnerVehiclesStore((state) => state);

    useEffect(() => {
        const fetchVehicles = async () => {
            const res = (await OwnerServices.getOwnerVehicles()) as { vehicles: any };
            if (res != null) {
                vehiclesStore.addVehicle(res.vehicles);
            }
        };
        fetchVehicles();
    }, []);

    return (
        <div className="container mx-auto px-2 md:px-4 py-8 md:w-full relative">
            <Card className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <div className="lg:col-span-4 rounded-md overflow-clip">
                    <Table>
                        <TableHeader className="bg-black">
                            <TableRow>
                                <TableHead className="text-white">Date Registered</TableHead>
                                <TableHead className="text-white">Plate Number</TableHead>
                                <TableHead className="text-white">Model</TableHead>
                                <TableHead className="text-white">Status</TableHead>
                                <TableHead className="text-white">
                                    No. of Remmittance
                                </TableHead>
                                <TableHead className="text-white">Assisnged Rider</TableHead>
                                <TableHead className="text-white">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        {vehiclesStore.vehicles && vehiclesStore?.vehicles.length > 0 && (
                            <TableBody>
                                {vehiclesStore.vehicles.map((vehicle, index) => (
                                    <TableRow
                                        key={index}
                                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                                    >
                                        <TableCell>
                                            {getLocalFriendlyDate(vehicle.createdAt)}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {vehicle?.vehicle_number || "-"}
                                        </TableCell>
                                        <TableCell>{vehicle.model}</TableCell>
                                        <TableCell>
                                            <StatusBadge status={vehicle.active_vehicle ? "Active" : "Inactive"} />
                                        </TableCell>
                                        <TableCell>{vehicle.remittance?.length}</TableCell>
                                        <TableCell>{vehicle?.rider?.full_name || "-"}</TableCell>
                                        <TableCell>
                                            <Link to={`${vehicle._id}`}>
                                                <Button
                                                    variant="default"
                                                    size="sm"
                                                    className="h-8 px-3 rounded-md bg-black text-white hover:bg-black/90"
                                                >
                                                    View
                                                </Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        )}
                        {vehiclesStore.vehicles &&
                            vehiclesStore.vehicles.length === 0 && (
                                <TableBody>
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-6">
                                            <div className="flex flex-col items-center justify-center py-6 sm:py-8 text-center">
                                                <div className="rounded-full bg-blue-100 md:p-6 p-4 mb-4 w-fit">
                                                    <FileWarning className="md:h-[8rem] md:w-[8rem] h-16 w-16 text-blue-500" />
                                                </div>
                                                <h3 className="text-base sm:text-lg font-medium mb-3">
                                                    You have no vehicle listed on {APP_NAME}
                                                </h3>
                                                <Link to="/owner/dashboard/host">
                                                    <Button className="rounded-3xl bg-black px-4 py-2 text-sm sm:text-base">
                                                        Host your vehicle
                                                    </Button>
                                                </Link>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            )}
                    </Table>
                </div>
            </Card>
        </div>
    );
}
