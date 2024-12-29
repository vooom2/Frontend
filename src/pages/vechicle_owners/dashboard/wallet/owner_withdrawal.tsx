import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
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
import formatCurrency from "@/utils/formatCurrency"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"

export default function OwnerWithdrawalForm() {
    return (
        <Card className="w-full max-w-3xl mx-auto shadow-none border-0 mt-20">
            <CardHeader>
                <CardTitle className="text-center">Withdrawal Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <div>
                        <Label className="text-center w-full block mb-4">Withdraw to:</Label>
                        <RadioGroup defaultValue="bank" className="flex gap-4 justify-center">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="bank" id="bank" />
                                <Label htmlFor="bank">Bank</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="wallet" id="wallet" />
                                <Label htmlFor="wallet">Wallet</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="accountName">Account Name</Label>
                            <Input
                                id="accountName"
                                defaultValue="Ceaser Pilate"
                                className="bg-muted"
                                readOnly
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="accountNumber">Account Number</Label>
                            <Input
                                id="accountNumber"
                                defaultValue="0081766455"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="bank">Bank</Label>
                                <Select defaultValue="ecobank">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select bank" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ecobank">Eco bank</SelectItem>
                                        <SelectItem value="gtbank">GT Bank</SelectItem>
                                        <SelectItem value="firstbank">First Bank</SelectItem>
                                        <SelectItem value="uba">UBA</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="amount">Amount</Label>
                                <Input
                                    id="amount"
                                    defaultValue="N90,000"
                                />
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox id="saveDetails" />
                            <Label htmlFor="saveDetails" className="text-sm">
                                Save card details
                            </Label>
                        </div>
                    </div>
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="w-full">
                            Withdraw {formatCurrency(90000)}
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

