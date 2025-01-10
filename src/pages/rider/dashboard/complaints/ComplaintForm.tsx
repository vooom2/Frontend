/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useForm, Controller } from "react-hook-form";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Upload } from 'lucide-react'
import { useEffect, useState } from "react"
import useFleetManagersStore from "@/stores/rider_store/fleet_managers_store"
import FleetManagerServices from "@/api/fleet_manager.service"
import notify from "@/utils/toast"
import MediaServices from "@/api/media.services"
import { validateFile } from "@/utils/utils"
import CircularLoader from "@/components/circular_loader"
const issues = [
    { id: 1, name: "Vehicle Accident" },
    { id: 2, name: "Authorities Issue" },
    { id: 3, name: "Permit" },
    { id: 4, name: "Family Problem" },
    { id: 5, name: "Personal/Health Issue" },
    { id: 6, name: "Breakdown of Bikes" },
    { id: 7, name: "Remittance" },
]
type ComplaintFormData = {
    category: string;
    date: string;
    time: string;
    fleetManager: string;
    location: string;
    detail: string;
    images: string[];
};

export default function ComplaintForm() {
    const { handleSubmit, register, control } = useForm<ComplaintFormData>();
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const fleetManagerStore = useFleetManagersStore((state) => state);
    const acceptedTypes = ['image/jpeg', 'image/png'];
    const [isLoading, setIsLoading] = useState(false);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedImage(event.target.files[0]);
        }
    };

    const handleImageUpload = async (): Promise<{ success: boolean; url: string | null }> => {
        try {
            if (!selectedImage) {
                notify("Please select an image", "error");
                return { success: false, url: null };
            }
            if (!validateFile(selectedImage!, 3, acceptedTypes)) {
                return { success: false, url: null };
            }
            const response = await MediaServices.uploadSingleFile(selectedImage);
            if (response.url) {
                notify("Image uploaded successfully", "success");
                return { success: true, url: response.url };
            }
            return { success: false, url: null };
        } catch {
            return { success: false, url: null };
        }
    };

    const onSubmit = async (data: ComplaintFormData) => {
        try {
            const manager = fleetManagerStore.managers?.find((manager) => manager.name === data.fleetManager);
            if (manager) {
                data.fleetManager = manager._id!;
            } else {
                notify("Fleet manager not found", "error");
                return;
            }
            setIsLoading(true);
            const { success, url } = await handleImageUpload();
            if (!success) return;
            const response = await FleetManagerServices.submitComplaint({ ...data, images: [url!] });
            if (response == null) return;
            notify("Complaint created successfully", "success");
            setTimeout(() => {
                window.location.href = '/rider/dashboard/complaints';
            }, 2000);

        } finally {
            setIsLoading(false);
        }

    };

    useEffect(() => {
        const fetchFleetManagers = async () => {
            const res = await FleetManagerServices.getFleetManagers() as {
                docs: any;
            };
            if (res != null) {
                fleetManagerStore.setManagers(res.docs);
            }
        };
        fetchFleetManagers();

    }, []);
    return (
        <div className="max-w-3xl mx-auto p-4">
            <Card className="p-6 shadow-none">
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="text-xl font-semibold text-center mb-6">Complaint</h1>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Controller
                                name="category"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        value={field.value}
                                        onValueChange={(value) => {
                                            field.onChange(value);
                                        }}
                                        required
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {issues.map((issue) => (
                                                <SelectItem key={issue.id} value={issue.name}>
                                                    {issue.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="date">Date</Label>
                                <Input
                                    type="date"
                                    id="date"
                                    defaultValue={new Date().toISOString().split("T")[0]}
                                    className="bg-gray-50"
                                    required
                                    {...register("date")}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="time">Time</Label>
                                <Input
                                    type="time"
                                    id="time"
                                    defaultValue={new Date().toISOString().split("T")[1].slice(0, 5)}
                                    className="bg-gray-50"
                                    required
                                    {...register("time")}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <Input
                                    id="location"
                                    placeholder="Detailed location"
                                    className="bg-gray-50"
                                    required
                                    {...register("location")}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="fleet-manager">Fleet Manager</Label>
                                <Controller
                                    name="fleetManager"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            value={field.value}
                                            onValueChange={(value) => {

                                                field.onChange(value);
                                            }}
                                            required
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select fleet manager" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {fleetManagerStore.managers ? fleetManagerStore.managers.map((manager) => (
                                                    <SelectItem key={manager._id} value={manager.name}>
                                                        {manager.name}
                                                    </SelectItem>
                                                )) : <SelectItem value="Loading...">Loading...</SelectItem>}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="explanation">Give a detailed explanation</Label>
                            <Textarea
                                id="explanation"
                                placeholder="During my work hours..."
                                className="min-h-[100px] bg-gray-50"
                                required
                                minLength={50}
                                {...register("detail")}
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="border-2 border-dashed rounded-lg p-4 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                                <input
                                    type="file"
                                    id="image"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                                {!selectedImage && <label htmlFor="image" className="cursor-pointer">
                                    <Upload className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                                    <span className="text-sm text-gray-500">Upload image</span>
                                </label>}
                                {selectedImage && (
                                    <div className="relative w-full h-32" >
                                        <img
                                            src={URL.createObjectURL(selectedImage)}
                                            alt="Preview"
                                            className="w-full h-full object-cover rounded"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity rounded">
                                            <label htmlFor="image" className="cursor-pointer">
                                                <Upload className="h-6 w-6 mx-auto mb-2 text-white" />
                                            </label>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <p className="text-xs text-red-500">Compulsory</p>
                        </div>
                    </div>

                    <Button className="w-full bg-black text-white hover:bg-gray-900" size="lg">
                        {isLoading ? <CircularLoader color="white" /> : "Submit"}
                    </Button>
                </form>
            </Card>
        </div>
    )
}

