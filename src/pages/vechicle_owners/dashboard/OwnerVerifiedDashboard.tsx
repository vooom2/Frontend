import { DashboardStatusIndicatorCard } from "@/components/home_status_indicator";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/utils/constant";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { RiBikeLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import OwnerServices from "@/api/owner.services";

interface Vehicle {
  regNumber: string;
  healthStatus: "Active" | "Inactive";
  weeklyRemittance: string;
  amount: string;
  rider: string;
}

interface Notification {
  id: string;
  type: "repair" | "remittance" | "drop";
  message: string;
  time: string;
}

interface DashboardStats {
  ok: string;
  stats: {
    totalWithdrawn?: number;
    weeklyAmount: {
      totalAmount: string;
    };
    activeBikes?: number;
    inactiveBikes?: number;
  };
}

const vehicles: Vehicle[] = [];
const notifications: Notification[] = [];

const OwnerVerifiedDashboard = () => {
  const [dashboardStats, setDashboardStats] = useState<
    DashboardStats["stats"] | null
  >({
    totalWithdrawn: 0,
    weeklyAmount: {
      totalAmount: "",
    },
    activeBikes: 0,
    inactiveBikes: 0,
  });

  useEffect(() => {
    async function fetchDashboardStats() {
      // Renamed the function
      try {
        const res = await OwnerServices.getDashboardStats();
        const response = res as DashboardStats;
        console.log("API Response:", response);

        if (response.ok) {
          setDashboardStats(response.stats); // Removed optional chaining since we check response.ok
        }
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    }

    fetchDashboardStats();
  }, []);

  return (
    <>
      <div className="container mx-auto p-2 lg:p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <DashboardStatusIndicatorCard
            label="Total Withdrawn"
            icon="clock"
            value={dashboardStats?.totalWithdrawn}
          />
          <DashboardStatusIndicatorCard
            label="Amount this week"
            icon="clock"
            value={dashboardStats?.weeklyAmount?.totalAmount}
          />
          <DashboardStatusIndicatorCard
            label="Active bikes"
            icon="clock"
            value={dashboardStats?.activeBikes}
          />
          <DashboardStatusIndicatorCard
            label="Inactive bikes"
            icon="bike"
            value={dashboardStats?.inactiveBikes}
          />
        </div>
        <div className="grid lg:grid-cols-[1fr,400px] gap-6">
          {/* Vehicle Status Table */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Status of Vehicles</h2>
            <Card className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-4 rounded-md overflow-clip">
                <Table>
                  <TableHeader className="bg-black">
                    <TableRow>
                      <TableHead className="text-white">Vehicle Reg</TableHead>
                      <TableHead className="text-white">
                        Health Status
                      </TableHead>
                      <TableHead className="text-white">Weekly Rem</TableHead>
                      <TableHead className="text-white">Amount</TableHead>
                      <TableHead className="text-white">Rider</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vehicles.map((vehicle, index) => (
                      <TableRow
                        key={index}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <TableCell className="font-medium">
                          {vehicle.regNumber}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={vehicle.healthStatus} />
                        </TableCell>
                        <TableCell>{vehicle.weeklyRemittance}</TableCell>
                        <TableCell>{vehicle.amount}</TableCell>
                        <TableCell>{vehicle.rider}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </div>

          {/* Notifications Panel */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Notifications</h2>
              <button className="text-orange-500 text-sm hover:underline">
                View All
              </button>
            </div>
            <Card className="p-4">
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex gap-3">
                    <NotificationIcon type={notification.type} />
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">
                        {notification.message}
                      </p>
                      <span className="text-xs text-gray-400">
                        {notification.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-6 sm:py-8 text-center">
          <div className="rounded-full bg-blue-50 md:p-6 p-4 mb-8 w-fit">
            <RiBikeLine className="md:h-[4rem] md:w-[4rem] h-16 w-16 text-blue-300" />
          </div>
          <h3 className="text-base  font-medium mb-3">
            You have no vehicle listed on {APP_NAME}
          </h3>
          <Link to="host">
            <Button className="rounded-3xl bg-black px-8 py-2 text-sm sm:text-base">
              Host your vehicle
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

function StatusBadge({ status }: { status: Vehicle["healthStatus"] }) {
  return (
    <Badge
      className={`${
        status === "Active"
          ? "bg-green-500 hover:bg-green-500"
          : "bg-red-500 hover:bg-red-500"
      } text-white`}
    >
      {status}
    </Badge>
  );
}

function NotificationIcon({ type }: { type: Notification["type"] }) {
  const bgColor = type === "remittance" ? "bg-green-500" : "bg-orange-500";
  return (
    <div
      className={`${bgColor} text-white w-8 h-8 rounded-full flex items-center justify-center`}
    >
      N
    </div>
  );
}

export default OwnerVerifiedDashboard;
