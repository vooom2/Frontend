/* eslint-disable @typescript-eslint/no-explicit-any */
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect } from "react";
import FleetManagerServices from "@/api/fleet_manager.service";
import useFleetManagersStore from "@/stores/rider_store/fleet_managers_store";

function DetailsField({ label, value }: { label: string; value: string }) {
    return (
        <div className="space-y-1">
            <p className="text-sm text-gray-500">{label}</p>
            <div className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
                <span>{value}</span>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => navigator.clipboard.writeText(value)}
                >
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copy {label}</span>
                </Button>
            </div>
        </div>
    );
}

export default function FleetManager() {
    const setManagers = useFleetManagersStore((state) => state.setManagers);
    const managers = useFleetManagersStore((state) => state.managers);
    const currentManager = useFleetManagersStore((state) => state.currentManager);
    const setCurrentUser = useFleetManagersStore((state) => state.setCurrentUser);
    useEffect(() => {
        const fetchInfo = async () => {
            const res = await FleetManagerServices.getFleetManagers() as {
                docs: any;
            };

            if (res != null) {
                setManagers(res.docs);
            }
        };

        fetchInfo();
    }, []);
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-semibold mb-6">Fleet Manager</h1>
            {managers && (
                <div className="grid md:grid-cols-[300px_1fr] gap-6">
                    {managers.length > 0 ? (
                        <div className="space-y-2 bg-white rounded-xl p-6">
                            {managers.map((manager) => (
                                <div
                                    key={manager._id}
                                    className={`flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer ${currentManager?._id === manager._id ? 'bg-black text-white hover:text-black' : ''}`}
                                    onClick={() => setCurrentUser(manager)}
                                >
                                    <img
                                        src={manager.avatar}
                                        alt={manager.role}
                                        width={40}
                                        height={40}
                                        className="rounded-full"
                                    />
                                    <div>
                                        <p className="font-medium">{manager.name}</p>
                                        <p className="text-sm text-gray-500">{manager.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className=" text-center text-gray-500 mx-auto">
                            No fleet managers
                        </div>
                    )}

                    {currentManager ? (
                        <Card className="p-6 border-0 shadow-none">
                            <h2 className="text-lg font-semibold mb-6">Details</h2>
                            <div className="grid gap-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <DetailsField label="Name" value={currentManager.name} />
                                    <DetailsField
                                        label="Phone Number"
                                        value={currentManager.phone}
                                    />
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <DetailsField
                                        label="Email Address"
                                        value={currentManager.email}
                                    />
                                    <DetailsField label="State" value={currentManager.state} />
                                </div>

                            </div>
                        </Card>
                    ) :
                        <Card className="p-6 border-0 shadow-none">
                            <div className="h-6 w-24 bg-gray-200 rounded mb-6" />
                            <div className="grid gap-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Name and Phone fields */}
                                    <div className="space-y-2">
                                        <div className="h-4 w-16 bg-gray-200 rounded" />
                                        <div className="h-5 bg-gray-200 rounded w-32" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-4 w-24 bg-gray-200 rounded" />
                                        <div className="h-5 bg-gray-200 rounded w-32" />
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Email and State fields */}
                                    <div className="space-y-2">
                                        <div className="h-4 w-24 bg-gray-200 rounded" />
                                        <div className="h-5 bg-gray-200 rounded w-40" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-4 w-16 bg-gray-200 rounded" />
                                        <div className="h-5 bg-gray-200 rounded w-28" />
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* LGA and Location fields */}
                                    <div className="space-y-2">
                                        <div className="h-4 w-12 bg-gray-200 rounded" />
                                        <div className="h-5 bg-gray-200 rounded w-36" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-4 w-20 bg-gray-200 rounded" />
                                        <div className="h-5 bg-gray-200 rounded w-44" />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    }
                </div>
            )}
            {!managers && <SkeletonLoader />}
        </div>
    );
}

const SkeletonLoader = () => {
    return (
        <div className="grid md:grid-cols-[300px_1fr] gap-6">
            {/* Managers list skeleton */}
            <div className="space-y-2 bg-white rounded-xl p-6">
                {[...Array(5)].map((_, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-3 p-2 rounded-lg animate-pulse"
                    >
                        {/* Avatar skeleton */}
                        <div className="w-10 h-10 rounded-full bg-gray-200" />
                        <div className="space-y-2 flex-1">
                            {/* Name skeleton */}
                            <div className="h-4 bg-gray-200 rounded w-24" />
                            {/* Role skeleton */}
                            <div className="h-3 bg-gray-200 rounded w-20" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Details skeleton */}
            <Card className="p-6 border-0 shadow-none">
                <div className="h-6 w-24 bg-gray-200 rounded mb-6" />
                <div className="grid gap-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Name and Phone fields */}
                        <div className="space-y-2">
                            <div className="h-4 w-16 bg-gray-200 rounded" />
                            <div className="h-5 bg-gray-200 rounded w-32" />
                        </div>
                        <div className="space-y-2">
                            <div className="h-4 w-24 bg-gray-200 rounded" />
                            <div className="h-5 bg-gray-200 rounded w-32" />
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Email and State fields */}
                        <div className="space-y-2">
                            <div className="h-4 w-24 bg-gray-200 rounded" />
                            <div className="h-5 bg-gray-200 rounded w-40" />
                        </div>
                        <div className="space-y-2">
                            <div className="h-4 w-16 bg-gray-200 rounded" />
                            <div className="h-5 bg-gray-200 rounded w-28" />
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* LGA and Location fields */}
                        <div className="space-y-2">
                            <div className="h-4 w-12 bg-gray-200 rounded" />
                            <div className="h-5 bg-gray-200 rounded w-36" />
                        </div>
                        <div className="space-y-2">
                            <div className="h-4 w-20 bg-gray-200 rounded" />
                            <div className="h-5 bg-gray-200 rounded w-44" />
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};
