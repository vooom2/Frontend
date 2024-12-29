import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import DashboardLayout from "./components/dashboard_layout.tsx";
import Dashboard from "./pages/riders/dashboard/dashboard.tsx";
import PaymentHistory from "./pages/riders/dashboard/payment/PaymentHistory.tsx";
import FleetManager from "./pages/riders/dashboard/fleet_manager.tsx";
import BikeHistory from "./pages/riders/dashboard/bikes_history.tsx";
import Profile from "./pages/riders/dashboard/profile.tsx";
import SetupAccount from "./pages/riders/dashboard/rider_verification/setup_account.tsx";
import MotorcycleRental from "./pages/riders/dashboard/rentals/motorcycle_rental.tsx";
import MotorcycleRentalDetails from "./pages/riders/dashboard/rentals/motorcycle_rental_details.tsx";
import BikeApplication from "./pages/riders/dashboard/rentals/bike_application.tsx";
import BikeApplicationFinale from "./pages/riders/dashboard/rentals/bike_application_finale.tsx";
import RiderVerificationBanner from "./components/rider_verification_banner.tsx";
import MakePayment from "./pages/riders/dashboard/payment/MakePayment.tsx";
import Complaints from "./pages/riders/dashboard/complaints/complaints.tsx";
import ComplaintForm from "./pages/riders/dashboard/complaints/complaint_form.tsx";
import Signup from "./pages/auth/signup.tsx";
import Login from "./pages/auth/login.tsx";
import { USER_ROLES } from "./utils/constant.tsx";
import OwnerVerificationBanner from "./components/owners_verification_banner.tsx";
import OwnerSetupAccount from "./pages/vechicle_owners/dashboard/owners_verification/owner_setup_account.tsx";
import OwnerAccountVerified from "./pages/vechicle_owners/dashboard/owners_verification/owner_account_verified.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Signup />} path="auth/signup" />
        <Route element={<Login />} path="auth/login" />
        <Route element={<Login />} path="/" />
        {/* Vechicle owners */}
        <Route element={<DashboardLayout />} path={`${USER_ROLES.OWNER}/dashboard`}>
          <Route index element={<Dashboard />} />
          <Route path="unverified" element={<OwnerVerificationBanner />} />
          <Route path="setupaccount" element={<OwnerSetupAccount />} />
          <Route path="setupaccount/done" element={<OwnerAccountVerified />} />
          <Route path="rent/available" element={<MotorcycleRental />} />
          <Route path="rent/available/:id" element={<MotorcycleRentalDetails />} />
          <Route path="rent/available/:id/apply" element={<BikeApplication />} />
          <Route path="rent/available/:id/apply/success" element={<BikeApplicationFinale />} />
          <Route path="payments" element={<PaymentHistory />} />
          <Route path="payments/pay" element={<MakePayment />} />

          <Route path="fleet" element={<FleetManager />} />

          <Route path="complaints" element={<Complaints />} />
          <Route path="complaints/create" element={<ComplaintForm />} />

          <Route path="bikes" element={<BikeHistory />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Riders */}
        <Route element={<DashboardLayout />} path={`${USER_ROLES.RIDER}/dashboard`}>
          <Route index element={<Dashboard />} />
          <Route path="unverified" element={<RiderVerificationBanner />} />
          <Route path="rent/available" element={<MotorcycleRental />} />
          <Route path="rent/available/:id" element={<MotorcycleRentalDetails />} />
          <Route path="rent/available/:id/apply" element={<BikeApplication />} />
          <Route path="rent/available/:id/apply/success" element={<BikeApplicationFinale />} />
          <Route path="payments" element={<PaymentHistory />} />
          <Route path="payments/pay" element={<MakePayment />} />

          <Route path="fleet" element={<FleetManager />} />

          <Route path="complaints" element={<Complaints />} />
          <Route path="complaints/create" element={<ComplaintForm />} />

          <Route path="bikes" element={<BikeHistory />} />
          <Route path="profile" element={<Profile />} />
          <Route path="setupaccount" element={<SetupAccount />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
