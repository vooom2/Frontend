import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OwnerProfile from "./owner_profile";
import OwnerWithdrawalSettings from "./owner_withdrawal_settings";
import OwnerSecuritySettings from "./owner_security_settings";

export default function OwnerProfileSettings() {

    return (
        <div className="container mx-auto p-4">
            <div className="grid gap-8 md:grid-cols-[1fr,300px]">
                <div className="space-y-6">
                    {/* Profile Avatar */}
                    <div className="flex items-center gap-4">
                        <div className="relative h-16 w-16">
                            <img
                                src="https://randomuser.me/api/portraits/men/32.jpg"
                                alt="Profile"
                                className="rounded-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Tabs and Form */}
                    <Tabs defaultValue="account" className="w-full">
                        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                            <TabsTrigger
                                value="account"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent"
                            >
                                Account
                            </TabsTrigger>
                            <TabsTrigger
                                value="withdrawal"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent"
                            >
                                Withdrawal
                            </TabsTrigger>
                            <TabsTrigger
                                value="security"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent"
                            >
                                Security
                            </TabsTrigger>
                        </TabsList>
                        <OwnerProfile />
                        <OwnerWithdrawalSettings />
                        <OwnerSecuritySettings />
                    </Tabs>
                </div>

                {/* Right Side Preview */}
                <div className="space-y-4">
                    <Button
                        variant="default"
                        className="w-full bg-black hover:bg-black/90"
                    >
                        Update
                    </Button>

                    <div className="space-y-4">
                        <Card>
                            <CardContent className="p-4">
                                <div className="relative aspect-square w-full">
                                    <img
                                        src="https://randomuser.me/api/portraits/men/32.jpg"
                                        alt="Profile preview"
                                        className="rounded-lg object-cover w-full"
                                    />
                                    <div className="absolute bottom-2 right-2 flex gap-2">
                                        <Button
                                            size="icon"
                                            variant="secondary"
                                            className="h-8 w-8 bg-white hover:bg-white/90"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-4">
                                <div className="relative aspect-[1.6] w-full">
                                    <img
                                        src="https://placehold.co/600x400/"
                                        alt="NIN card"
                                        className="rounded-lg object-cover w-full"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Button className="bg-onprimary">Update NIN card/slip</Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
