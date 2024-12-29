'use client'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Link } from "react-router"
import formatCurrency from "@/utils/formatCurrency"

interface Vehicle {
    regNumber: string
    healthStatus: 'Active' | 'Inactive'
    weeklyRemittance: string
    amount: number
    rider: string
    dateRegistered: string
    inspectionCount: number
}

const vehicles: Vehicle[] = [
    {
        regNumber: "#1456 9808 456745",
        healthStatus: "Active",
        weeklyRemittance: "12-08-2024",
        amount: 13500,
        rider: "Magnus Igwe",
        dateRegistered: "18-04-2024",
        inspectionCount: 26
    },
    {
        regNumber: "#8907 9808 356282",
        healthStatus: "Active",
        weeklyRemittance: "13-08-2024",
        amount: 13500,
        rider: "Paul Ibe",
        dateRegistered: "18-04-2024",
        inspectionCount: 17
    },
    {
        regNumber: "#9005 9808 273782",
        healthStatus: "Inactive",
        weeklyRemittance: "Pending",
        amount: 0,
        rider: "Aliyu Umar",
        dateRegistered: "18-04-2024",
        inspectionCount: 20
    },
    {
        regNumber: "#1284 9808 903855",
        healthStatus: "Active",
        weeklyRemittance: "22-08-2024",
        amount: 13500,
        rider: "Ragnar Lotbrok",
        dateRegistered: "18-04-2024",
        inspectionCount: 14
    },
    {
        regNumber: "#8373 9808 367809",
        healthStatus: "Active",
        weeklyRemittance: "23-08-2024",
        amount: 13500,
        rider: "Floki Isiagu",
        dateRegistered: "18-04-2024",
        inspectionCount: 20
    },
    {
        regNumber: "#65730 9808 367809",
        healthStatus: "Active",
        weeklyRemittance: "30-08-2024",
        amount: 13500,
        rider: "Rollo Edie",
        dateRegistered: "18-04-2024",
        inspectionCount: 17
    }
]

function StatusBadge({ status }: { status: Vehicle['healthStatus'] }) {
    if (status === 'Active') {
        return (
            <Badge className="bg-green-500 hover:bg-green-500 text-white">
                Active
            </Badge>
        )
    }
    return (
        <Badge className="bg-red-500 hover:bg-red-500 text-white">
            Inactive
        </Badge>
    )
}


export default function VehiclesTable() {
    return (
        <div className="container mx-auto px-2 md:px-4 py-8 md:w-full relative">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <div className="lg:col-span-4 rounded-md overflow-hidden">
                    <Table>
                        <TableHeader className="bg-black hover:bg-black">
                            <TableRow>
                                <TableHead className="text-white">Vehicle Reg</TableHead>
                                <TableHead className="text-white">Health Status</TableHead>
                                <TableHead className="text-white">Weekly Rem</TableHead>
                                <TableHead className="text-white">Amount</TableHead>
                                <TableHead className="text-white">Rider</TableHead>
                                <TableHead className="text-white">Date Registered</TableHead>
                                <TableHead className="text-white">No. of Inspect</TableHead>
                                <TableHead className="text-white">View</TableHead>
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
                                    <TableCell>{formatCurrency(vehicle.amount)}</TableCell>
                                    <TableCell>{vehicle.rider}</TableCell>
                                    <TableCell>{vehicle.dateRegistered}</TableCell>
                                    <TableCell>{vehicle.inspectionCount}</TableCell>
                                    <TableCell>
                                        <Link to={`${index}`}>
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
                    </Table>
                </div>
            </div>
        </div>
    )
}

