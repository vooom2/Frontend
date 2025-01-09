import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRiderPendingVehicleStore } from "@/stores/rider_store/rider_pending_vehicle_store";
import useUserStore from "@/stores/user_store";
import formatCurrency from "@/utils/formatCurrency";
import UserService from "@/api/user.services";
import { useState } from "react";
import CircularLoader from "@/components/circular_loader";
import notify from "@/utils/toast";


export default function BikeApplication() {
  const vehicle = useRiderPendingVehicleStore((state) => state.pendingVehicle);
  const userInfo = useUserStore((state) => state.userInfo);
  const payments = [{ amount: formatCurrency(40000), duration: "2 weeks" }];
  const [isLoading, setIsLoading] = useState(false);

  const submitDownPayment = async () => {
    try {
      setIsLoading(true);
      const res = await UserService.makeVehicleDownPayment();
      if (res) {
        notify("Redirecting to paystack....");
        setTimeout(() => {
          window.location.href = res.payment_url.data.authorization_url;
        }, 2000);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mt-20 mx-auto p-4">
      <Card className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Downpayment for Bike</h1>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden">
              <img
                src={vehicle?.vehicle_images[0]}
                alt={vehicle?.make}
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-medium">{vehicle?.make}</p>
              <p className="text-sm text-gray-500">{vehicle?.vehicle_number}</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <Avatar>
              <AvatarImage src={userInfo!.img!} alt="profile_picture" />
              <AvatarFallback>
                {userInfo!.full_name.split(" ")[0]}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-sm mt-2 font-semibold capitalize">
              {userInfo?.full_name}
            </h2>
          </div>
        </div>

        <Select defaultValue="payment-0">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a payment option" />
          </SelectTrigger>
          <SelectContent>
            {payments.map((payment, index) => (
              <SelectItem key={index} value={`payment-${index}`}>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {payment.amount.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({payment.duration})
                    </span>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="pt-4 border-t">
          <div className="flex justify-between mb-4">
            <span className="font-medium">Total</span>
            <span className="font-medium">
              {payments[0].amount}
            </span>
          </div>
          <Button
            className="w-full bg-black text-white hover:bg-gray-900"
            size="lg"
            onClick={submitDownPayment}
          >
            {isLoading ? <CircularLoader color="white" /> : "Proceed"}

          </Button>
        </div>
      </Card>
    </div>
  );
}
