import useUserStore from "@/stores/user_store";
import OwnerVerificationBanner from "@/components/owners_verification_banner";
import DashboardSkeleton from "@/components/dashboard_skeleton";
import Verifying from "./owners_verification/verifying_account";
import OwnerVerifiedDashboard from "./OwnerVerifiedDashboard";

export default function OwnerDashboard() {
  const userInfo = useUserStore((state) => state.userInfo);

  return (
    <>
      {userInfo &&
        !userInfo?.account_verified &&
        !userInfo?.verification_started && (
          <OwnerVerificationBanner name={userInfo?.full_name} />
        )}
      {!userInfo && <DashboardSkeleton />}
      {userInfo &&
        !userInfo?.account_verified &&
        userInfo?.verification_started && (
          <>
            <Verifying />
          </>
        )}

      {userInfo && userInfo?.account_verified && (
        <>
          <OwnerVerifiedDashboard />
        </>
      )}
    </>
  );
}
