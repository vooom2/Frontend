/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import useOwnerAccountStore, { AccountDetails } from "@/stores/owner_store/owner_accounts_store"
import useUserStore from "@/stores/user_store"
import { useEffect, useState } from "react"
import UserService from "@/api/user.services"
import AddBankAccount from "../profile/add_bank_account"

export default function OwnerWithdrawalForm() {
    const userInfo = useUserStore((state) => state.userInfo);
    const ownerBankStore = useOwnerAccountStore((state) => state);
    const [selectedAccount, setSelectedAccount] = useState<AccountDetails | null>(null)

    useEffect(() => {
        const fetchAccounts = async () => {
            const res = (await UserService.getBankAccounts()) as { bankAccounts: any };
            console.log(res);
            if (res != null) {
                ownerBankStore.setAccounts(res.bankAccounts);
            }
        };
        fetchAccounts();
    }, []);

    console.log(selectedAccount);

    return (
        <Card className="w-full max-w-3xl mx-auto shadow-none border-0 mt-20">
            <CardHeader>
                <CardTitle className="text-center">Withdrawal Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className=" flex items-center justify-between">
                                <Label htmlFor="accountName">Select Withdrawal Account</Label>
                                <AddBankAccount />
                            </div>

                            <Select
                                onValueChange={(value) => {
                                    console.log(value)
                                    setSelectedAccount(ownerBankStore.accounts?.find((account) => account.account_name === value) ?? null)
                                }}
                                required
                            >
                                <SelectTrigger className="mt-1 w-full">
                                    <SelectValue placeholder="Select account" />
                                </SelectTrigger>
                                <SelectContent>
                                    {ownerBankStore.accounts?.map((account) => (
                                        <SelectItem key={account.id} value={account.account_name}>
                                            {account.account_name} - {account.bank_name} {(account.account_number)}
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
                                readOnly placeholder="0123456789"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="bank">Bank name</Label>
                                <Input value={selectedAccount?.bank_name ?? ""} placeholder="Bank name" readOnly />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="amount">Amount</Label>
                                <Input
                                    id="amount"
                                    placeholder="90,000"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="w-full">
                            Withdraw
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Enter Transaction PIN</DialogTitle>
                            <DialogDescription>
                                Please enter your 4-digit transaction PIN to complete the withdrawal.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex items-center py-4 justify-center md:justify-start">
                            <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                    <InputOTPSlot index={3} />
                                </InputOTPGroup>
                            </InputOTP>
                        </div>
                        <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button type="button" className="bg-black hover:bg-black/90">
                                Confirm
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <p className="text-xs text-muted-foreground text-center">
                    Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
                </p>
            </CardContent>
        </Card>
    )
}

