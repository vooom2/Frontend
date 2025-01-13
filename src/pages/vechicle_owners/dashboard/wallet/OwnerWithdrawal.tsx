/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import useOwnerAccountStore, {
    AccountDetails,
} from "@/stores/owner_store/owner_accounts_store";
import useUserStore from "@/stores/user_store";
import { useEffect, useRef, useState } from "react";
import UserService from "@/api/user.services";
import AddBankAccount from "../profile/add_bank_account";
import notify from "@/utils/toast";
import WalletServices from "@/api/wallet.services";
import toast from "react-hot-toast";
import { useOwnerWalletStatsStore } from "@/stores/owner_store/owner_wallet_stat_store";
import LoadingOverlay from "@/components/loading_overlay";
import CircularLoader from "@/components/circular_loader";

export default function OwnerWithdrawalForm() {
    const ownerBankStore = useOwnerAccountStore((state) => state);
    const [selectedAccount, setSelectedAccount] = useState<AccountDetails | null>(
        null
    );

    const [showPinDialog, setShowPinDialog] = useState(false);
    const [showResetPinDialog, setResetShowPinDialog] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const pinInputRef = useRef<HTMLInputElement>(null);
    const setPinInputRef = useRef<HTMLInputElement>(null);
    const amountInputRef = useRef<HTMLInputElement>(null);

    const walletStore = useOwnerWalletStatsStore((state) => state);

    useEffect(() => {
        const fetchAccounts = async () => {
            const res = (await UserService.getBankAccounts()) as {
                bankAccounts: any;
            };
            if (res != null) {
                ownerBankStore.setAccounts(res.bankAccounts);
            }
        };
        const fetchWalletInfo = async () => {
            const res = (await WalletServices.getOwnerWalletStat()) as { data: any };
            if (res != null) {
                walletStore.setStats(res.data);
                if (res.data.wallet.pin == "false") {
                    setResetShowPinDialog(true);
                }
            } else {
                setTimeout(() => {
                    fetchWalletInfo();
                }, 2000);
            }
        };

        fetchWalletInfo();
        fetchAccounts();
    }, []);

    const submitWithdrawal = async () => {
        if (pinInputRef.current!.value.length < 4) {
            notify("Please enter a valid PIN", "error");
            return;
        }
        setIsSubmitting(true);
        try {
            const res = await WalletServices.initiateWithdrawal({
                amount: amountInputRef.current!.value,
                bank_account_id: selectedAccount!._id,
                withdrawal_pin: pinInputRef.current!.value,
            })
            if (res != null) {
                notify("Withdrawal request submitted successfully", "success");
                setTimeout(() => {
                    window.location.href = "/owner/dashboard/wallet";
                }, 2000);
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    const updatePin = async (): Promise<void> => {
        if (!setPinInputRef.current?.value) {
            notify("Please enter a valid PIN", "error");
            return;
        }

        const pin = setPinInputRef.current.value.trim();

        if (pin.length < 4) {
            notify("PIN must be between 4 and 8 digits", "error");
            return;
        }

        if (!/^\d+$/.test(pin)) {
            notify("PIN must contain only numbers", "error");
            return;
        }

        await toast.promise(
            async () => {
                setResetShowPinDialog(false);
                const response = await WalletServices.updatepin({ pin });
                if (response != null) {
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }
                return response;
            },
            {
                loading: "Updating PIN...",
                success: (res: any) => (
                    <span> {res?.message || "PIN updated successfully"}</span>
                ),
                error: () => (
                    <span>{"Could not update PIN. Please try again."}</span>
                ),
            },
            {
                style: {
                    fontSize: "12px",
                },
            }
        );
    };
    return (
        <LoadingOverlay isLoading={!walletStore.hasLoaded}>
            <Card className="w-full max-w-3xl mx-auto shadow-none border-0 mt-20">
                <Dialog
                    open={walletStore?.hasLoaded && showResetPinDialog}
                >
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>
                                {walletStore.wallet.pin == "true" ? "Reset" : "Setup"} Transaction PIN
                            </DialogTitle>
                            <DialogDescription>
                                Please enter a 4-digit transaction PIN to secure your
                                withdrawals.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex items-center py-4 justify-center md:justify-start">
                            <InputOTP
                                maxLength={6}
                                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                                ref={setPinInputRef}
                            >
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                    <InputOTPSlot index={3} />
                                </InputOTPGroup>
                            </InputOTP>
                        </div>
                        <DialogFooter className="sm:justify-start">
                            <Button
                                type="button"
                                className="bg-black hover:bg-black/90"
                                onClick={() => updatePin()}
                            >
                                Confirm
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <CardHeader>
                    <CardTitle className="text-center">Withdrawal Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <form
                        className="space-y-4"
                        onSubmit={(e) => {
                            e.preventDefault();
                            setShowPinDialog(true);
                        }}
                    >
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className=" flex items-center justify-between">
                                    <Label htmlFor="accountName">Select Withdrawal Account</Label>
                                    <AddBankAccount />
                                </div>

                                <Select
                                    onValueChange={(value) => {
                                        setSelectedAccount(
                                            ownerBankStore.accounts?.find(
                                                (account) => account.account_name === value
                                            ) ?? null
                                        );
                                    }}
                                    required
                                >
                                    <SelectTrigger className="mt-1 w-full">
                                        <SelectValue placeholder="Select account" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {ownerBankStore.accounts?.map((account) => (
                                            <SelectItem
                                                key={account._id}
                                                value={account.account_name}
                                            >
                                                {account.account_name} - {account.bank_name}{" "}
                                                {account.account_number}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="accountNumber">Account number</Label>
                                <Input
                                    id="accountNumber"
                                    value={selectedAccount?.account_number ?? ""}
                                    readOnly
                                    placeholder="0123456789"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="bank">Bank name</Label>
                                    <Input
                                        value={selectedAccount?.bank_name ?? ""}
                                        placeholder="Bank name"
                                        readOnly
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="amount">Amount</Label>
                                    <Input
                                        id="amount"
                                        type="number"
                                        placeholder="90,000"
                                        prefix="₦"
                                        required
                                        ref={amountInputRef}
                                    />
                                </div>
                            </div>
                        </div>
                        <Button className="w-full">Withdraw</Button>
                    </form>
                    {/* Transaction pin dialogue */}
                    <Dialog open={showPinDialog}>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Enter Transaction PIN</DialogTitle>
                                <DialogDescription>
                                    Please enter your 4-digit transaction PIN to complete the
                                    withdrawal.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex flex-col items-center py-4 justify-center md:items-start">
                                <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} ref={pinInputRef}>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                        <InputOTPSlot index={3} />
                                    </InputOTPGroup>
                                </InputOTP>
                                <p className="mt-6 text-xs underline cursor-pointer" onClick={() => setResetShowPinDialog(true)}>Reset pin</p>
                            </div>

                            <DialogFooter className="sm:justify-start">
                                <DialogClose asChild>
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        onClick={() => setShowPinDialog(false)}
                                    >
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <Button type="button" className="bg-black hover:bg-black/90" onClick={submitWithdrawal}>
                                    {isSubmitting ? <CircularLoader /> : "Confirm"}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <p className="text-xs text-muted-foreground text-center">
                        Your personal data will be used to process your order, support your
                        experience throughout this website, and for other purposes described
                        in our privacy policy.
                    </p>
                </CardContent>
            </Card>
        </LoadingOverlay>
    );
}
