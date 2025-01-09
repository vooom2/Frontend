/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { DashboardStatusIndicatorCard } from "@/components/home_status_indicator";
import formatCurrency from "@/utils/formatCurrency";
import useRiderDashboardStatStore from "@/stores/rider_store/rider_dashboard_stats.store";
import useRiderPaymentStore from "@/stores/rider_store/rider_payments_store";
import RiderServices from "@/api/rider.services";
import { useEffect } from "react";
import { getLocalFriendlyDate } from "@/utils/utils";

export default function PaymentHistory() {

    const stats = useRiderDashboardStatStore((state) => state.stats);
    const setStats = useRiderDashboardStatStore((state) => state.setStats);
    const setPayments = useRiderPaymentStore((state) => state.setPayments);
    const payments = useRiderPaymentStore((state) => state.payments);

    useEffect(() => {
        const fetchStats = async () => {
            const res = (await RiderServices.getDashboardStat()) as { data: any };
            if (res != null) {
                setStats(res.data);
            }
        };
        const fetchPayments = async () => {
            const res = (await RiderServices.getPayments()) as { data: any };
            if (res != null) {
                setPayments(res.docs);
            }
        };

        fetchStats();
        fetchPayments();
    }, []);

    return (
        <div className="container mx-auto p-2 lg:p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <DashboardStatusIndicatorCard
                    bg="bg-black"
                    label="Total Payment"
                    icon="clock"
                    value={stats ? formatCurrency(parseInt(stats?.total_payments ?? "")) : null}

                />
                <DashboardStatusIndicatorCard
                    label="Amount this week"
                    icon="clock"
                    value={stats ? formatCurrency(parseInt(stats?.weekly_due)) : null}

                />
                <DashboardStatusIndicatorCard
                    label="Outstanding"
                    icon="clock"
                    value={stats ? formatCurrency(
                        parseInt(stats?.outstanding_payments)) : null}

                />
                <DashboardStatusIndicatorCard
                    label="Inspection Count"
                    icon="bike"
                    value={stats ? formatCurrency(stats?.inspection_count ?? 0) : null}

                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <div className="lg:col-span-4 text-nowrap">
                    <Card>
                        <div className="p-4 border-b">
                            <h3 className="font-semibold">Status of Payment</h3>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Overdue Charges</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            {!payments ? (
                                <TableBody className="animate-pulse">
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
                                            <TableCell>
                                                <div className="h-4 bg-gray-200 rounded w-24"></div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            ) : payments.length > 0 ? (
                                <TableBody>
                                    {payments.map((payment, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                {getLocalFriendlyDate(payment.createdAt)}
                                            </TableCell>
                                            <TableCell>{payment.description}</TableCell>
                                            <TableCell>
                                                {formatCurrency(payment.payment_amount)}
                                            </TableCell>
                                            <TableCell
                                                className={
                                                    payment.overdue_charges > 0
                                                        ? "text-red-600"
                                                        : ""
                                                }
                                            >
                                                {formatCurrency(payment.overdue_charges)
                                                }

                                            </TableCell>

                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        payment.payment_status === "completed"
                                                            ? "secondary"
                                                            : "default"
                                                    }
                                                    className={
                                                        payment.payment_status !== "completed"
                                                            ? "text-orange-500 bg-orange-100"
                                                            : "text-green-500 bg-green-100"
                                                    }
                                                >
                                                    {payment.payment_status}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            ) : (
                                <TableBody>
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center">
                                            No payment history
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            )}
                        </Table>

                    </Card>
                </div>
            </div>
        </div>
    );
}
