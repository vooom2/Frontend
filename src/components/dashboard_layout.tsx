/* eslint-disable @typescript-eslint/no-explicit-any */

import RiderSidebar from './rider_sidebar'
import { Outlet, useLocation } from 'react-router'
import DashboardHeader from './dashboard_header'
import { USER_ROLES } from '@/utils/constant';
import VechicleOwnerSidebar from './vehicle_owners_sidebar';
import LoadingOverlay from './loading_overlay';
import { useEffect } from 'react';
import useLoadingStateStore from '@/stores/loading_state_store';
import useUserStore from '@/stores/user_store';
import UserService from '@/api/user.services';


export default function DashboardLayout() {
    const location = useLocation();
    const { isLoading, setState } = useLoadingStateStore((state) => state);
    const updateUserInfo = useUserStore((state) => state.updateInfo);
    useEffect(() => {
        const fetchUserInfo = async () => {
            const res = await UserService.getCurrentUser() as { profile: any };
            if (res != null) {
                updateUserInfo(res.profile);
            }
            setState(false);
        };

        fetchUserInfo();
        const intervalId = setInterval(fetchUserInfo, 5000);
        return () => clearInterval(intervalId);
    }, []);
    return (
        <LoadingOverlay isLoading={isLoading}>
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
        </LoadingOverlay>
    )
}

