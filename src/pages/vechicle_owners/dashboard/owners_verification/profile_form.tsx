import { useForm, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import useUserStore from "@/stores/user_store";
import { useState } from "react";
import MediaServices from "@/api/media.services";
import notify from "@/utils/toast";
import LoadingOverlay from "@/components/loading_overlay";
import UserService from "@/api/user.services";
import nigerianStates from "@/utils/states_list";

interface Inputs {
  gender: string;
  occupation: string;
  country: string;
  state: string;
  address: string;
}

interface UpdateProfileResponse {
  ok: boolean;
}

export default function ProfileForm({
  handleStepChange,
}: {
  handleStepChange: (index: number) => void;
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploadedImg, setUploadedImg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoading(true);
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
      await MediaServices.uploadSingleFile(event.target.files[0])
        .then((res) => {
          console.log(res);
          setUploadedImg(res?.url);
          setLoading(false);

          if (!res.success) {
            notify("Failed to upload image. Please try again", "error");
          }
        })
        .catch((error) => {
          notify("Failed to upload image. Please try again", "error");
          setLoading(false);
          console.log(error);
        });
    }
  };

  const userInfo = useUserStore((state) => state.userInfo);

  const onSubmit = async (data: Inputs) => {
    if (!uploadedImg || !/^https?:\/\/.+\..+$/.test(uploadedImg)) {
      console.log(uploadedImg);
      notify("Please upload a valid image", "error");
      return;
    }
    setLoading(true);

    try {
      console.log(data);
      const payload = { ...data, img: uploadedImg, occupation: "rider" };

      await UserService.updateProfile(payload)
        .then((res: object) => {
          const response = res as UpdateProfileResponse;
          setLoading(false);
          if (response.ok) {
            notify("Profile updated successfully", "success");
            handleStepChange(2);
          }
        })
        .catch((error) => {
          notify("Failed to update profile. Please try again", "error");
          console.log(error);
        });
    } catch (error) {
      notify("Failed to update profile. Please try again", "error");
      console.log(error);
    }
  };

  return (
    <LoadingOverlay isLoading={loading}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-center md:px-4 my-10">
          <div className="w-full max-w-3xl rounded-lg md:py-6 space-y-6">
            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone number
              </label>
              <div className="mt-1 opacity-80 block w-full border rounded-md sm:text-sm px-3 py-2">
                +234{userInfo?.phone_number}
              </div>
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
                <label
                  htmlFor="image-upload"
                  className="w-fit bg-gray-100 border border-gray-300 text-black py-2 px-3 rounded-md text-sm cursor-pointer"
                >
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

            {/* Gender and Occupation */}
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
                  Occupation
                </label>
                <input
                  type="text"
                  placeholder="Business man"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2"
                  {...register("occupation", { required: true })}
                />
                {errors.occupation && (
                  <p className="text-red-500 text-sm">Occupation is required</p>
                )}
              </div>
            </div>

            {/* Country and State */}
            <div className="grid grid-cols-2 gap-4">
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
                        <SelectValue placeholder="Select State" />
                      </SelectTrigger>
                      <SelectContent>
                        {nigerianStates.map((state, i) => {
                          return (
                            <SelectItem value={state.name}>
                              {state.name}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  )}
                />
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
                {...register("address", { required: true })}
              />
              {errors.address && (
                <p className="text-red-500 text-sm">Home address is required</p>
              )}
            </div>

            <div className="mt-24 text-center">
              <button
                type="submit"
                className="max-w-3xl w-full mx-auto bg-black text-white py-3 rounded-3xl hover:bg-gray-800 transition"
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </form>
    </LoadingOverlay>
  );
}
