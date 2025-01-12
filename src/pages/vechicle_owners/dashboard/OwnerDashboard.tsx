import { DashboardInfoCard } from "@/components/dashboard_info_card"
import { Button } from "@/components/ui/button"
import { APP_NAME } from "@/utils/constant"
import { FileWarning } from "lucide-react"
import { Link } from "react-router"
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Card } from "@/components/ui/card"
import formatCurrency from "@/utils/formatCurrency"


interface Vehicle {
    regNumber: string
    healthStatus: 'Active' | 'Inactive'
    weeklyRemittance: string
    amount: string
    rider: string
}

interface Notification {
    id: string
    type: 'repair' | 'remittance' | 'drop'
    message: string
    time: string
}

const vehicles: Vehicle[] = [
    {
        regNumber: "#1456 9808 456745",
        healthStatus: "Active",
        weeklyRemittance: "12-08-2024",
        amount: "N13,500",
        rider: "Magnus Igwe"
    },
    {
        regNumber: "#8907 9808 356282",
        healthStatus: "Active",
        weeklyRemittance: "13-08-2024",
        amount: "N13,500",
        rider: "Paul Ibe"
    },
    {
        regNumber: "#9005 9808 273782",
        healthStatus: "Inactive",
        weeklyRemittance: "Pending",
        amount: "N0.00",
        rider: "Aliyu Umar"
    },
    {
        regNumber: "#1284 9808 903855",
        healthStatus: "Active",
        weeklyRemittance: "22-08-2024",
        amount: "N13,500",
        rider: "Ragnar Lotbrok"
    },
    {
        regNumber: "#8373 9808 367809",
        healthStatus: "Active",
        weeklyRemittance: "23-08-2024",
        amount: "N13,500",
        rider: "Floki Isiagu"
    },
    {
        regNumber: "#65730 9808 367809",
        healthStatus: "Active",
        weeklyRemittance: "30-08-2024",
        amount: "N13,500",
        rider: "Rollo Edie"
    }
]

const notifications: Notification[] = [
    {
        id: "1",
        type: "repair",
        message: "Repairs are been concluded on Reg - 1425679238",
        time: "2m"
    },
    {
        id: "2",
        type: "repair",
        message: "Reg - 142567956 is down and undergoing repair",
        time: "25m"
    },
    {
        id: "3",
        type: "remittance",
        message: "Your weekly remittance is available for withdrawal",
        time: "5d"
    },
    {
        id: "4",
        type: "drop",
        message: "Reg - 785068546 bike has been dropped by rider, till we get a ...",
        time: "2d"
    }
]
export default function OwnerDashboard() {
    return (
        <div className="container mx-auto p-2 lg:p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <DashboardInfoCard label="Total Withdrawn" icon="clock" value={formatCurrency(0)} />
                <DashboardInfoCard label="Amount this week" icon="clock" value={formatCurrency(0)} />
                <DashboardInfoCard label="Active bikes" icon="clock" value={formatCurrency(0)} />
                <DashboardInfoCard label="Inactive bikes" icon="bike" value={formatCurrency(0)} />
            </div>
            <div className="grid lg:grid-cols-[1fr,400px] gap-6">
                {/* Vehicle Status Table */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Status of Vehicles</h2>
                    <Card className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                        <div className="lg:col-span-4 rounded-md overflow-clip">
                            <Table>
                                <TableHeader className="bg-black">
                                    <TableRow>
                                        <TableHead className="text-white">Vehicle Reg</TableHead>
                                        <TableHead className="text-white">Health Status</TableHead>
                                        <TableHead className="text-white">Weekly Rem</TableHead>
                                        <TableHead className="text-white">Amount</TableHead>
                                        <TableHead className="text-white">Rider</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {vehicles.map((vehicle, index) => (
                                        <TableRow key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <TableCell className="font-medium">{vehicle.regNumber}</TableCell>
                                            <TableCell>
                                                <StatusBadge status={vehicle.healthStatus} />
                                            </TableCell>
                                            <TableCell>{vehicle.weeklyRemittance}</TableCell>
                                            <TableCell>{vehicle.amount}</TableCell>
                                            <TableCell>{vehicle.rider}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </Card>
                </div>

                {/* Notifications Panel */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold">Notifications</h2>
                        <button className="text-orange-500 text-sm hover:underline">
                            View All
                        </button>
                    </div>
                    <Card className="p-4">
                        <div className="space-y-4">
                            {notifications.map((notification) => (
                                <div key={notification.id} className="flex gap-3">
                                    <NotificationIcon type={notification.type} />
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-600">{notification.message}</p>
                                        <span className="text-xs text-gray-400">{notification.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center py-6 sm:py-8 text-center">
                <div className="rounded-full bg-blue-100 md:p-6 p-4 mb-4 w-fit">
                    <FileWarning className="md:h-[8rem] md:w-[8rem] h-16 w-16 text-blue-500" />
                </div>
                <h3 className="text-base sm:text-lg font-medium mb-3">You have no vehicle listed on {APP_NAME}</h3>
                <Link to="host">
                    <Button className="rounded-3xl bg-black px-4 py-2 text-sm sm:text-base">Host your vehicle</Button>
                </Link>
            </div>
        </div>
    )
}



function StatusBadge({ status }: { status: Vehicle['healthStatus'] }) {
    return (
        <Badge
            className={`${status === 'Active'
                ? 'bg-green-500 hover:bg-green-500'
                : 'bg-red-500 hover:bg-red-500'
                } text-white`}
        >
            {status}
        </Badge>
    )
}

function NotificationIcon({ type }: { type: Notification['type'] }) {
    const bgColor = type === 'remittance' ? 'bg-green-500' : 'bg-orange-500'
    return (
        <div className={`${bgColor} text-white w-8 h-8 rounded-full flex items-center justify-center`}>
            N
        </div>
    )
}
