import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import DashboardLayout from "./components/dashboard_layout.tsx";
import RiderDashboard from "./pages/riders/dashboard/RiderDashboard.tsx";
import PaymentHistory from "./pages/riders/dashboard/payment/PaymentHistory.tsx";
import FleetManager from "./pages/riders/dashboard/FleetManager.tsx";
import BikeHistory from "./pages/riders/dashboard/BikesHistory.tsx";
import Profile from "./pages/riders/dashboard/RiderProfileSettings.tsx";
import SetupAccount from "./pages/riders/dashboard/rider_verification/setup_account.tsx";
import MotorcycleRental from "./pages/riders/dashboard/rentals/MotorcycleRental.tsx";
import MotorcycleRentalDetails from "./pages/riders/dashboard/rentals/MotorcycleRentalDetails.tsx";
import BikeApplication from "./pages/riders/dashboard/rentals/BikeApplication.tsx";
import BikeApplicationFinale from "./pages/riders/dashboard/rentals/bike_application_finale.tsx";
import RiderVerificationBanner from "./components/rider_verification_banner.tsx";
import MakePayment from "./pages/riders/dashboard/payment/MakePayment.tsx";
import RiderComplaints from "./pages/riders/dashboard/complaints/RiderComplaints.tsx";
import ComplaintForm from "./pages/riders/dashboard/complaints/complaint_form.tsx";
import Signup from "./pages/auth/signup.tsx";
import Login from "./pages/auth/login.tsx";
import { USER_ROLES } from "./utils/constant.tsx";
import OwnerVerificationBanner from "./components/owners_verification_banner.tsx";
import OwnerSetupAccount from "./pages/vechicle_owners/dashboard/owners_verification/owner_setup_account.tsx";
import OwnerAccountVerified from "./pages/vechicle_owners/dashboard/owners_verification/owner_account_verified.tsx";
import OwnerDashboard from "./pages/vechicle_owners/dashboard/owner_dashboard.tsx";
import VehicleRegistration from "./pages/vechicle_owners/dashboard/host_vehicles/vehicle_registration.tsx";
import ListedBikes from "./pages/vechicle_owners/dashboard/listed_bikes/ListedBikes.tsx";
import OwnerBikeDetails from "./pages/vechicle_owners/dashboard/listed_bikes/OwnerBikeDetails.tsx";
import Inspection from "./pages/vechicle_owners/dashboard/inspection/inspection.tsx";
import InspectionBikeDetails from "./pages/vechicle_owners/dashboard/inspection/inspection_bike_details.tsx";
import OwnerReport from "./pages/vechicle_owners/dashboard/report/owner_report.tsx";
import OwnerWallet from "./pages/vechicle_owners/dashboard/wallet/owner_wallet.tsx";
import OwnerWithdrawalForm from "./pages/vechicle_owners/dashboard/wallet/owner_withdrawal.tsx";
import OwnerProfileSettings from "./pages/vechicle_owners/dashboard/profile/owner_profile_settings.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Signup />} path="auth/signup" />
        <Route element={<Login />} path="auth/login" />
        <Route element={<Login />} path="/" />
        {/* Vechicle owners */}
        <Route element={<DashboardLayout />} path={`${USER_ROLES.OWNER}/dashboard`}>
          <Route index element={<OwnerDashboard />} />
          <Route path="unverified" element={<OwnerVerificationBanner />} />

          <Route path="setupaccount" element={<OwnerSetupAccount />} />

          <Route path="setupaccount/done" element={<OwnerAccountVerified />} />

          <Route path="host" element={<VehicleRegistration />} />

          <Route path="wallet" element={<OwnerWallet />} />
          <Route path="wallet/withdraw" element={<OwnerWithdrawalForm />} />

          <Route path="inspection" element={<Inspection />} />
          <Route path="inspection/:id" element={<InspectionBikeDetails />} />

          <Route path="report" element={<OwnerReport />} />

          <Route path="bikes" element={<ListedBikes />} />
          <Route path="bikes/:id" element={<OwnerBikeDetails />} />

          <Route path="profile" element={<OwnerProfileSettings />} />
        </Route>

        {/* Riders */}
        <Route element={<DashboardLayout />} path={`${USER_ROLES.RIDER}/dashboard`}>
          <Route index element={<RiderDashboard />} />
          <Route path="unverified" element={<RiderVerificationBanner />} />
          <Route path="rent/available" element={<MotorcycleRental />} />
          <Route path="rent/available/:id" element={<MotorcycleRentalDetails />} />
          <Route path="rent/available/:id/apply" element={<BikeApplication />} />
          <Route path="rent/available/:id/apply/success" element={<BikeApplicationFinale />} />
          <Route path="payments" element={<PaymentHistory />} />
          <Route path="payments/pay" element={<MakePayment />} />

          <Route path="fleet" element={<FleetManager />} />

          <Route path="complaints" element={<RiderComplaints />} />
          <Route path="complaints/create" element={<ComplaintForm />} />

          <Route path="bikes" element={<BikeHistory />} />
          <Route path="profile" element={<Profile />} />
          <Route path="setupaccount" element={<SetupAccount />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
