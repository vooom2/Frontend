import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import bikeMakes from "@/utils/bikeMakes";
import bikeModels from "@/utils/bikeModels";
import { useEffect, useState } from "react";
import useVehicleDeetStore from "@/stores/vehicle_details_store";
interface Vehicle {
  state: string;
  lga: string;
  make: string;
  model: string;
  vehicle_number: string;
  chasis_state: string;
  initial_mileage: number;
  color: string;
}

interface BikeModel {
  id: number;
  name: string;
  brand_id: number;
}

interface VehicleDetailsFormProps {
  handleStepChange: (step: number) => void;
  currentStep: number;
}

function VehicleDetailsForm({
  handleStepChange,
  currentStep,
}: VehicleDetailsFormProps) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Vehicle>({
    mode: "onChange",
    defaultValues: {
      state: "abuja",
      chasis_state: "new",
      color: "black",
    },
  });

  const { saveVehicleDetails } = useVehicleDeetStore();
  const [filteredModels, setFilteredModels] = useState<BikeModel[]>([]);

  // Watch the make field to filter models
  const selectedMake = watch("make");

  useEffect(() => {
    if (selectedMake) {
      const selectedBikeMake = bikeMakes.find(
        (make) => make.name === selectedMake
      );
      if (selectedBikeMake) {
        const models = bikeModels.filter(
          (model) => model.brand_id === selectedBikeMake.id
        );
        setFilteredModels(models);
      }
    }
  }, [selectedMake]);

  const onSubmit = async (data: Vehicle) => {
    try {
      saveVehicleDetails(data);
      handleStepChange(currentStep + 1);
    } catch (error) {
      console.error("Error saving vehicle details:", error);
    }
  };

  const FormField = ({
    label,
    children,
    error,
  }: {
    label: string;
    children: React.ReactNode;
    error?: string;
  }) => (
    <div className="space-y-2">
      <label className="text-sm text-gray-500">{label}</label>
      {children}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        <FormField label="Location" error={errors.state?.message}>
          <Controller
            name="state"
            control={control}
            rules={{ required: "Location is required" }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="bg-gray-50">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="abuja">Abuja</SelectItem>
                  <SelectItem value="lagos">Lagos</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </FormField>

        <FormField label="Local Government Area" error={errors.lga?.message}>
          <Input
            placeholder="Eg: AMAC"
            {...register("lga", {
              required: "LGA is required",
            })}
          />
        </FormField>

        <FormField label="Make" error={errors.make?.message}>
          <Controller
            name="make"
            control={control}
            rules={{ required: "Bike Make is required" }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="bg-gray-50">
                  <SelectValue placeholder="Select a Manufacturer" />
                </SelectTrigger>
                <SelectContent>
                  {bikeMakes.map((bikeMake) => (
                    <SelectItem key={bikeMake.id} value={bikeMake.name}>
                      {bikeMake.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </FormField>

        <FormField label="Model" error={errors.model?.message}>
          <Controller
            name="model"
            control={control}
            rules={{ required: "Bike Model is required" }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="bg-gray-50">
                  <SelectValue placeholder="Select Model" />
                </SelectTrigger>
                <SelectContent>
                  {filteredModels.map((model) => (
                    <SelectItem key={model.id} value={model.name}>
                      {model.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </FormField>

        <FormField label="Reg Number" error={errors.vehicle_number?.message}>
          <Input
            placeholder="123 4567 890"
            {...register("vehicle_number", {
              required: "Registration number is required",
              pattern: {
                value: /^\d{3}\s\d{4}\s\d{3}$/,
                message: "Must be in format: 123 4567 890",
              },
            })}
          />
        </FormField>

        <FormField label="Status of bike" error={errors.chasis_state?.message}>
          <Controller
            name="chasis_state"
            control={control}
            rules={{ required: "Status is required" }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="bg-gray-50">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">Brand new</SelectItem>
                  <SelectItem value="used">Used</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </FormField>

        <FormField label="Mileage" error={errors.initial_mileage?.message}>
          <Input
            type="number"
            placeholder="700"
            {...register("initial_mileage", {
              required: "Mileage is required",
              min: {
                value: 0,
                message: "Mileage cannot be negative",
              },
            })}
          />
        </FormField>

        <FormField label="color" error={errors.color?.message}>
          <Controller
            name="color"
            control={control}
            rules={{ required: "color is required" }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="bg-gray-50">
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "black",
                    "white",
                    "red",
                    "blue",
                    "green",
                    "yellow",
                    "purple",
                    "orange",
                    "pink",
                    "brown",
                    "gray",
                    "cyan",
                    "magenta",
                    "lime",
                    "maroon",
                    "navy",
                    "olive",
                    "teal",
                    "violet",
                  ].map((color) => (
                    <SelectItem key={color} value={color}>
                      {color.charAt(0).toUpperCase() + color.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </FormField>
      </div>

      <div className="flex justify-center">
        <Button
          className="w-full max-w-3xl bg-black text-white hover:bg-black/90"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Next"}
        </Button>
      </div>
    </form>
  );
}

export default VehicleDetailsForm;
