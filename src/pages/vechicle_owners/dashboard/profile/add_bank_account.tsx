/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button"
import { Controller, useForm } from 'react-hook-form'
import { useEffect, useState } from "react";
import UtilsServices from "@/api/utils.services";
import UserService from "@/api/user.services";
import CircularLoader from "@/components/circular_loader";
import notify from "@/utils/toast";

type Bank = {
    id: string;
    name: string;
    slug: string;
    code: string;
    longcode: string;
    gateway: string;
    active: boolean;
}

type ResolveAccountDetails = {
    account_number: string;
    account_name: string;
    bank_id: number;
}

function AddBankAccount() {
    const [banksList, setBanksList] = useState<Bank[] | null>(null);
    const [resolvedAccountDetails, setResolvedAccountDetails] = useState<ResolveAccountDetails | null>(null);
    const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { control, handleSubmit, register } = useForm();

    const submit = async (data: any) => {
        try {
            setIsLoading(true);
            const res = (await UserService.addBankAccount({
                account_number: data.account_number,
                account_name: resolvedAccountDetails?.account_name ?? "",
                bank_code: selectedBank?.code ?? "",
                bank_name: selectedBank?.name ?? "",
            })) as { data: any };
            if (res != null) {
                notify('Account added successfully', 'success');
                setTimeout(() => {
                    window.location.reload();
                }, 3000)
            }
        }
        finally {
            setIsLoading(false);
        }
    }

    const resolveAccount = async (data: any) => {
        try {
            setIsLoading(true);
            const res = (await UtilsServices.resolveAccount({
                account_number: data.account_number,
                bank_code: selectedBank?.code ?? "",
                bank_name: selectedBank?.name ?? "",
            })) as { accountDetail: any };
            if (res != null) {
                setResolvedAccountDetails(res.accountDetail.data);
                notify('Account resolved successfully', 'success');
            }
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        const fetchAccounts = async () => {
            const res = (await UtilsServices.getBankLists()) as { banks: any };
            if (res != null) {
                setBanksList(res.banks.data);
            }
        };
        fetchAccounts();

    }, []);

    useEffect(() => {
        return () => {
            setBanksList(null);
            setResolvedAccountDetails(null);
            setSelectedBank(null);
        };
    }, []);

    return (
        <div className="bg-onprimary cursor-pointer hover:opacity-90 rounded-full p-2">
            <Dialog>
                <DialogTrigger asChild>
                    <div className="flex gap-2 items-center">
                        <p className="text-xs text-white font-semibold" >Add account</p>
                        <Plus size={18} color='white' />

                    </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={handleSubmit(resolvedAccountDetails ? submit : resolveAccount)}>
                        <DialogHeader>
                            <DialogTitle>Add Bank Account</DialogTitle>
                            <DialogDescription>
                                Add your bank account details to receive payments
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4" >
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-right">
                                    Account number
                                </Label>
                                <Input
                                    id="account number"
                                    placeholder="0123456789"
                                    minLength={10}
                                    maxLength={10}
                                    required
                                    {...register('account_number')}
                                    onChange={() => setResolvedAccountDetails(null)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-right">
                                    Bank name
                                </Label>
                                <Controller
                                    name="bank_name"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            value={field.value}
                                            onValueChange={(value) => {
                                                field.onChange(value);
                                                setResolvedAccountDetails(null);
                                                banksList?.find((bank) => {
                                                    if (bank.name === value) {
                                                        setSelectedBank(bank);
                                                    }
                                                }
                                                )
                                            }}
                                            required
                                        >
                                            <SelectTrigger className="mt-1 w-full">
                                                <SelectValue placeholder="Select bank" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {banksList?.map((bank) => (
                                                    <SelectItem key={bank.id} value={bank.name}>
                                                        {bank.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-right">
                                    Account name
                                </Label>
                                <Input
                                    name='account_name'
                                    id="account name"
                                    disabled
                                    value={resolvedAccountDetails?.account_name ?? ""}
                                />

                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">{isLoading ?
                                <CircularLoader color="white" />
                                : !resolvedAccountDetails ? "Resolve account" : "Add account"}</Button>
                        </DialogFooter>

                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddBankAccount