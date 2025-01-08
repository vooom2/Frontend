import { MapPin, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { TabsContent } from "@/components/ui/tabs";
import useUserStore from "@/stores/user_store";
import nigerianStates from "@/utils/states_list";

function RiderProfile() {
    const userInfo = useUserStore((state) => state.userInfo);

    return (
        <TabsContent value="account" className="mt-6">
            <form className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <div className="relative">
                            <Input
                                id="fullName"
                                className="capitalize"
                                value={userInfo?.full_name}
                            />
                            <User className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={userInfo?.email}
                            readOnly
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="flex gap-2">
                            <Select defaultValue="234" disabled>
                                <SelectTrigger className="w-[100px]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="234">+234</SelectItem>
                                </SelectContent>
                            </Select>
                            <Input id="phone" readOnly value={userInfo?.phone_number} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="occupation">Occupation</Label>
                        <Input id="occupation" value={userInfo?.occupation ?? "Not specified"} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <div className="relative">
                            <Input
                                id="address"
                                value={userInfo?.address ?? "Not specified"}
                            />
                            <MapPin className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Select defaultValue={userInfo?.state ?? "Not specified"} disabled>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    nigerianStates.map((state, index) => (
                                        <SelectItem key={index} value={state.name}>{state.name}</SelectItem>
                                    ))

                                }
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Select defaultValue="nigeria" disabled>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="nigeria">Nigeria</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </form>
        </TabsContent>
    )
}

export default RiderProfile