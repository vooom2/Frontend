/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { useEffect } from "react"
import { useOwnerReportsStore } from "@/stores/owner_store/owner_reports_store"
import { getLocalFriendlyDate } from "@/utils/utils"
import OwnerServices from "@/api/owner.services"
import emptyImg from "@/assets/images/no_data.png";


export default function OwnerReport() {
    const getPriorityStyle = (priority: any) => {
        switch (priority) {
            case "high":
                return "bg-red-100 text-red-700 hover:bg-red-100"
            case "medium":
                return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
            case "low":
                return "bg-gray-100 text-gray-700 hover:bg-gray-100"
        }
    }

    const reportStore = useOwnerReportsStore((state) => state);

    useEffect(() => {
        const fetchInfo = async () => {
            const res = await OwnerServices.getOwnerReports()
            if (res != null) {
                reportStore.updateReports(res);
            }
        };

        fetchInfo();
    }, []);

    return (
        <div className="w-full container mx-auto p-4">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Report</h1>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <div className="lg:col-span-4 rounded-md overflow-hidden">
                    <Table>
                        <TableHeader className="bg-black">
                            <TableRow>
                                <TableHead className="w-[180px] text-white">Date / Time</TableHead>
                                <TableHead className="w-[100px] text-white">Priority</TableHead>
                                <TableHead className="text-white">Report</TableHead>
                                <TableHead className="w-[120px] text-center text-white">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        {!reportStore.reports && <TableBody className="animate-pulse">
                            {[...Array(3)].map((_, index) => (
                                <TableRow
                                    key={index}
                                    className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                        }`}
                                >
                                    <TableCell>
                                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>}
                        {reportStore.reports && reportStore.reports.length > 0 && <TableBody>
                            {reportStore.reports.map((report) => (
                                <TableRow key={report.id}>
                                    <TableCell className="font-medium">
                                        {getLocalFriendlyDate(report.createdAt)}
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="secondary"
                                            className={cn(
                                                "font-medium whitespace-nowrap",
                                                getPriorityStyle(report.priority)
                                            )}
                                        >
                                            {report.priority}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="max-w-[400px] truncate">
                                        {report.description}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-muted-foreground hover:text-foreground whitespace-nowrap"
                                                >
                                                    View
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Report Details</DialogTitle>
                                                    <DialogDescription>
                                                        <p><strong>Message:</strong> {report.description}</p>
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <DialogClose asChild>
                                                    <Button variant="default" size="sm">Close</Button>
                                                </DialogClose>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>}
                        {reportStore.reports && reportStore.reports.length === 0 && (
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center">
                                        <img src={emptyImg} className="w-52 mx-auto" />{" "}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        )}
                    </Table>
                </div>
            </div>
        </div>
    )
}

