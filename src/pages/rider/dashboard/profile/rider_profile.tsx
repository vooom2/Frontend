import { Edit, MapPin, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import useUserStore from "@/stores/user_store";
import EditProfile from "./edit_profile";

function RiderProfile() {
    const userInfo = useUserStore((state) => state.userInfo);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <TabsContent value="account" className="mt-6">
            <EditProfile
                setIsDialogOpen={setIsDialogOpen}
                isDialogOpen={isDialogOpen}
            />

            <form className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <div className="relative">
                            <Input
                                id="fullName"
                                className="capitalize"
                                value={userInfo?.full_name}
                                readOnly
                            />
                            <User className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={userInfo?.email} readOnly />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="flex gap-2">
                            <Select defaultValue="234">
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
                        <Input
                            id="occupation"
                            defaultValue={userInfo?.occupation ?? "Not Specified"}
                            readOnly
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <div className="relative">
                            <Input
                                id="address"
                                defaultValue={userInfo?.address ?? ""}
                                readOnly
                            />
                            <MapPin className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                            id="state"
                            className="capitalize"
                            defaultValue={userInfo?.state ?? ""}
                            readOnly
                        />
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
            <Button className="mt-4" onClick={() => setIsDialogOpen(true)}>
                {" "}
                Edit Profile <Edit />
            </Button>
        </TabsContent>
    );
}

export default RiderProfile;
