import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface RemittanceRecord {
    period: string
    remittance: number
    paid: number
    outstanding: number
    datePaid: string
}

const remittanceData: RemittanceRecord[] = [
    {
        period: "Mar - Week 1",
        remittance: 13500,
        paid: 13500,
        outstanding: 8200,
        datePaid: "07-03-2024"
    },
    {
        period: "Mar - Week 2",
        remittance: 13500,
        paid: 17500,
        outstanding: 4200,
        datePaid: "14-03-2024"
    },
    {
        period: "Mar - Week 3",
        remittance: 13500,
        paid: 14500,
        outstanding: 3200,
        datePaid: "21-03-2024"
    },
    {
        period: "Mar - Week 4",
        remittance: 13500,
        paid: 16500,
        outstanding: 1000,
        datePaid: "28-03-2024"
    },
    {
        period: "Apr - Week 1",
        remittance: 13500,
        paid: 14500,
        outstanding: 0,
        datePaid: "02-03-2024"
    },
    {
        period: "Apr - Week 2",
        remittance: 13500,
        paid: 13500,
        outstanding: 0,
        datePaid: "09-03-2024"
    },
    {
        period: "Apr - Week 3",
        remittance: 13500,
        paid: 13500,
        outstanding: 0,
        datePaid: "15-03-2024"
    },
    {
        period: "Apr - Week 4",
        remittance: 13500,
        paid: 13500,
        outstanding: 0,
        datePaid: "22-03-2024"
    },
    {
        period: "Apr - Week 5",
        remittance: 13500,
        paid: 13500,
        outstanding: 0,
        datePaid: "29-03-2024"
    }
]

function formatCurrency(amount: number) {
    return `N${amount.toLocaleString()}`
}

export default function BikeRemittanceTable() {
    return (
        <div className="w-full mx-auto">
            <h2 className="text-xl font-bold mb-4">Remittance</h2>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <div className="lg:col-span-4 rounded-md overflow-clip">
                    <Table>
                        <TableHeader className="bg-black">
                            <TableRow>
                                <TableHead className="text-white font-medium">Month/Week</TableHead>
                                <TableHead className="text-white font-medium">Remittance</TableHead>
                                <TableHead className="text-white font-medium">Paid</TableHead>
                                <TableHead className="text-white font-medium">Outstanding</TableHead>
                                <TableHead className="text-white font-medium">Date Paid</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {remittanceData.map((record, index) => (
                                <TableRow
                                    key={`${record.period}-${index}`}
                                    className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                                >
                                    <TableCell className="font-medium">{record.period}</TableCell>
                                    <TableCell>{formatCurrency(record.remittance)}</TableCell>
                                    <TableCell className="text-green-500 font-medium">
                                        {formatCurrency(record.paid)}
                                    </TableCell>
                                    <TableCell>
                                        {record.outstanding === 0 ? 'N0.00' : formatCurrency(record.outstanding)}
                                    </TableCell>
                                    <TableCell>{record.datePaid}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

