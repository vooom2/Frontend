// import { Button } from "@/components/ui/button";
import { USER_ROLES } from "@/utils/constant";
import { useState } from "react";
import { useNavigate } from "react-router";
import VehicleDetailsForm from "./vehicle_details_form";
import React from "react";
import VehicleDocumentsUpload from "./vehicle_documents_upload";
import VehicleFeatures from "./vehicle_features";
import VehicleRegistrationFinale from "./vehicle_registration_finale";

export default function VehicleRegistration() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const steps = [
    { number: 1, label: "Vehicle details" },
    { number: 2, label: "Vehicle registration" },
    { number: 3, label: "Vehicle features" },
  ];

  const handleStepChange = (index: number) => {
    if (index >= 3) {
      setTimeout(() => {
        navigate(`/${USER_ROLES.OWNER}/dashboard`);
      }, 3000)
    }
    setCurrentStep(index);
  };

  return (
    <div className="mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-8 sm:mb-10">
          Host your vehicle
        </h1>
        {/* Step indicator */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-6xl mx-auto px-4 py-6 text-nowrap">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div className="flex flex-col items-center w-full sm:w-auto">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold
                ${currentStep >= index
                      ? "bg-green-500 text-white"
                      : "border border-gray-200 text-gray-400"
                    }`}
                >
                  {step.number}
                </div>
                <span
                  className={`text-sm mt-2 text-center
              ${currentStep >= index ? "text-black" : "text-gray-400"}`}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`${currentStep > index ? "bg-green-500" : "bg-gray-200"
                    } hidden sm:block w-24 h-0.5 `}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      {currentStep == 0 && (
        <VehicleDetailsForm
          handleStepChange={handleStepChange}
          currentStep={currentStep}
        />
      )}
      {currentStep == 1 && (
        <VehicleDocumentsUpload
          handleStepChange={handleStepChange}
          currentStep={currentStep}
        />
      )}
      {currentStep == 2 && (
        <VehicleFeatures
          handleStepChange={handleStepChange}
          currentStep={currentStep}
        />
      )}
      {currentStep > 2 && <VehicleRegistrationFinale />}

      {/* <div className="flex justify-center mt-8 max-w-2xl mx-auto">
        <Button
          className="w-full max-w-3xl bg-black text-white hover:bg-black/90"
          onClick={() => handleStepChange(currentStep + 1)}
        >
          {currentStep <= 2 ? "Next" : "Done"}
        </Button>
      </div> */}
    </div>
  );
}
