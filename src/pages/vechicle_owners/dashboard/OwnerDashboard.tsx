/* eslint-disable @typescript-eslint/no-explicit-any */
import { DashboardInfoCard } from "@/components/dashboard_info_card";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/utils/constant";
import { FileWarning } from "lucide-react";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import formatCurrency from "@/utils/formatCurrency";
import useUserStore from "@/stores/user_store";
import DashboardSkeleton from "@/components/dashboard_skeleton";
import OwnerVerificationBanner from "@/components/owners_verification_banner";
import VerifyingAccount from "@/pages/rider/dashboard/rider_verification/verifying_account";
import { useEffect } from "react";
import { useOwnerVehiclesStore } from "@/stores/owner_store/owner_vehicles_store";
import OwnerServices from "@/api/owner.services";
import { useOwnerVehicleStatsStore } from "@/stores/owner_store/owner_vehicle_stat_store";
import { useOwnerWalletStatsStore } from "@/stores/owner_store/owner_wallet_stat_store";
import WalletServices from "@/api/wallet.services";
import NotificationPanel from "@/components/notification_panel";
// import { getLocalFriendlyDate } from "@/utils/utils";

export default function OwnerDashboard() {
    const { userInfo, hasLoaded } = useUserStore((state) => state);
    const vehiclesStatStore = useOwnerVehicleStatsStore((state) => state);
    const walletStore = useOwnerWalletStatsStore((state) => state);
    const vehiclesStore = useOwnerVehiclesStore((state) => state);

    useEffect(() => {
        const fetchVehicles = async () => {
            const res = (await OwnerServices.getOwnerVehicles()) as { vehicles: any };
            console.log(res);
            if (res != null) {
                vehiclesStore.addVehicle(res.vehicles);
            }
        };

        const fetchWalletInfo = async () => {
            const res = (await WalletServices.getOwnerWalletStat()) as { data: any };

            if (res != null) {
                walletStore.setStats(res.data);
            }
        };

        const fetchStats = async () => {
            const res = (await OwnerServices.getOwnerVehicleStats()) as {
                stats: any;
            };
            if (res != null) {
                vehiclesStatStore.setStats(res.stats);
            }
        };
        fetchVehicles();
        fetchStats();
        fetchWalletInfo();
    }, []);

    return (
        <div>
            {userInfo && hasLoaded && userInfo.account_verified && (
                <>
                    <div className="container mx-auto p-2 lg:p-6 space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                            <DashboardInfoCard
                                label="Total Withdrawn"
                                icon="clock"
                                value={formatCurrency(walletStore?.totalWithdrawn)}
                            />
                            <DashboardInfoCard
                                label="Amount this week"
                                icon="clock"
                                value={formatCurrency(walletStore?.totalThisWeek)}
                            />
                            <DashboardInfoCard
                                label="Active bikes"
                                icon="clock"
                                value={vehiclesStatStore?.totalActiveVehicles}
                            />
                            <DashboardInfoCard
                                label="Inactive bikes"
                                icon="bike"
                                value={vehiclesStatStore?.totalInactiveVehicles}
                            />
                        </div>
                        <div className="grid lg:grid-cols-[1fr,400px] gap-6 pt-4">
                            {/* Vehicle Status Table */}
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold">Status of Vehicles</h2>
                                <Card className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                                    <div className="lg:col-span-4 rounded-md overflow-clip">
                                        <Table>
                                            <TableHeader className="bg-black">
                                                <TableRow>
                                                    {/* <TableHead className="text-white">
                            Date Registered
                          </TableHead> */}
                                                    <TableHead className="text-white">
                                                        Plate Number
                                                    </TableHead>
                                                    <TableHead className="text-white">Model</TableHead>
                                                    <TableHead className="text-white">Status</TableHead>
                                                    <TableHead className="text-white">
                                                        No. of Remmittance
                                                    </TableHead>
                                                    <TableHead className="text-white">
                                                        Assisnged Rider
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            {vehiclesStore.vehicles ? (
                                                <TableBody>
                                                    {vehiclesStore?.vehicles.length > 0 ? (
                                                        vehiclesStore.vehicles.map((vehicle, index) => (
                                                            <TableRow
                                                                key={index}
                                                                className={
                                                                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                                                }
                                                            >
                                                                {/* <TableCell>
                                  {getLocalFriendlyDate(vehicle.createdAt)}
                                </TableCell> */}
                                                                <TableCell className="font-medium">
                                                                    {vehicle?.vehicle_number || "-"}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {vehicle.make + " " + vehicle.model}
                                                                </TableCell>
                                                                <TableCell>
                                                                    <StatusBadge
                                                                        status={
                                                                            vehicle.active_vehicle
                                                                                ? "active"
                                                                                : "inactive"
                                                                        }
                                                                    />
                                                                </TableCell>
                                                                <TableCell>
                                                                    {vehicle.remittance?.length}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {vehicle?.rider?.full_name || "-"}
                                                                </TableCell>
                                                            </TableRow>
                                                        ))
                                                    ) : (
                                                        <TableRow>
                                                            <TableCell
                                                                colSpan={6}
                                                                className="text-center py-6"
                                                            >
                                                                <div className="flex flex-col items-center justify-center py-6 sm:py-8 text-center">
                                                                    <div className="rounded-full bg-blue-100 md:p-6 p-4 mb-4 w-fit">
                                                                        <FileWarning className="md:h-[8rem] md:w-[8rem] h-16 w-16 text-blue-500" />
                                                                    </div>
                                                                    <h3 className="text-base sm:text-lg font-medium mb-3">
                                                                        You have no vehicle listed on {APP_NAME}
                                                                    </h3>
                                                                    <Link to="host">
                                                                        <Button className="rounded-3xl bg-black px-4 py-2 text-sm sm:text-base">
                                                                            Host your vehicle
                                                                        </Button>
                                                                    </Link>
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    )}
                                                </TableBody>
                                            ) : (
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
                                                                <div className="h-4 bg-gray-200 rounded w-16"></div>
                                                            </TableCell>
                                                            <TableCell>
                                                                <div className="h-4 bg-gray-200 rounded w-16"></div>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            )}
                                        </Table>
                                    </div>
                                </Card>
                            </div>

                            {/* Notifications Panel */}
                            <NotificationPanel />
                        </div>
                    </div>
                </>
            )}
            {userInfo &&
                !userInfo?.verification_started &&
                !userInfo?.account_verified && <OwnerVerificationBanner />}
            {userInfo &&
                !userInfo.account_verified &&
                userInfo?.verification_started && <VerifyingAccount />}
            {!userInfo && <DashboardSkeleton />}
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    return (
        <Badge
            className={`${status === "active"
                    ? "bg-green-500 hover:bg-green-500"
                    : "bg-red-500 hover:bg-red-500"
                } text-white`}
        >
            {status}
        </Badge>
    );
}
