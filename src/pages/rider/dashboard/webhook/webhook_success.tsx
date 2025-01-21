import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import useUserStore from "@/stores/user_store";
import { CheckCircle } from "lucide-react";

/**
 * Page displayed after a successful payment
 * Redirects the user to the rider dashboard
 */
const WebhookSuccess = () => {
  const navigate = useNavigate();

  const userInfo = useUserStore((state) => state.userInfo);

  const redirectToDashboard = () => {
    navigate(`/${userInfo?.account_type}/dashboard/`);
  };

  return (
    <div className="text-center px-4 my-10">
      <div className="flex justify-center mb-6">
        <CheckCircle className="h-40 text-green-500  w-40" />
      </div>
      <h2 className="text-xl md:text-2xl font-bold">Payment Sucessfull</h2>
      <p>Your payment has been received</p>
      <Button className="mt-6 px-6" onClick={redirectToDashboard}>
        Return to dashboard
      </Button>
    </div>
  );
};

export default WebhookSuccess;
