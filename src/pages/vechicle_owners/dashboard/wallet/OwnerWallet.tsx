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
import { DashboardInfoCard } from "@/components/dashboard_info_card";
import formatCurrency from "@/utils/formatCurrency";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { Link } from "react-router";
import { useEffect } from "react";
import WalletServices from "@/api/wallet.services";
import { useOwnerWalletStatsStore } from "@/stores/owner_store/owner_wallet_stat_store";
import useOwnerWalletHistoryStore from "@/stores/owner_store/owner_wallet_history_store";
import emptyImg from "@/assets/images/no_data.png";
import { getLocalFriendlyDate } from "@/utils/utils";
const getStatusStyle = (status: string) => {
    switch (status) {
        case "credit":
            return "bg-green-500 hover:bg-green-500";
        case "debit":
            return "bg-red-500 hover:bg-red-500";
        default:
            return "bg-gray-700 hover:bg-gray-500";
    }
};

export default function OwnerWallet() {
    const walletStore = useOwnerWalletStatsStore((state) => state);
    const walletHistoryStore = useOwnerWalletHistoryStore((state) => state);

    useEffect(() => {
        const fetchWalletInfo = async () => {
            const res = (await WalletServices.getOwnerWalletStat()) as { data: any };
            if (res != null) {
                walletStore.setStats(res.data);
            }
        };

        const fetchWalletHistory = async () => {
            const res = (await WalletServices.getOwnerWalletHistroy()) as {
                history: any;
            };
            if (res != null) {
                walletHistoryStore.setHistory(res.history);
            }
        };
        fetchWalletHistory();
        fetchWalletInfo();
    }, []);

    return (
        <div className="container mx-auto p-2 lg:p-6 space-y-6">
            <div className="text-right">
                <Link to="withdraw">
                    <Button className="bg-green-500 rounded-md">
                        Withdraw
                        <Wallet />
                    </Button>
                </Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <DashboardInfoCard
                    bg="bg-black"
                    label="Total Balance"
                    icon="clock"
                    value={formatCurrency(walletStore.wallet.balance)}
                />
                <DashboardInfoCard
                    label="Total Withdrawn"
                    icon="clock"
                    value={formatCurrency(walletStore.totalWithdrawn)}
                />
                <DashboardInfoCard
                    label="Total this week"
                    icon="clock"
                    value={formatCurrency(walletStore.totalThisWeek)}
                />
                <DashboardInfoCard
                    label="Outstanding"
                    icon="clock"
                    value={formatCurrency(walletStore.totalWithdrawn)}
                />
            </div>
            <div className="flex justify-between pt-10">
                <h2 className="text-xl font-semibold">Withdrawal History</h2>
                {/* <Button className="rounded-md">Download CVV
                    <Download />
                </Button> */}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <div className="lg:col-span-4">
                    <Card>
                        <div className="overflow-x-auto rounded-md">
                            <Table>
                                <TableHeader className="bg-black">
                                    <TableRow>
                                        <TableHead className="text-white font-medium">
                                            Date
                                        </TableHead>

                                        <TableHead className="text-white font-medium">
                                            Reference
                                        </TableHead>
                                        <TableHead className="text-white font-medium">
                                            Status
                                        </TableHead>
                                        <TableHead className="text-white font-medium">
                                            Amount
                                        </TableHead>
                                        <TableHead className="text-white font-medium">
                                            Old Balance
                                        </TableHead>
                                        <TableHead className="text-white font-medium">
                                            New Balance
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                {walletHistoryStore.history && (
                                    <TableBody>
                                        {walletHistoryStore.history.length > 0 ? (
                                            walletHistoryStore.history.map((withdrawal, index) => (
                                                <TableRow key={index}>
                                                    <TableCell className="font-medium">
                                                        {getLocalFriendlyDate(withdrawal.createdAt)}
                                                    </TableCell>
                                                    <TableCell>{withdrawal.reference}</TableCell>
                                                    <TableCell>
                                                        <Badge className={getStatusStyle(withdrawal.type)}>
                                                            {withdrawal.type}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-green-500">
                                                        {formatCurrency(withdrawal.amount)}
                                                    </TableCell>
                                                    <TableCell>{formatCurrency(withdrawal.oldBalance)}</TableCell>
                                                    <TableCell>{formatCurrency(withdrawal.newBalance)}</TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={6} className="text-center">
                                                    <img src={emptyImg} className="w-52 mx-auto" />{" "}
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                )}
                                {!walletHistoryStore.history && (
                                    <TableBody>
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
            </div>
        </div>
    );
}
