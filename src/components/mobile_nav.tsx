import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from 'lucide-react'
import { useState } from "react"
import RiderSidebar from "./rider_sidebar"
import VechicleOwnerSidebar from "./vehicle_owners_sidebar"
import { USER_ROLES } from "@/utils/constant"

export default function MobileNav() {
    const [open, setOpen] = useState(false)

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu size={20} />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72">
                {location.pathname.indexOf(`/${USER_ROLES.RIDER}`) != -1 && <RiderSidebar onNavigate={() => setOpen(false)} />}
                {location.pathname.indexOf(`/${USER_ROLES.OWNER}`) != -1 && <VechicleOwnerSidebar onNavigate={() => setOpen(false)} />}
            </SheetContent>
        </Sheet>
    )
}

