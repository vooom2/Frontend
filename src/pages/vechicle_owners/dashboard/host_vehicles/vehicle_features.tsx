import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useVehicleRegStore from "@/stores/vehicle_reg_store";
import useVehicleDeetStore from "@/stores/vehicle_details_store";
import notify from "@/utils/toast";
import OwnerServices from "@/api/owner.services";

interface FeatureOption {
  id: string;
  label: string;
  options: readonly [string, string]; // Made readonly to prevent accidental modifications
  defaultValue: string;
}

const features: readonly FeatureOption[] = [
  {
    id: "transmission",
    label: "Gear transmission",
    options: ["Automatic", "Manual"] as const,
    defaultValue: "Automatic",
  },
  {
    id: "bluetooth",
    label: "Bluetooth",
    options: ["Yes", "No"] as const,
    defaultValue: "Yes",
  },
  {
    id: "android",
    label: "Android auto",
    options: ["Yes", "No"] as const,
    defaultValue: "Yes",
  },
  {
    id: "camera",
    label: "Rear camera",
    options: ["Yes", "No"] as const,
    defaultValue: "Yes",
  },
  {
    id: "aux",
    label: "Aux input",
    options: ["Yes", "No"] as const,
    defaultValue: "No",
  },
  {
    id: "gps",
    label: "GPS",
    options: ["Yes", "No"] as const,
    defaultValue: "No",
  },
  {
    id: "usbInput",
    label: "USB input",
    options: ["Yes", "No"] as const,
    defaultValue: "No",
  },
  {
    id: "usbOutput",
    label: "USB output",
    options: ["Yes", "No"] as const,
    defaultValue: "No",
  },
] as const;

interface VehicleFeaturesProps {
  handleStepChange: (step: number) => void;
  currentStep: number;
}

export default function VehicleFeatures({
  handleStepChange,
  currentStep,
}: VehicleFeaturesProps) {
  const [selections, setSelections] = React.useState<Record<string, string>>(
    () =>
      features.reduce(
        (acc, feature) => ({
          ...acc,
          [feature.id]: feature.defaultValue,
        }),
        {}
      )
  );

  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const vehicleInfo = useVehicleRegStore();
  const vehicleDetails = useVehicleDeetStore();

  const handleSelection = React.useCallback(
    (featureId: string, value: string) => {
      setSelections((prev) => ({
        ...prev,
        [featureId]: value,
      }));
    },
    []
  );

  const handleNext = async () => {
    try {
      setError(null);
      setIsLoading(true);

      if (!vehicleInfo || !vehicleDetails) {
        throw new Error("Missing vehicle information");
      }

      const payload = {
        ...vehicleInfo.vehicleInfo,
        ...vehicleDetails.vehicleInfo,
        features: { ...selections },
      };

      const response = await OwnerServices.hostVehicle(payload);

      if (response && response.ok) {
        notify("Vehicle hosted successfully", "success");
        handleStepChange(currentStep + 1);
      } else {
        throw new Error("Failed to host vehicle");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      notify(err instanceof Error ? err.message : "An error occurred", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const FeatureCard = React.memo(({ feature }: { feature: FeatureOption }) => (
    <Card className="px-6 py-8 shadow-none border border-black">
      <div className="space-y-3">
        <div className="text-sm font-medium text-gray-700">{feature.label}</div>
        <div className="flex gap-2">
          {feature.options.map((option) => (
            <button
              key={`${feature.id}-${option}`}
              onClick={() => handleSelection(feature.id, option)}
              className={`
                flex-1 px-2 py-2 rounded-md text-xs font-medium
                transition-colors duration-200
                ${
                  selections[feature.id] === option
                    ? "bg-[#FF5722] text-white"
                    : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                }
              `}
              type="button"
              disabled={isLoading}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </Card>
  ));

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-md">
          {error}
        </div>
      )}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature) => (
          <FeatureCard key={feature.id} feature={feature} />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Button
          className="w-full max-w-3xl bg-black text-white hover:bg-black/90 disabled:bg-gray-300"
          onClick={handleNext}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Next"}
        </Button>
      </div>
    </div>
  );
}
