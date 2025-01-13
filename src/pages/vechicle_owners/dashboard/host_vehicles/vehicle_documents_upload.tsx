import { Upload } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import useVehicleRegStore from "@/stores/vehicle_reg_store";
import MediaServices from "@/api/media.services";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import notify from "@/utils/toast";

interface UploadSectionProps {
  title: string;
  label: string;
  onUpload: (label: string, file: File) => Promise<void>;
  isUploaded: boolean;
}

interface VehicleDocumentsUploadProps {
  handleStepChange: (step: number) => void;
  currentStep: number;
}

interface VehicleDocuments {
  documents: {
    vio: string;
    amac: string;
    lga: string;
    insurance: string;
    receipt: string;
  };
}

const DOCUMENTS = [
  { title: "VIO registration", label: "vio" },
  { title: "Amac registration", label: "amac" },
  { title: "Bwari registration", label: "lga" },
  { title: "Insurance", label: "insurance" },
  { title: "Bike Receipt", label: "receipt" },
] as const;

const UploadSection = ({
  title,
  label,
  onUpload,
  isUploaded,
}: UploadSectionProps) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      notify("Please upload a PDF file", "error");
      return;
    }

    try {
      setUploading(true);
      await onUpload(label, file);
    } catch (error) {
      notify("Error uploading file. Please try again.", "error");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="bg-gray-100">
      <CardContent className="p-4">
        <div className="flex flex-col items-center gap-2">
          <div
            className={`w-12 h-12 ${
              isUploaded ? "bg-green-600" : "bg-red-900"
            } rounded-lg flex items-center justify-center transition-colors`}
          >
            <Upload className="w-6 h-6 text-white" />
          </div>
          <Label htmlFor={`upload-${label}`} className="cursor-pointer w-full">
            <div className="bg-white rounded px-4 py-2 text-center hover:bg-gray-50 transition-colors">
              {uploading
                ? "Uploading..."
                : isUploaded
                ? "Replace PDF"
                : "Upload PDF"}
            </div>
            <input
              type="file"
              id={`upload-${label}`}
              accept=".pdf"
              onChange={handleFileChange}
              className="sr-only"
              disabled={uploading}
            />
          </Label>
          <span className="text-sm text-gray-600">{title}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default function VehicleDocumentsUpload({
  handleStepChange,
  currentStep,
}: VehicleDocumentsUploadProps) {
  const [documents, setDocuments] = useState<Record<string, string>>({
    vio: "",
    amac: "",
    lga: "",
    insurance: "",
    receipt: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async (label: string, file: File) => {
    try {
      const res = await MediaServices.uploadSingleFile(file);
      if (res.success && res.url) {
        setDocuments((prev) => ({
          ...prev,
          [label]: res.url,
        }));
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      notify("Error uploading file. Please try again.", "error");
      throw error;
    }
  };

  const handleNext = async () => {
    setIsLoading(true);
    try {
      // Check if all documents are uploaded
      const missingDocuments = DOCUMENTS.filter((doc) => !documents[doc.label]);

      if (missingDocuments.length > 0) {
        notify(
          `Please upload: ${missingDocuments.map((d) => d.title).join(", ")}`,
          "error"
        );
        return;
      }

      const vehicleInfo: VehicleDocuments = {
        documents: {
          vio: documents.vio,
          amac: documents.amac,
          lga: documents.lga,
          insurance: documents.insurance,
          receipt: documents.receipt,
        },
      };

      useVehicleRegStore.setState({ vehicleInfo });
      handleStepChange(currentStep + 1);
    } catch (error) {
      notify("Error saving documents. Please try again.", "error");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
        {DOCUMENTS.map((doc) => (
          <UploadSection
            key={doc.label}
            title={doc.title}
            label={doc.label}
            onUpload={handleUpload}
            isUploaded={Boolean(documents[doc.label])}
          />
        ))}
      </div>

      <div className="flex justify-center">
        <Button
          className="w-full max-w-3xl bg-black text-white hover:bg-black/90"
          onClick={handleNext}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Next"}
        </Button>
      </div>
    </div>
  );
}