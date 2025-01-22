import { Check, X } from 'lucide-react'
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import useVerificationStore from "@/stores/verification_details_store";
import UserService from "@/api/user.services";
import notify from "@/utils/toast";
import { useState } from "react";
import CircularLoader from "@/components/circular_loader";

interface PricingOption {
  percentage: number;
  title: string;
  features: {
    text: string;
    included: boolean;
  }[];
}

const pricingOptions: PricingOption[] = [
  {
    percentage: 0,
    title: "You will not pay for your vehicle maintenance",
    features: [
      { text: "Gain 60% of vehicle revenue.", included: true },
      {
        text: "Up to ₦700k in third party liability insurance.",
        included: true,
      },
      { text: "Vooom pays all damage costs", included: true },
      { text: "CEO will soon input this first", included: true },
      { text: "Include exterior damages reimbursement", included: true },
      { text: "Include loss of hour income during repair", included: true },
    ],
  },
  // {
  //     percentage: 20,
  //     title: "Pay for 20% of your vehicle maintenance",
  //     features: [
  //         { text: "Gain 70% of vehicle revenue", included: true },
  //         { text: "Up to $400k in third party liability insurance", included: true },
  //         { text: "Vroom pays 80% of damage costs", included: true },
  //         { text: "CEO will soon input this first", included: true },
  //         { text: "Doesn't include exterior damages reimbursement", included: false },
  //         { text: "Doesn't include loss of hour income during repair", included: false },
  //     ],
  // },
  // {
  //     percentage: 50,
  //     title: "Pay for half of your vehicle maintenance",
  //     features: [
  //         { text: "Gain 85% of vehicle revenue", included: true },
  //         { text: "Up to $300k in third party liability insurance", included: true },
  //         { text: "Vroom pays 50% of damage costs", included: true },
  //         { text: "CEO will soon input this first", included: true },
  //         { text: "Doesn't include exterior damages reimbursement", included: false },
  //         { text: "Doesn't include loss of hour income during repair", included: false },
  //     ],
  // },
];

interface submitVerificationResponse {
  ok: boolean;
}

export default function ChoosePlan({
  handleStepChange,
}: {
  handleStepChange: (step: number) => void;
}) {
  const { primaryID, secondaryID } = useVerificationStore((state) => state);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  console.log(primaryID, secondaryID);
  const handleSubmitVerification = async () => {
    setIsLoading(true);
    try {
      await UserService.uploadVerification({
        primaryID,
        secondaryID,
        guarantor_documents: {},
      }).then((res) => {
        setIsLoading(false);
        const response = res as submitVerificationResponse;
        if (response.ok) {
          notify("Verification submitted successfully", "success");
          handleStepChange(4);
        }
      });
    } catch (error) {
      setIsLoading(false);
      notify("Failed to submit verification. Please try again", "error");
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex gap-6  md:grid-cols-3 max-w-7xl mx-auto p-4 my-10 justify-center">
        {pricingOptions.map((option) => (
          <Card
            key={option.percentage}
            className="relative border border-black"
          >
            <CardHeader className="pb-2">
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-bold">{option.percentage}%</span>
                <span className="text-sm text-muted-foreground">
                  maintenance charges
                </span>
              </div>
              <p className="text-sm">{option.title}</p>
            </CardHeader>
            <hr className="my-4 border-black/20" />
            <CardContent className="space-y-4">
              {option.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  {feature.included ? (
                    <div className="rounded p-[2px] bg-green-500/10">
                      <Check className="h-5 w-5 text-green-500 shrink-0" />
                    </div>
                  ) : (
                    <div className="rounded p-[2px] bg-red-500/10">
                      <X className="h-5 w-5 text-red-500 shrink-0" />
                    </div>
                  )}
                  <span className="text-sm">{feature.text}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-center">
        <button
          className="max-w-3xl w-full mx-auto bg-black text-white py-3 rounded-full hover:bg-gray-800 transition mt-6 flex justify-center"
          onClick={() => handleSubmitVerification()}
        >
          {isLoading ? <CircularLoader color="white" /> : "Next"}
        </button>
      </div>
    </div>
  );
}

