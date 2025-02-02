import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import DashboardLayout from "./components/dashboard_layout.tsx";
import Signup from "./pages/auth/signup.tsx";
import Login from "./pages/auth/login.tsx";
import { USER_ROLES } from "./utils/constant.tsx";
import { BikeHistory, ComplaintForm, FleetManager, Inspection, InspectionBikeDetails, ListedBikes, MakePayment, MotorcycleDetails, OwnerAccountVerified, OwnerBikeDetails, OwnerDashboard, OwnerProfileSettings, OwnerReport, OwnerSetupAccount, OwnerWallet, OwnerWithdrawalForm, PaymentHistory, RiderComplaints, RiderDashboard, RiderProfileSettings, RiderSetupAccount, VehicleRegistration } from "./utils/pages_exports.tsx";
import { Toaster } from "react-hot-toast";
import WebhookSuccess from "./pages/rider/dashboard/webhook/webhook_success.tsx";
import WebhookFailed from "./pages/rider/dashboard/webhook/webhook_failed.tsx";
import WebhookDownpay from "./pages/rider/dashboard/webhook/webhook_downpayment.tsx";
import Policy from "./pages/landing_page/policy.tsx";
import ForgotPassword from "./pages/auth/forgot_password.tsx";
import ResetPassword from "./pages/auth/reset_password.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster />
    <BrowserRouter>
      <Routes>
        <Route element={<Signup />} path="auth/signup" />
        <Route element={<Login />} path="/" />
        <Route element={<Login />} path="auth/login" />
        <Route element={<ForgotPassword />} path="auth/forgotpassword" />
        <Route element={<Policy />} path="/policy" />
        <Route element={<ResetPassword />} path="/verify" />
        {/* Vechicle owners */}
        <Route
          element={<DashboardLayout />}
          path={`${USER_ROLES.OWNER}/dashboard`}
        >
          <Route index element={<OwnerDashboard />} />


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
        <Route
          element={<DashboardLayout />}
          path={`${USER_ROLES.RIDER}/dashboard`}
        >
          <Route index element={<RiderDashboard />} />

          <Route path="paysuccess" element={<WebhookSuccess />} />
          <Route path="payfailed" element={<WebhookFailed />} />
          <Route path="downpaysuccess" element={<WebhookDownpay />} />

          <Route path="vehicle/:id" element={<MotorcycleDetails />} />
          <Route path="vehicle/pending/:id" element={<MotorcycleDetails />} />

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
