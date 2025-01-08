import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import nigerianStates from "@/utils/states_list";
import useUserStore from "@/stores/user_store";
import notify from "@/utils/toast";
import LoadingOverlay from "@/components/loading_overlay";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import MediaServices from "@/api/media.services";
import { validateFile } from "@/utils/utils";
import UserService from "@/api/user.services";

type Inputs = {
    img: string;
    phone_number: string;
    address: string;
    gender: string;
    state: string;
    country: string;
};

export default function ProfileForm({ handleStepChange }: { handleStepChange: (step: number) => void }) {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const userInfo = useUserStore((state) => state.userInfo);
    const [isLoading, setIsLoading] = useState(false);
    const acceptedTypes = ['image/jpeg', 'image/png'];

    const {
        register,
        control,
        handleSubmit,
    } = useForm<Inputs>({
        defaultValues: {
            phone_number: userInfo?.phone_number || '',
            gender: 'male',
            country: 'nigeria',
            state: 'Lagos',
            address: ''
        }
    });

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
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            setIsLoading(true);
            const { success, url } = await handleImageUpload();
            if (!success) return;

            data.img = url!;
            await UserService.updateProfile(data);
            notify("Profile updated Successfully", "success");
            handleStepChange(2);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <LoadingOverlay isLoading={isLoading}>
            <div className="flex items-center justify-center md:px-4 my-10">
                <form className="w-full max-w-3xl rounded-lg md:py-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {/* Phone Number */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Phone number
                        </label>
                        <Input
                            type="text"
                            placeholder="+234 900 000 0000"
                            className="mt-1 block w-full border rounded-md sm:text-sm px-3 py-2"
                            readOnly
                            {...register("phone_number", { required: true })}
                        />
                    </div>

                    {/* Upload Image */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Upload image (max 3mb)
                        </label>
                        <div className="flex flex-col-reverse gap-4 mt-1">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                                id="image-upload"
                            />
                            <label htmlFor="image-upload" className="w-fit bg-gray-100 border border-gray-300 text-black py-2 px-3 rounded-md text-sm cursor-pointer">
                                {!selectedImage ? "Select a photo" : "Change photo"}
                            </label>
                            {selectedImage && (
                                <div>
                                    <img
                                        src={URL.createObjectURL(selectedImage)}
                                        alt="Selected"
                                        className="h-32 w-32 object-cover rounded-md"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Gender and Country */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Gender
                            </label>
                            <Controller
                                name="gender"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger className="mt-1 w-full">
                                            <SelectValue placeholder="Select gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="male">Male</SelectItem>
                                            <SelectItem value="female">Female</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Country
                            </label>
                            <Controller
                                name="country"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger className="mt-1 w-full">
                                            <SelectValue placeholder="Select country" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="nigeria">Nigeria</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                    </div>

                    {/* State and Address */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                State
                            </label>
                            <Controller
                                name="state"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger className="mt-1 w-full">
                                            <SelectValue placeholder="Select state" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {nigerianStates.map((state, index) => (
                                                <SelectItem key={index} value={state.name}>
                                                    {state.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Home address
                            </label>
                            <Input
                                type="text"
                                placeholder="3, Wuse street, Abuja"
                                className="mt-1 block w-full sm:text-sm px-3 py-2"
                                required
                                {...register("address", { required: true })}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="max-w-3xl w-full mx-auto bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
                    >
                        Update
                    </button>
                </form>
            </div>
        </LoadingOverlay>
    );
}