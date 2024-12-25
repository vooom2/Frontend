import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import DashboardLayout from "./components/dashboard_layout.tsx";
import Dashboard from "./pages/dashboard/Dashboard.tsx";
import PaymentHistory from "./pages/dashboard/payment/PaymentHistory.tsx";
import FleetManager from "./pages/dashboard/FleetManager.tsx";
import Complaints from "./pages/dashboard/Complaints.tsx";
import BikeHistory from "./pages/dashboard/BikesHistory.tsx";
import Profile from "./pages/dashboard/Profile.tsx";
import SetupAccount from "./pages/dashboard/verification/SetupAccount.tsx";
import MotorcycleRental from "./pages/dashboard/rentals/motorcycle_rental.tsx";
import MotorcycleDetails from "./pages/dashboard/rentals/motorcycle_details.tsx";
import BikeApplication from "./pages/dashboard/rentals/bike_application.tsx";
import BikeApplicationFinale from "./pages/dashboard/rentals/bike_application_finale.tsx";
import VerificationBanner from "./components/verification_banner.tsx";
import MakePayment from "./pages/dashboard/payment/MakePayment.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />} path="dashboard">
          <Route index element={<Dashboard />} />
          <Route path="unverified" element={<VerificationBanner />} />
          <Route path="rent/available" element={<MotorcycleRental />} />
          <Route path="rent/available/:id" element={<MotorcycleDetails />} />
          <Route path="rent/available/apply/:id" element={<BikeApplication />} />
          <Route path="rent/available/apply/success" element={<BikeApplicationFinale />} />

          <Route path="payments" element={<PaymentHistory />} />
          <Route path="payments/pay" element={<MakePayment />} />

          <Route path="fleet" element={<FleetManager />} />
          <Route path="complaints" element={<Complaints />} />
          <Route path="bikes" element={<BikeHistory />} />
          <Route path="profile" element={<Profile />} />
          <Route path="setupaccount" element={<SetupAccount />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
