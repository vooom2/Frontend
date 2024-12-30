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


interface Report {
    id: number
    datetime: string
    priority: "Low" | "Medium" | "High"
    message: string
}

const reports: Report[] = [
    {
        id: 1,
        datetime: "04-03-2024 - 9:30am",
        priority: "Low",
        message: "There is an ongoing maintenance on your vehicle with Registration number #8905674, it will be b....."
    },
    {
        id: 2,
        datetime: "04-03-2024 - 9:30am",
        priority: "Medium",
        message: "Your vehicle #58738392 has been returned by the rider therefore inactive till another rider pick....."
    },
    {
        id: 3,
        datetime: "04-03-2024 - 9:30am",
        priority: "High",
        message: "Vehicle #729483 was involved in a ghastly accident"
    },
    {
        id: 4,
        datetime: "04-03-2024 - 9:30am",
        priority: "Low",
        message: "There is an ongoing maintenance on your vehicle with Registration number #8905674, it will be b....."
    },
    {
        id: 5,
        datetime: "04-03-2024 - 9:30am",
        priority: "Medium",
        message: "Your vehicle #58738392 has been returned by the rider therefore inactive till another rider pick....."
    },
    {
        id: 6,
        datetime: "04-03-2024 - 9:30am",
        priority: "High",
        message: "Vehicle #729483 was involved in a ghastly accident"
    },
    {
        id: 7,
        datetime: "04-03-2024 - 9:30am",
        priority: "Low",
        message: "There is an ongoing maintenance on your vehicle with Registration number #8905674, it will be b....."
    },
    {
        id: 8,
        datetime: "04-03-2024 - 9:30am",
        priority: "Medium",
        message: "Your vehicle #58738392 has been returned by the rider therefore inactive till another rider pick....."
    },
    {
        id: 9,
        datetime: "04-03-2024 - 9:30am",
        priority: "High",
        message: "Vehicle #729483 was involved in a ghastly accident"
    },
]

export default function OwnerReport() {
    const getPriorityStyle = (priority: Report["priority"]) => {
        switch (priority) {
            case "High":
                return "bg-red-100 text-red-700 hover:bg-red-100"
            case "Medium":
                return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
            case "Low":
                return "bg-gray-100 text-gray-700 hover:bg-gray-100"
        }
    }

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
                                <TableHead className="w-[120px] text-right text-white">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {reports.map((report) => (
                                <TableRow key={report.id}>
                                    <TableCell className="font-medium">
                                        {report.datetime}
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
                                        {report.message}
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
                                                        <p><strong>Message:</strong> {report.message}</p>
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
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

