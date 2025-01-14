import OwnerServices from "@/api/owner.services";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import formatCurrency from "@/utils/formatCurrency"
import { getLocalFriendlyDate } from "@/utils/utils";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import emptyImg from "@/assets/images/no_data.png";


type Payment = {
    _id: string;
    payment_amount: number;
    description: string;
    payment_due_date: string;
    createdAt: string;
};

type PaymentsResponse = {
    ok: boolean;
    payments: {
        docs: Payment[];
        totalDocs: number;
        limit: number;
        totalPages: number;
        page: number;
        pagingCounter: number;
        hasPrevPage: boolean;
        hasNextPage: boolean;
        prevPage: number | null;
        nextPage: number | null;
    };
};


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


export default function BikeRemittanceTable() {
    const { id } = useParams();
    const [paymentDetails, setPaymentDetails] = useState<PaymentsResponse | null>(null);

    useEffect(() => {
        const fetchDetails = async () => {
            const res = await OwnerServices.getVehiclePayments(id ?? "") as PaymentsResponse;
            console.log(res);
            if (res != null) {
                setPaymentDetails(res);
            }
        }
        fetchDetails();
    }, [])
    return (
        <div className="w-full mx-auto">
            {paymentDetails ? <>
                <h2 className="text-xl font-bold mb-4">Remittance</h2>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    <div className="lg:col-span-4 rounded-md overflow-clip">
                        <Table>
                            <TableHeader className="bg-black">
                                <TableRow>
                                    <TableHead className="text-white font-medium">Date</TableHead>
                                    <TableHead className="text-white font-medium">Description</TableHead>
                                    <TableHead className="text-white font-medium">Amount</TableHead>
                                    <TableHead className="text-white font-medium">Payment Due Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            {paymentDetails.payments.docs.length > 0 ? <TableBody>
                                {paymentDetails.payments.docs.map((record, index) => (
                                    <TableRow
                                        key={record._id}
                                        className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                                    >
                                        <TableCell className="font-medium">{getLocalFriendlyDate(record.createdAt)}</TableCell>
                                        <TableCell>{record.description}</TableCell>
                                        <TableCell className="text-green-500 font-medium">
                                            {formatCurrency(record.payment_amount)}
                                        </TableCell>
                                        <TableCell>{getLocalFriendlyDate(record.payment_due_date)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody> :
                                <TableBody>
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center">
                                            <img src={emptyImg} className="w-52 mx-auto" />{" "}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            }
                        </Table>
                    </div>
                </div>
            </> : <TableSkeleton />}
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
