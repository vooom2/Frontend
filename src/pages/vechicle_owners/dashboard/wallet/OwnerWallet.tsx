import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { DashboardStatusIndicatorCard } from "@/components/home_status_indicator"
import formatCurrency from "@/utils/formatCurrency"
import { Button } from "@/components/ui/button"
import { Download, Wallet } from "lucide-react"
import { Link } from "react-router"

interface Withdrawal {
    day: string
    withdrawalId: string
    amount: number
    status: "Successful" | "Pending" | "Reverted"
    account: string
    bankName: string
    accountName: string
}

const withdrawals: Withdrawal[] = [
    {
        day: "19-04-2024",
        withdrawalId: "#98701567",
        amount: 90000,
        status: "Successful",
        account: "0081766455",
        bankName: "Eco Bank",
        accountName: "Ceaser Pilate"
    },
    {
        day: "04-04-2024",
        withdrawalId: "#78234000",
        amount: 50000,
        status: "Pending",
        account: "9087856737",
        bankName: "First Bank",
        accountName: "Ceaser Pilate"
    },
    {
        day: "25-03-2024",
        withdrawalId: "#76564678",
        amount: 60000,
        status: "Reverted",
        account: "0081766455",
        bankName: "Eco Bank",
        accountName: "Ceaser Pilate"
    },

]


export default function OwnerWallet() {
    const getStatusStyle = (status: Withdrawal["status"]) => {
        switch (status) {
            case "Successful":
                return "bg-green-500 hover:bg-green-500"
            case "Pending":
                return "bg-gray-500 hover:bg-gray-500"
            case "Reverted":
                return "bg-red-500 hover:bg-red-500"
        }
    }

    return (
        <div className="container mx-auto p-2 lg:p-6 space-y-6">
            <div className="text-right">
                <Link to="withdraw">
                    <Button className="bg-green-500 rounded-md">Withdraw
                        <Wallet />
                    </Button>
                </Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <DashboardStatusIndicatorCard bg="bg-black" label="Available Withdrawal" icon="clock" value={formatCurrency(200000)} />
                <DashboardStatusIndicatorCard label="Total Withdrawn" icon="clock" value={formatCurrency(1290000)} />
                <DashboardStatusIndicatorCard label="Amount Weekly" icon="clock" value={formatCurrency(0)} />
                <DashboardStatusIndicatorCard label="Outstanding" icon="clock" value={formatCurrency(2000)} />
            </div>
            <div className="flex justify-between pt-10">
                <h2 className="text-xl font-semibold">Withdrawal History</h2>
                <Button className="rounded-md">Download CVV
                    <Download />
                </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <div className="lg:col-span-4">
                    <Card>
                        <div className="overflow-x-auto rounded-md">
                            <Table>
                                <TableHeader className="bg-black">
                                    <TableRow>
                                        <TableHead className="text-white font-medium">Day</TableHead>
                                        <TableHead className="text-white font-medium">Withdrawal ID</TableHead>
                                        <TableHead className="text-white font-medium">Amount</TableHead>
                                        <TableHead className="text-white font-medium">Status</TableHead>
                                        <TableHead className="text-white font-medium">Account</TableHead>
                                        <TableHead className="text-white font-medium">Bank Name</TableHead>
                                        <TableHead className="text-white font-medium">Account Name</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {withdrawals.map((withdrawal, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">{withdrawal.day}</TableCell>
                                            <TableCell>{withdrawal.withdrawalId}</TableCell>
                                            <TableCell className="text-green-500">
                                                N{withdrawal.amount.toLocaleString()}
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={getStatusStyle(withdrawal.status)}>
                                                    {withdrawal.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{withdrawal.account}</TableCell>
                                            <TableCell>{withdrawal.bankName}</TableCell>
                                            <TableCell>{withdrawal.accountName}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

