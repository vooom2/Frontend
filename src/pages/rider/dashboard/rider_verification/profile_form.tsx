import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import nigerianStates from "@/utils/states_list";
import useUserStore from "@/stores/user_store";
import MediaServices from "@/api/media.services";
import notify from "@/utils/toast";
import useLoadingStateStore from "@/stores/loading_state_store";


export default function ProfileForm() {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const userInfo = useUserStore((state) => state.userInfo);
    const setLoader = useLoadingStateStore((state) => state.setState);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedImage(event.target.files[0]);
        }
    };

    const handleImageUpload = async () => {
        try {
            if (selectedImage) {
                setLoader(true);

                await MediaServices.uploadSingleFile(selectedImage);
            } else {
                notify("Please select an image", "error");
            }

        } finally {
            setLoader(false);
        }
    }


    return (
        <div className="flex items-center justify-center md:px-4 my-10">
            <div className="w-full max-w-3xl rounded-lg md:py-6 space-y-6">
                {/* Phone Number */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Phone number
                    </label>
                    <Input
                        type="text"
                        placeholder="+234 900 000 0000"
                        className="mt-1 block w-full border rounded-md sm:text-sm px-3 py-2"
                        value={userInfo?.phone_number}
                        readOnly
                    />
                </div>

                {/* Upload Image */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Upload image (max 3mb)
                    </label>
                    <div className="flex flex-col-reverse  gap-4 mt-1">
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
                        {selectedImage && <button
                            onClick={handleImageUpload}
                            className="w-fit bg-onprimary text-white py-2 px-3 rounded-md text-sm cursor-pointer"
                        >
                            Upload
                        </button>}
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


                {/* Gender and Occupation */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Gender
                        </label>
                        <Select>
                            <SelectTrigger className="mt-1 w-full">
                                <SelectValue placeholder="Male" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Occupation
                        </label>
                        <input
                            type="text"
                            placeholder="Rider"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2"
                        />
                    </div>
                </div>

                {/* Country and State */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Country
                        </label>
                        <Select>
                            <SelectTrigger className="mt-1 w-full">
                                <SelectValue placeholder="Nigeria" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="nigeria">Nigeria</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            State
                        </label>
                        <Select>
                            <SelectTrigger className="mt-1 w-full">
                                <SelectValue placeholder="Abuja" />
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
                </div>

                {/* Home Address */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Home address
                    </label>
                    <Input
                        type="text"
                        placeholder="3, Wuse street, Abuja"
                        className="mt-1 block w-full sm:text-sm px-3 py-2"
                    />
                </div>
            </div>
        </div>
    );
}
