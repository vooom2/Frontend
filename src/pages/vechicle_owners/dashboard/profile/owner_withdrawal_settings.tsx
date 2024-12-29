import { CreditCard, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TabsContent } from "@/components/ui/tabs"
import { Eye, EyeOff } from 'lucide-react'
import { useState } from "react"

interface BankAccount {
    id: number
    bank: string
    accountNumber: string
}

const bankAccounts: BankAccount[] = [
    {
        id: 1,
        bank: "Fidelity Bank",
        accountNumber: "6784***34"
    },
    {
        id: 2,
        bank: "United Bank for Africa",
        accountNumber: "5670***93"
    },
    {
        id: 3,
        bank: "Zenith Bank",
        accountNumber: "6780***95"
    }
]

export default function OwnerWithdrawalSettings() {
    const [showPin, setShowPin] = useState(false)

    return (
        <TabsContent value="withdrawal" className="space-y-8 mt-8">
            {/* PIN Section */}
            <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="withdrawalPin">Withdrawal Pin</Label>
                    <div className="relative">
                        <Input
                            id="withdrawalPin"
                            type={showPin ? "text" : "password"}
                            value="2424"
                            className="pr-10"
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                            onClick={() => setShowPin(!showPin)}
                        >
                            {showPin ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                        </Button>
                    </div>
                </div>

            </div>

            {/* Bank Accounts Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Bank Account</h3>
                    <div className="bg-onprimary cursor-pointer hover:opacity-90 rounded-full p-2">
                        <Plus className="h-4 w-4 text-white" />
                    </div>
                </div>
                <div className="space-y-2">
                    {bankAccounts.map((account) => (
                        <div
                            key={account.id}
                            className="flex items-center justify-between p-4 border-b rounded-lg"
                        >
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 bg-muted rounded-md flex items-center justify-center">
                                    <CreditCard size={40} className='text-onprimary' />
                                </div>
                                <div>
                                    <p className="font-medium">{account.bank}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {account.accountNumber}
                                    </p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                className="text-sm text-muted-foreground hover:text-foreground"
                            >
                                remove
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </TabsContent>
    )
}

