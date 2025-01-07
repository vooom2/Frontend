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

function OwnerProfile() {
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
                                placeholder="Full Name"
                                defaultValue={userInfo?.full_name}
                                disabled
                            />
                            <User className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            disabled
                            defaultValue={userInfo?.email}
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
                            <Input id="phone" defaultValue="08065650633" disabled value={userInfo?.phone_number} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="occupation">Occupation</Label>
                        <Input id="occupation" defaultValue="Business Man" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <div className="relative">
                            <Input
                                id="address"
                                defaultValue="3, Wuse street, Abuja"
                            />
                            <MapPin className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" defaultValue="Wuse" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Select defaultValue="lagos" disabled>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="lagos">Lagos</SelectItem>
                                <SelectItem value="abuja">Abuja</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Select defaultValue="nigeria">
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

export default OwnerProfile