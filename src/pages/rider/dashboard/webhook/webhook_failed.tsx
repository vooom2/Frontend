import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import useUserStore from "@/stores/user_store";
import { CreditCardIcon, X } from "lucide-react";

/**
 * Page displayed after a successful payment
 * Redirects the user to the rider dashboard
 */
const WebhookFailed = () => {
  const navigate = useNavigate();

  const userInfo = useUserStore((state) => state.userInfo);

  const redirectToDashboard = () => {
    navigate(`/${userInfo?.account_type}/dashboard/`);
  };

  return (
    <div className="text-center px-4 my-10">
      <div className="flex justify-center">
        <CreditCardIcon className="h-40 ml-10 w-40" />
        <X className="text-red-600 h-10 block  w-10 mr-[20px] opacity-55" />
      </div>
      <h2 className="text-xl md:text-2xl mt-6 font-bold">Payment Failed</h2>
      <p>
        Something Went wrong while processing your payment. Please try again
      </p>
      <Button className="mt-6 px-6" onClick={redirectToDashboard}>
        Return to dashboard
      </Button>
    </div>
  );
};

export default WebhookFailed;
