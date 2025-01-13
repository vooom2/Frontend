/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useEffect } from "react";
import UserServices from "@/api/user.services";
import useUserStore from "@/stores/user_store";
import useOwnerAccountStore from "@/stores/owner_store/owner_accounts_store";
import notify from "@/utils/toast";
import AddBankAccount from "./add_bank_account";

export default function OwnerWithdrawalSettings() {
    const userInfo = useUserStore((state) => state.userInfo);
    const ownerBankStore = useOwnerAccountStore((state) => state);

    const deleteAccount = async (id: string) => {
        const res = (await UserServices.removeBankAccount(id)) as { data: object };
        if (res != null) {
            notify("Bank account removed successfully", "success");
            ownerBankStore.removeAccount(id);
        }
    };

    useEffect(() => {
        const fetchAccounts = async () => {
            const res = (await UserServices.getBankAccounts()) as {
                bankAccounts: any;
            };
            console.log(res);
            if (res != null) {
                ownerBankStore.setAccounts(res.bankAccounts);
            }
        };
        fetchAccounts();
    }, []);
    console.log(userInfo?.withdrawal_pin);
    return (
        <TabsContent value="withdrawal" className="space-y-8 mt-8">

            {/* Bank Accounts Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Bank Account</h3>
                    <AddBankAccount />
                </div>

                {ownerBankStore.accounts && (
                    <div className="space-y-2">
                        {ownerBankStore?.accounts.map((account) => (
                            <div
                                key={account._id}
                                className="flex items-center justify-between p-4 border-b rounded-lg"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 bg-muted rounded-md flex items-center justify-center">
                                        <CreditCard size={40} className="text-onprimary" />
                                    </div>
                                    <div>
                                        <p className="font-medium">{account.account_name}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {account.account_number}
                                        </p>
                                    </div>
                                </div>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="text-sm text-muted-foreground hover:text-foreground"
                                        >
                                            remove
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                Are you absolutely sure?
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently
                                                delete this bank account.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={() => deleteAccount(account._id)}
                                            >
                                                Continue
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        ))}
                    </div>
                )}
                {ownerBankStore.accounts == null && (
                    <div className="space-y-2">
                        {[1, 2, 3].map((index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-4 border-b rounded-lg animate-pulse"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 bg-gray-200 rounded-md"></div>
                                    <div>
                                        <div className="h-4 bg-gray-200 w-40 mb-2 rounded"></div>
                                        <div className="h-3 bg-gray-200 w-16 rounded"></div>
                                    </div>
                                </div>
                                <div className="h-6 bg-gray-200 w-12 rounded"></div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </TabsContent>
    );
}
