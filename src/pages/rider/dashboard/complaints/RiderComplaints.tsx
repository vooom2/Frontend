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
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Link } from "react-router";
import RiderServices from "@/api/rider.services";
import { useEffect } from "react";
import useRiderComplaintStore from "@/stores/rider_store/rider_complaints_store";
import { getLocalFriendlyDate } from "@/utils/utils";

interface Report {
    ticketNo: string;
    dateTime: string;
    category: string;
    status: "Pending" | "Resolved" | "In Progress";
    fleetManager: string;
}

const images = [
    "https://images.unsplash.com/photo-1603039997315-6dcb72ec1204",
    "https://images.unsplash.com/photo-1603039997315-6dcb72ec1204",
    "https://images.unsplash.com/photo-1603039997315-6dcb72ec1204",
];

function StatusBadge({ status }: { status: Report["status"] }) {
    const styles = {
        "In Progress": "bg-orange-100 text-orange-700 hover:bg-orange-100",
        Pending: "bg-red-100 text-red-700 hover:bg-red-100",
        Resolved: "bg-gray-100 text-gray-700 hover:bg-gray-100",
    };

    return (
        <Badge className={styles[status]} variant="secondary">
            {status}
        </Badge>
    );
}

export default function RiderComplaints() {
    const complaints = useRiderComplaintStore((state) => state.complaints);
    const setComplaints = useRiderComplaintStore((state) => state.setComplaints);
    useEffect(() => {
        const fetchInfo = async () => {
            const res = (await RiderServices.getComplaints()) as {
                complaints: any;
                data: any;
            };

            if (res != null) {
                setComplaints(res.complaints.docs);
            }
        };

        fetchInfo();
    }, []);
    return (
        <div className="container mx-auto px-2 md:px-4 py-8 w-full relative">
            <div className="flex justify-between items-start sm:items-center mb-6">
                <h1 className="text-2xl font-semibold mb-4 sm:mb-0">Report</h1>
                <Link to="create">
                    <Button variant="destructive" className="text-xs md:text-sm">
                        Make a report
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <div className="lg:col-span-4 rounded-md overflow-clip">
                    <Table>
                        <TableHeader className="bg-black hover:bg-black">
                            <TableRow>
                                <TableHead className="text-white">Ticket No</TableHead>
                                <TableHead className="text-white">Date / Time</TableHead>
                                <TableHead className="text-white">Category</TableHead>
                                <TableHead className="text-white">Status</TableHead>
                                <TableHead className="text-white">Fleet Manager</TableHead>
                                <TableHead className="text-white">View</TableHead>
                            </TableRow>
                        </TableHeader>
                        {!complaints ?
                            <TableBody className="animate-pulse">
                                {[...Array(3)].map((_, index) => (
                                    <TableRow key={index} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                                        <TableCell><div className="h-4 bg-gray-200 rounded w-24"></div></TableCell>
                                        <TableCell><div className="h-4 bg-gray-200 rounded w-24"></div></TableCell>
                                        <TableCell><div className="h-4 bg-gray-200 rounded w-20"></div></TableCell>
                                        <TableCell><div className="h-4 bg-gray-200 rounded w-16"></div></TableCell>
                                        <TableCell><div className="h-4 bg-gray-200 rounded w-24"></div></TableCell>
                                        <TableCell><div className="h-8 bg-gray-200 rounded w-16"></div></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            : (complaints && complaints?.length > 0) ? (
                                <TableBody>
                                    {complaints.map((complaint, index) => (
                                        <TableRow
                                            key={index}
                                            className={`text-nowrap ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                                }`}
                                        >
                                            <TableCell className="uppercase font-medium">
                                                {complaint._id}
                                            </TableCell>
                                            <TableCell>{getLocalFriendlyDate(complaint.date) + ". " + complaint.time}</TableCell>
                                            <TableCell>{complaint.category}</TableCell>
                                            <TableCell>
                                                <StatusBadge status={complaint.status} />
                                            </TableCell>
                                            <TableCell>{complaint.fleetManager}</TableCell>
                                            <TableCell>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-8 w-16"
                                                        >
                                                            View
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>{complaint.category}</DialogTitle>
                                                        </DialogHeader>
                                                        <DialogDescription className="text-wrap">
                                                            <p className="text-wrap break-words w-auto max-w-[400px]">
                                                                {complaint.detail}
                                                            </p>

                                                            <div>
                                                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                                                                    {complaint.images.map((src, index) => (
                                                                        <img
                                                                            key={index}
                                                                            src={src}
                                                                            alt={`Image ${index + 1}`}
                                                                            className="w-full h-24 object-cover rounded-md shadow-md"
                                                                        />
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </DialogDescription>
                                                        <DialogClose>
                                                            <Button
                                                                type="submit"
                                                                className="w-full rounded-full"
                                                            >
                                                                Close
                                                            </Button>
                                                        </DialogClose>
                                                    </DialogContent>
                                                </Dialog>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            ) : (
                                <TableBody>
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center text-xs py-4 text-gray-600">
                                            No complaints!
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            )}
                    </Table>
                </div>
            </div>
        </div>
    );
}
