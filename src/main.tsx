import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import DashboardLayout from "./components/dashboard_layout.tsx";
import Signup from "./pages/auth/signup.tsx";
import Login from "./pages/auth/login.tsx";
import { USER_ROLES } from "./utils/constant.tsx";
import { BikeApplication, BikeApplicationFinale, BikeHistory, ComplaintForm, FleetManager, Inspection, InspectionBikeDetails, ListedBikes, MakePayment, MotorcycleRental, MotorcycleRentalDetails, OwnerAccountVerified, OwnerBikeDetails, OwnerDashboard, OwnerProfileSettings, OwnerReport, OwnerSetupAccount, OwnerVerificationBanner, OwnerWallet, OwnerWithdrawalForm, PaymentHistory, RiderComplaints, RiderDashboard, RiderProfileSettings, RiderSetupAccount, RiderVerificationBanner, VehicleRegistration } from "./utils/pages_exports.tsx";

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
          <Route path="payments/pay/:id" element={<MakePayment />} />

          <Route path="fleet" element={<FleetManager />} />

          <Route path="complaints" element={<RiderComplaints />} />
          <Route path="complaints/create" element={<ComplaintForm />} />

          <Route path="bikes" element={<BikeHistory />} />
          <Route path="profile" element={<RiderProfileSettings />} />
          <Route path="setupaccount" element={<RiderSetupAccount />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
