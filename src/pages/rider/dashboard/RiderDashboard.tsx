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
import { DashboardInfoCard } from "@/components/dashboard_info_card";
import formatCurrency from "@/utils/formatCurrency";
import RiderVerificationBanner from "@/components/rider_verification_banner";
import useUserStore from "@/stores/user_store";
import VerifyingAccount from "./rider_verification/verifying_account";
import useRiderDashboardStatStore from "@/stores/rider_store/rider_dashboard_stats.store";
import { useEffect, useState } from "react";
import RiderServices from "@/api/rider.services";
import useRiderPaymentStore from "@/stores/rider_store/rider_payments_store";
import { getLocalFriendlyDate } from "@/utils/utils";
import UserService from "@/api/user.services";
import { useRiderVehicleStore } from "@/stores/rider_store/rider_vehicle_store";
import { useNavigate } from "react-router";
import image from '@/assets/images/verifying.png';
import { useRiderPendingVehicleStore } from "@/stores/rider_store/rider_pending_vehicle_store";
import PendingMotorcycleDetails from "./rentals/PendingMotorcycleDetails";
import notify from "@/utils/toast";
import LoadingOverlay from "@/components/loading_overlay";


export default function RiderDashboard() {
    const userInfo = useUserStore((state) => state.userInfo);
    const stats = useRiderDashboardStatStore((state) => state.stats);
    const setStats = useRiderDashboardStatStore((state) => state.setStats);
    const setPayments = useRiderPaymentStore((state) => state.setPayments);
    const payments = useRiderPaymentStore((state) => state.payments);

    const setVehicle = useRiderVehicleStore((state) => state.setVehicle);
    const vehicleDetailsLoaded = useRiderVehicleStore((state) => state.hasLoaded);
    const { setPendingVehicle, pendingVehicle } = useRiderPendingVehicleStore((state) => state);
    const vehicle = useRiderVehicleStore((state) => state.vehicle);
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const makePayment = async (id: string) => {
        try {
            setIsLoading(true);
            const res = await UserService.makePayment(id);
            if (res) {
                notify("Redirecting to paystack....");
                setTimeout(() => {
                    window.location.href = res.data.authorization_url;
                }, 2000);
            }
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        const fetchStats = async () => {
            const res = (await RiderServices.getDashboardStat()) as { data: any };
            if (res != null) {
                setStats(res.data);
            }
        };
        const fetchPayments = async () => {
            const res = (await RiderServices.getPayments()) as { docs: any };
            if (res != null) {
                setPayments(res.docs);
            }
        };
        const fetchApprovedVehicles = async () => {
            const res = (await UserService.getVehicle()) as { vehicle: any };
            if (res != null) {
                setVehicle(res.vehicle);
            }
        };
        const fetchPendingVehicles = async () => {
            const res = (await UserService.getPendingVehicle()) as { vehicle: any };
            if (res) {
                console.log(res.vehicle);
                setPendingVehicle(res.vehicle);
            }
        };

        fetchStats();
        fetchPayments();
        fetchApprovedVehicles();
        fetchPendingVehicles();
    }, []);

    return (
        <LoadingOverlay isLoading={isLoading} >
            {userInfo &&
                !userInfo?.account_verified &&
                !userInfo?.verification_started && <RiderVerificationBanner />}
            {!userInfo && <DashboardSkeleton />}

            {(userInfo?.account_verified || userInfo?.verification_started) && (
                <div className="container mx-auto p-2 lg:p-6 space-y-6">
                    {/* bike info */}
                    {vehicle ? (
                        !pendingVehicle && <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                                    <img
                                        src={vehicle.vehicle_images[0]}
                                        alt={vehicle.vehicle_number}
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h2 className="font-semibold">{vehicle.vehicle_type}</h2>
                                        <Badge className="bg-green-100 text-green-700">
                                            {vehicle.active_vehicle ? "Active" : "Inactive"}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{vehicle.vehicle_number}</p>
                                </div>
                            </div>
                            <div className="flex gap-2 flex-col md:flex-row">
                                <Button variant="outline"
                                    onClick={() => navigate(`vehicle/${vehicle._id}`)}
                                >View Detail</Button>
                                <Button variant="destructive" onClick={() => navigate("complaints/create")}>Make a report</Button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between animate-pulse">
                            <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-5 w-32 bg-gray-200 rounded"></div>
                                        <div className="h-5 w-16 bg-gray-200 rounded"></div>
                                    </div>
                                    <div className="h-4 w-24 bg-gray-200 rounded mt-2"></div>
                                </div>
                            </div>
                            <div className="flex gap-2 flex-col md:flex-row">
                                <div className="h-9 w-24 bg-gray-200 rounded"></div>
                                <div className="h-9 w-32 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    )}

                    {!pendingVehicle && <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                        <DashboardInfoCard
                            label="Total Payment"
                            icon="clock"
                            value={
                                stats ? formatCurrency(parseInt(stats?.total_payments)) : null
                            }
                        />
                        <DashboardInfoCard
                            label="Amount this week"
                            icon="clock"
                            value={stats ? formatCurrency(parseInt(stats?.weekly_due)) : null}
                        />
                        <DashboardInfoCard
                            label="Outstanding"
                            icon="clock"
                            value={stats ? formatCurrency(
                                parseInt(stats?.outstanding_payments)
                            ) : null}
                        />
                        <DashboardInfoCard
                            label="Inspection Count"
                            icon="clock"
                            value={stats ? formatCurrency(stats?.inspection_count) : null}
                        />
                    </div>}

                    {/* Verifiying account banner */}
                    {!userInfo?.account_verified && <VerifyingAccount />}

                    {!pendingVehicle && userInfo?.account_verified && userInfo && (
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
                                                <TableHead>Actions</TableHead>
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
                                                            {formatCurrency(payment.overdue_charges)}
                                                        </TableCell>

                                                        <TableCell>
                                                            <Badge
                                                                variant={
                                                                    payment.payment_status === "paid"
                                                                        ? "secondary"
                                                                        : "default"
                                                                }
                                                                className={
                                                                    `capitalize  ${payment.payment_status !== "paid"
                                                                        ? "text-orange-500 bg-orange-100"
                                                                        : "text-green-500 bg-green-100"}`
                                                                }
                                                            >
                                                                {payment.payment_status}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell>
                                                            {payment.payment_status === "pending" && (
                                                                <Badge onClick={() => makePayment(payment._id)} className="cursor-pointer">
                                                                    Make Payment
                                                                </Badge>
                                                            )}

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
                                <CircularProgress
                                    nextInspectionCount={stats?.days_to_next_inspection ?? 0}
                                />
                            </div>
                        </div>
                    )
                    }
                    {userInfo.account_verified && !vehicle && vehicleDetailsLoaded && <div className="text-center px-4 my-10">
                        <img src={image} alt="" className='w-64 h-64 object-contain mx-auto' />
                        <h2 className="text-xl md:text-2xl font-bold">Just hold a little longer, you will be assigned a bike!</h2>
                    </div>}

                    {userInfo.account_verified && pendingVehicle && <PendingMotorcycleDetails />}

                </div>
            )}
        </LoadingOverlay>
    );
}

function CircularProgress({
    nextInspectionCount,
}: {
    nextInspectionCount: number;
}) {
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
                        <span className="text-lg font-semibold">
                            {nextInspectionCount} Days
                        </span>
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

const DashboardSkeleton = () => {
    return (
        <div className="container mx-auto p-2 lg:p-6 space-y-6">
            {/* Stats Cards Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-white rounded-lg p-4 shadow animate-pulse">
                        <div className="flex justify-between items-start">
                            <div className="space-y-3 w-full">
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                            </div>
                            <div className="h-8 w-8 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {/* Table Card Skeleton */}
                <div className="lg:col-span-3">
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-4 border-b">
                            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                        </div>
                        <div className="p-4">
                            <div className="space-y-4">
                                {/* Table Header Skeleton */}
                                <div className="grid grid-cols-5 gap-4 pb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className="h-4 bg-gray-200 rounded"></div>
                                    ))}
                                </div>
                                {/* Table Rows Skeleton */}
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="grid grid-cols-5 gap-4">
                                        {[...Array(5)].map((_, j) => (
                                            <div
                                                key={j}
                                                className="h-4 bg-gray-200 rounded"
                                                style={{ width: j === 1 ? "100%" : "80%" }}
                                            ></div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Circular Progress Skeleton */}
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center justify-center h-full">
                        <div className="h-36 w-36 rounded-full bg-gray-200 animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
