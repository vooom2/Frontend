"use client";
import { APP_NAME, USER_ROLES } from "@/utils/constant";
import {
    LayoutDashboard,
    CreditCard,
    Users,
    FileText,
    Bike,
    User,
    LogOut,
} from "lucide-react";
import { Link, useLocation } from "react-router";
import Logo from "../assets/images/logo.png";
import { Button } from "./ui/button";

interface SidebarProps {
    onNavigate?: () => void;
}

const navigation = [
    { name: "Dashboard", href: `/${USER_ROLES.RIDER}/dashboard`, icon: LayoutDashboard },
    { name: "Rent Bike", href: `/${USER_ROLES.RIDER}/dashboard/rent/available`, icon: Bike },
    { name: "Payment History", href: `/${USER_ROLES.RIDER}/dashboard/payments`, icon: CreditCard },
    { name: "Fleet Manager", href: `/${USER_ROLES.RIDER}/dashboard/fleet`, icon: Users },
    { name: "Complaint", href: `/${USER_ROLES.RIDER}/dashboard/complaints`, icon: FileText },
    { name: "Bike History", href: `/${USER_ROLES.RIDER}/dashboard/bikes`, icon: Bike },
    { name: "Profile", href: `/${USER_ROLES.RIDER}/dashboard/profile`, icon: User },
];

export default function RiderSidebar({ onNavigate }: SidebarProps) {
    const location = useLocation();

    return (
        <div className="flex flex-col h-full p-4 bg-white">
            <div className="mb-8 mt-4">
                <h1 className="text-2xl font-bold uppercase">
                    <img src={Logo} alt={APP_NAME} className="h-8" />
                </h1>
            </div>
            <nav className="space-y-1 flex-1">
                {navigation.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            to={item.href}
                            onClick={onNavigate}
                            className={`flex items-center gap-3 px-3 py-5 rounded-2xl text-sm ${isActive ? "bg-primary text-white" : "hover:bg-muted"
                                }`}
                        >
                            <Icon className="h-5 w-5" />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>
            <Link to="/auth/login" className="w-full">
                <Button
                    variant="outline"
                    className=" flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:bg-muted rounded-lg"
                >
                    <LogOut className="h-5 w-5" />
                    Sign out
                </Button>
            </Link>
        </div>
    );
}
