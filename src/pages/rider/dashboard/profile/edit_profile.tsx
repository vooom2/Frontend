import React from "react";
import { Camera, Loader, Loader2 } from "lucide-react";
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
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import useUserStore from "@/stores/user_store";
import nigerianStates from "@/utils/states_list";
import { Controller, useForm } from "react-hook-form";
import UserService from "@/api/user.services";
import notify from "@/utils/toast";
import MediaServices from "@/api/media.services";
import { Button } from "@/components/ui/button";

type Inputs = {
    img: string;
    gender: string;
    country: string;
    state: string;
    address: string;
    occupation: string;
};

interface EditProfileProps {
    setIsDialogOpen: (isOpen: boolean) => void;
    isDialogOpen: boolean;
}

function EditProfile({ setIsDialogOpen, isDialogOpen }: EditProfileProps) {
    const userInfo = useUserStore((state) => state.userInfo);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingOverlay, setIsLoadingOverlay] = useState(false);
    const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
    const { register, handleSubmit, control } = useForm<Inputs>();

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            handleImageUpload(event.target.files[0]);
        }
    };
    const handleImageUpload = async (imageFile: File) => {
        try {
            setIsLoadingOverlay(true);
            const response = await MediaServices.uploadSingleFile(imageFile);
            if (response.url) {
                notify("Image uploaded successfully", "success");
                setSelectedImageUrl(response.url);
            }
        } finally {
            setIsLoadingOverlay(false);
        }
    };

    const onSubmit = async (data: Inputs) => {
        try {
            setIsLoading(true);
            const res = await UserService.updateProfile({
                ...data,
                img:
                    selectedImageUrl ??
                    userInfo?.img ??
                    "https://ui-avatars.com/api/?name=",
                gender: userInfo?.gender != null && userInfo?.gender.length <= 0 ? data.gender : userInfo?.gender,
                country: "Nigeria",
            });
            if (res != null) {
                notify("Profile updated successfully", "success");
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-h-[70vh]  overflow-scroll">
                    <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                    </DialogHeader>
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-2 mx-auto">
                            <div className="flex items-center space-x-4">
                                <div className="relative mx-auto">
                                    <div>
                                        <img
                                            src={
                                                selectedImageUrl ??
                                                userInfo?.img ??
                                                "https://ui-avatars.com/api/?name="
                                            }
                                            alt="Avatar"
                                            className="w-28 h-28 rounded-full object-cover"
                                        />
                                        {isLoadingOverlay && (
                                            <div className="w-28 h-28 bg-black/50 absolute top-0 rounded-full flex justify-center items-center">
                                                <Loader color="white" className="animate-spin" />
                                            </div>
                                        )}
                                    </div>
                                    <label
                                        htmlFor="avatarUpload"
                                        className="absolute bottom-0 right-2 bg-gray-800 text-white p-1 rounded-full cursor-pointer"
                                    >
                                        <Camera className="w-5 h-5" />
                                    </label>
                                    <Input
                                        type="file"
                                        id="avatarUpload"
                                        className="hidden"
                                        accept="image/png, image/jpeg"
                                        onChange={handleImageChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="editFullName">Full Name</Label>
                            <Input
                                id="editFullName"
                                className="capitalize"
                                disabled
                                defaultValue={userInfo?.full_name}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="editEmail">Email</Label>
                            <Input
                                id="editEmail"
                                type="email"
                                disabled
                                defaultValue={userInfo?.email}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="editPhone">Phone Number</Label>
                            <Input
                                id="editPhone"
                                disabled
                                defaultValue={userInfo?.phone_number}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="editOccupation">Occupation</Label>
                            <Input
                                id="editOccupation"
                                defaultValue={userInfo?.occupation ?? ""}
                                {...register("occupation")}
                                required
                            />
                        </div>
                        {userInfo?.gender != null && userInfo.gender.length <= 0 && <div className="space-y-2">
                            <Label htmlFor="editGender">Gender</Label>
                            <Controller
                                name="gender"
                                control={control}
                                defaultValue={userInfo?.state ?? ""}
                                render={({ field }) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        required
                                        defaultValue={userInfo?.state ?? undefined}

                                    >
                                        <SelectTrigger {...field}>
                                            <SelectValue placeholder="Select gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="male">Male</SelectItem>
                                            <SelectItem value="female">Female</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>}
                        <div className="space-y-2">
                            <Label htmlFor="editAddress">Address</Label>
                            <Input
                                id="editAddress"
                                defaultValue={userInfo?.address ?? ""}
                                {...register("address")}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="editState">State</Label>
                            <Controller
                                name="state"
                                control={control}
                                defaultValue={userInfo?.state ?? ""}
                                render={({ field }) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        required
                                        defaultValue={userInfo?.state ?? undefined}
                                    >
                                        <SelectTrigger {...field}>
                                            <SelectValue placeholder="Select state" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {nigerianStates.map((state, i) => (
                                                <SelectItem key={i} value={state.name}>
                                                    {state.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="editCountry">Country</Label>
                            <Select defaultValue="nigeria">
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="nigeria">Nigeria</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Button type="submit" className="min-w-[100px]">
                            {isLoading ? <Loader2 className="animate-spin" /> : "Update"}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default EditProfile;
