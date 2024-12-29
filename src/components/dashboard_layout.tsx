
import RiderSidebar from './rider_sidebar'
import { Outlet, useLocation } from 'react-router'
import DashboardHeader from './dashboard_header'
import { USER_ROLES } from '@/utils/constant';
import VechicleOwnerSidebar from './vehicle_owners_sidebar';
export default function DashboardLayout() {
    const location = useLocation();
    return (
        <div className="min-h-screen bg-[#F9F9F9] w-screen">
            <div className="flex">
                <div className="hidden md:block w-64 fixed inset-y-0">
                    {location.pathname.indexOf(`/${USER_ROLES.RIDER}`) != -1 && <RiderSidebar />}
                    {location.pathname.indexOf(`/${USER_ROLES.OWNER}`) != -1 && <VechicleOwnerSidebar />}
                </div>
                <main className="flex-1 md:pl-64 ">
                    <DashboardHeader />
                    <div className="px-2 md:p-4 space-y-4">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    )
}

