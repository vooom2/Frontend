import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { CloudUpload } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import nigerianStates from "@/utils/states_list";
import useVerificationStore, { VerificationDetails } from "@/stores/verification_details_store";
import { useRef, useState } from "react";
import notify from "@/utils/toast";
import CircularLoader from "@/components/circular_loader";
import axios from "axios";
import { handleAxiosError } from "@/utils/axios";
import UserService from "@/api/user.services";


export default function GuarantorForm({ handleStepChange }: { handleStepChange: (step: number) => void }) {
    const { primaryID, secondaryID, guarantor_documents, updateGuarantorInfo } = useVerificationStore();

    const { control, handleSubmit } = useForm<VerificationDetails>({
        defaultValues: {
            primaryID: primaryID,
            secondaryID: secondaryID,
            guarantor_documents: guarantor_documents,
        },
    });
    const [uploading, setUploading] = useState(false);


    const [photos, setPhotos] = useState<{ [key: string]: File | null }>({
        facial: null,
        workId: null,
        nationalId: null
    });
    const [previews, setPreviews] = useState<{ [key: string]: string }>({
        facial: '',
        workId: '',
        nationalId: ''
    });

    const inputRefs = {
        facial: useRef<HTMLInputElement>(null),
        workId: useRef<HTMLInputElement>(null),
        nationalId: useRef<HTMLInputElement>(null)
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                setPhotos(prev => ({ ...prev, [type]: file }));
                setPreviews(prev => ({ ...prev, [type]: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async () => {
        try {
            setUploading(true);
            const urls = await handleImagesUpload();
            if (urls) {
                const response = await UserService.uploadVerification({ primaryID: urls.workId, secondaryID: urls.nationalId, guarantor_documents: guarantor_documents });
                if (response) {
                    notify("Verification document submitted successfully", "success");
                    handleStepChange(4);
                }
            }
        } finally {
            setUploading(false);
        }
    };
    const uploadToCloudinary = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'vooom-cloud');

        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            formData,
        );

        return response.data.secure_url;
    };

    const handleImagesUpload = async () => {
        try {
            if (!photos.facial || !photos.workId || !photos.nationalId) {
                notify("Please upload all required documents", "error");
                return;
            }

            const uploadPromises = Object.entries(photos).map(async ([key, file]) => {
                if (!file) return null;
                const uploadedUrl = await uploadToCloudinary(file);
                return { [key]: uploadedUrl };
            });

            const results = await Promise.all(uploadPromises);
            const uploadedUrls = results.reduce((acc, curr) => ({ ...acc, ...curr }), {});

            notify("Documents uploaded successfully", "success");
            return uploadedUrls;

        } catch (error) {
            notify(handleAxiosError(error), "error");
            throw error;
        }
    };


    const renderUploadArea = (type: string, title: string) => (
        <div className="relative">
            <input
                type="file"
                className="hidden"
                accept="image/*"
                ref={inputRefs[type as keyof typeof inputRefs]}
                onChange={(e) => handleImageChange(e, type)}
            />
            <div
                className="border-2 border-dashed border-gray-300 rounded-lg py-6 px-4 flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
                onClick={() => inputRefs[type as keyof typeof inputRefs].current?.click()}
            >
                {previews[type] ? (
                    <div className="relative w-32 h-32">
                        <img
                            src={previews[type]}
                            alt={title}
                            className="w-full h-full object-cover rounded"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity rounded">
                            <CloudUpload className="text-white" />
                        </div>
                    </div>
                ) : (
                    <div className="flex gap-2 items-center">
                        <CloudUpload className="text-gray-400" />
                        <p className="text-sm text-gray-600">{title}</p>
                    </div>
                )}
            </div>
        </div>
    );



    return (
        <div className="flex items-center justify-center md:px-4 my-10">
            <form
                className="w-full max-w-3xl rounded-lg md:py-6 space-y-6"
                onSubmit={handleSubmit(onSubmit)}
            >
                {/* Full name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Full Name
                    </label>
                    <Controller
                        name="guarantor_documents.full_name"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                placeholder="Jane Doe"
                                className="mt-1 block w-full border rounded-md sm:text-sm px-3 py-2"
                                onChange={(e) => {
                                    field.onChange(e);
                                    updateGuarantorInfo("full_name", e.target.value);
                                }}
                                required
                            />
                        )}
                    />
                </div>

                {/* Gender */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Gender
                        </label>
                        <Controller
                            name="guarantor_documents.gender"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    value={field.value}
                                    onValueChange={(value) => {
                                        field.onChange(value);
                                        updateGuarantorInfo("gender", value);
                                    }}
                                    required
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
                </div>

                {/* Phone Number */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Phone number
                    </label>
                    <Controller
                        name="guarantor_documents.phone_number"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                placeholder="+234 900 000 0000"
                                className="mt-1 block w-full border rounded-md sm:text-sm px-3 py-2"
                                maxLength={11}
                                minLength={10}
                                prefix="+234"
                                onChange={(e) => {
                                    field.onChange(e);
                                    updateGuarantorInfo("phone_number", e.target.value);
                                }}
                                required
                            />
                        )}
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Email Address
                    </label>
                    <Controller
                        name="guarantor_documents.email"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                type="email"
                                placeholder="jane@email.com"
                                className="mt-1 block w-full border rounded-md sm:text-sm px-3 py-2"
                                onChange={(e) => {
                                    field.onChange(e);
                                    updateGuarantorInfo("email", e.target.value);
                                }}
                                required
                            />
                        )}
                    />
                </div>

                {/* Organization */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Organization name
                    </label>
                    <Controller
                        name="guarantor_documents.organization"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                placeholder="Organization name"
                                className="mt-1 block w-full border rounded-md sm:text-sm px-3 py-2"
                                onChange={(e) => {
                                    field.onChange(e);
                                    updateGuarantorInfo("organization", e.target.value);
                                }}
                                required
                            />
                        )}
                    />
                </div>

                {/* Location */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Organization Location
                    </label>
                    <Controller
                        name="guarantor_documents.location"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                placeholder="Organization location"
                                className="mt-1 block w-full border rounded-md sm:text-sm px-3 py-2"
                                onChange={(e) => {
                                    field.onChange(e);
                                    updateGuarantorInfo("location", e.target.value);
                                }}
                                required
                            />
                        )}
                    />
                </div>

                {/* Country and State */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Country
                        </label>
                        <Select defaultValue="nigeria">
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
                        <Controller
                            name="guarantor_documents.state"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    value={field.value}
                                    onValueChange={(value) => {
                                        field.onChange(value);
                                        updateGuarantorInfo("state", value);
                                    }}
                                    required
                                    defaultValue="abuja"
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
                </div>

                {/* Address */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Home address
                    </label>
                    <Controller
                        name="guarantor_documents.address"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                placeholder="3, Wuse street, Abuja"
                                className="mt-1 block w-full sm:text-sm px-3 py-2"
                                onChange={(e) => {
                                    field.onChange(e);
                                    updateGuarantorInfo("address", e.target.value);
                                }}
                                required
                            />
                        )}
                    />
                </div>

                {/* File upload sections */}
                <div className="space-y-4">
                    {renderUploadArea('facial', 'Facial photo')}
                    {renderUploadArea('workId', 'Work ID Card')}
                    {renderUploadArea('nationalId', 'National ID')}
                </div>

                <button
                    type="submit"
                    className="max-w-3xl w-full mx-auto bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition flex items-center justify-center"

                >
                    {uploading ? <CircularLoader color="white" /> : "Submit"}
                </button>
            </form>
        </div>
    );
}
