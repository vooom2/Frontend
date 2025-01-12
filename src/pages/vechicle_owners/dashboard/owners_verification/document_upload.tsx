import MediaServices from "@/api/media.services";
import CircularLoader from "@/components/circular_loader";
import useVerificationStore from "@/stores/verification_details_store";
import notify from "@/utils/toast";
import { CloudUpload } from "lucide-react";
import { useState, useRef } from "react";

export default function DocumentUpload({
  handleStepChange,
}: {
  handleStepChange: (step: number) => void;
}) {
  const [driverLicense, setDriverLicense] = useState<File | null>(null);
  const [otherDocument, setOtherDocument] = useState<File | null>(null);
  const [previews, setPreviews] = useState<{ facial: string; other: string }>({
    facial: "",
    other: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const facialInputRef = useRef<HTMLInputElement>(null);
  const otherInputRef = useRef<HTMLInputElement>(null);
  const updatePrimaryID = useVerificationStore(
    (state) => state.updatePrimaryID
  );
  const updateSecondaryID = useVerificationStore(
    (state) => state.updateSecondaryID
  );

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    isFacial: boolean
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        if (isFacial) {
          setDriverLicense(file);
          setPreviews((prev) => ({ ...prev, facial: reader.result as string }));
        } else {
          setOtherDocument(file);
          setPreviews((prev) => ({ ...prev, other: reader.result as string }));
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleDivClick = (isFacial: boolean) => {
    if (isFacial) {
      facialInputRef.current?.click();
    } else {
      otherInputRef.current?.click();
    }
  };

  const handleImagesUpload = async () => {
    if (driverLicense == null || otherDocument == null) {
      notify("Please select missing photo", "error");
      return;
    }
    try {
      setIsLoading(true);
      const url1 = await MediaServices.uploadSingleFile(driverLicense);
      updatePrimaryID(url1.url);
      const url2 = await MediaServices.uploadSingleFile(otherDocument);
      updateSecondaryID(url2.url);
      handleStepChange(3);
    } finally {
      setIsLoading(false);
    }
  };

  const renderUploadArea = (isFacial: boolean, title: string) => (
    <div className="relative">
      <input
        type="file"
        className="hidden"
        accept="image/*"
        ref={isFacial ? facialInputRef : otherInputRef}
        onChange={(e) => handleImageChange(e, isFacial)}
      />
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg py-6 px-4 flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
        onClick={() => handleDivClick(isFacial)}
      >
        {(isFacial ? previews.facial : previews.other) ? (
          <div className="relative w-32 h-32">
            <img
              src={isFacial ? previews.facial : previews.other}
              alt="Preview"
              className="w-full h-full object-cover rounded"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity rounded">
              <CloudUpload className="text-white" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="mb-2">
              <CloudUpload className="text-gray-400" />
            </div>
            <p className="text-sm text-gray-600">{title}</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 md:px-4 my-10">
      <div className="w-full max-w-3xl space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-center">Compulsory</h3>
          {renderUploadArea(true, "Driver's license")}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-center">
            Submit one of these documents
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {renderUploadArea(false, "Secondary ID")}
          </div>
          <small className="text-xs block w-full text-gray-600 text-center">
            NIN card/slip Voter's card International passport"
          </small>
        </div>
      </div>
      <button
        className="max-w-3xl w-full mx-auto bg-black text-white py-3 rounded-full hover:bg-gray-800 transition mt-6 flex justify-center"
        onClick={() => handleImagesUpload()}
      >
        {isLoading ? <CircularLoader color="white" /> : "Next"}
      </button>
    </div>
  );
}
