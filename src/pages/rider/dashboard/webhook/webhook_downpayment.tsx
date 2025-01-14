import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import image from "@/assets/images/leap.svg";
import useUserStore from "@/stores/user_store";

/**
 * Page displayed after a successful payment
 * Redirects the user to the rider dashboard
 */
const WebhookSuccess = () => {
  const navigate = useNavigate();

  const userInfo = useUserStore((state) => state.userInfo);

  const redirectToDashboard = () => {
    navigate(`/${userInfo?.account_type}/dashboard/fleet`);
  };

  return (
    <div className="text-center px-4 my-10">
      <img src={image} alt="" className="w-30 h-30 object-contain mx-auto" />
      <h2 className="text-xl md:text-2xl font-bold">
        Congratulation! You’ve been assigned a bike
      </h2>
      <p>You will have to come to the office to pick the bike</p>
      <Button className="mt-6 px-6" onClick={redirectToDashboard}>
        Contact your fleet Manager
      </Button>
    </div>
  );
};

export default WebhookSuccess;
