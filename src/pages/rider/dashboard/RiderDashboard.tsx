/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
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
import RiderVerificationBanner from "@/components/rider_verification_banner";
import useUserStore from "@/stores/user_store";
import VerifyingAccount from "./rider_verification/verifying_account";
import useRiderDashboardStatStore from "@/stores/rider_store/rider_dashboard_stats.store";
import { useEffect } from "react";
import RiderServices from "@/api/rider.services";
import useRiderPaymentStore from "@/stores/rider_store/rider_payments_store";
import { getLocalFriendlyDate } from "@/utils/utils";

export default function RiderDashboard() {
    const userInfo = useUserStore((state) => state.userInfo);
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
        <>
            {!userInfo?.account_verified && !userInfo?.verification_started && (
                <RiderVerificationBanner />
            )}
            {(userInfo?.account_verified || userInfo?.verification_started) && (
                <div className="container mx-auto p-2 lg:p-6 space-y-6">
                    {/* Assigned bike info */}
                    <div className="flex items-center justify-between hidden">
                        <div className="flex items-center gap-3">
                            <div className="relative h-12 w-12 rounded-full overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1603039997315-6dcb72ec1204"
                                    alt="Qlink 2024"
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h2 className="font-semibold">Qlink 2024</h2>
                                    <Badge className="bg-green-100 text-green-700">Active</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">VN 225893</p>
                            </div>
                        </div>
                        <div className="flex gap-2 flex-col md:flex-row">
                            <Button variant="outline">View Detail</Button>
                            <Button variant="destructive">Make a report</Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                        <DashboardStatusIndicatorCard
                            label="Total Payment"
                            icon="clock"
                            value={formatCurrency(parseInt(stats?.total_payments ?? ""))}
                        />
                        <DashboardStatusIndicatorCard
                            label="Amount this week"
                            icon="clock"
                            value={formatCurrency(parseInt(stats?.weekly_due ?? ""))}
                        />
                        <DashboardStatusIndicatorCard
                            label="Outstanding"
                            icon="clock"
                            value={formatCurrency(
                                parseInt(stats?.outstanding_payments ?? "")
                            )}
                        />
                        <DashboardStatusIndicatorCard
                            label="Inspection Count"
                            icon="clock"
                            value={formatCurrency(stats?.inspection_count ?? 0)}
                        />
                    </div>

                    {/* Verifiying account banner */}
                    {!userInfo?.account_verified && <VerifyingAccount />}

                    {userInfo?.account_verified && (
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                            <div className="lg:col-span-3 text-nowrap">
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
                            <div>
                                <CircularProgress nextInspectionCount={stats?.days_to_next_inspection ?? 0} />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}


function CircularProgress({ nextInspectionCount }: { nextInspectionCount: number }) {
    return (
        <Card className="p-4 bg-[#1a1a1a] text-white">
            <div className="flex flex-col  items-center gap-4">
                <div className="relative h-40 w-40">
                    <svg className="h-full w-full" viewBox="0 0 36 36">
                        <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#444"
                            strokeWidth="3"
                        />
                        <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#ff6b00"
                            strokeWidth="3"
                            strokeDasharray={`${(nextInspectionCount / 14) * 100}, 100`}
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-semibold">{nextInspectionCount} Days</span>
                    </div>
                </div>
                <div className="text-center">
                    <p className="text-lg font-semibold">Inspection</p>
                    <p className="text-sm text-gray-400">of bike</p>
                </div>
            </div>
        </Card>
    );
}
