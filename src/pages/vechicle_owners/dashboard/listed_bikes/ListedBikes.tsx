/* eslint-disable @typescript-eslint/no-explicit-any */
import { DashboardInfoCard } from '@/components/dashboard_info_card'
import BikesRecordTable from './bikes_record_table'
import { useOwnerVehicleStatsStore } from '@/stores/owner_store/owner_vehicle_stat_store'
import OwnerServices from '@/api/owner.services';
import { useEffect } from 'react';
import { useOwnerVehiclesStore } from '@/stores/owner_store/owner_vehicles_store';

function ListedBikes() {
    const vehiclesStatStore = useOwnerVehicleStatsStore((state) => state);
    const vehicleStore = useOwnerVehiclesStore((state) => state);

    useEffect(() => {
        const fetchVehicles = async () => {
            const res = await OwnerServices.getOwnerVehicles() as { vehicles: any }

            if (res != null) {
                vehicleStore.addVehicle(res.vehicles);
            }
        };
        const fetchStats = async () => {
            const res = await OwnerServices.getOwnerVehicleStats() as { stats: any }
            if (res != null) {
                vehiclesStatStore.setStats(res.stats);
            }
        };
        fetchVehicles();
        fetchStats();
    }, []);
    return (
      <div className="container mx-auto p-2 lg:p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <DashboardInfoCard
            label="Listed Bikes"
            icon="bike"
            value={vehiclesStatStore?.totalVehicles.toString()}
          />
          <DashboardInfoCard
            label="Active bikes"
            icon="bike"
            value={vehiclesStatStore?.totalActiveVehicles.toString()}
          />
          <DashboardInfoCard
            label="InActive bikes"
            icon="bike"
            value={vehiclesStatStore?.totalInactiveVehicles.toString()}
          />
        </div>
        <BikesRecordTable />
      </div>
    );
}

export default ListedBikes