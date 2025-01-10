import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
function VehicleDetailsForm() {
    return (
        <form className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="space-y-2">
                <label className="text-sm text-gray-500">Location</label>
                <Select defaultValue="abuja">
                    <SelectTrigger className="bg-gray-50">
                        <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="abuja">Abuja</SelectItem>
                        <SelectItem value="lagos">Lagos</SelectItem>
                        <SelectItem value="kano">Kano</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <label className="text-sm text-gray-500">Area Council</label>
                <Select defaultValue="council">
                    <SelectTrigger className="bg-gray-50">
                        <SelectValue placeholder="Select area council" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="council">Area Council</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <label className="text-sm text-gray-500">Type</label>
                <Select defaultValue="delivery">
                    <SelectTrigger className="bg-gray-50">
                        <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="delivery">Delivery</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <label className="text-sm text-gray-500">Bike Model</label>
                <Select defaultValue="qlink">
                    <SelectTrigger className="bg-gray-50">
                        <SelectValue placeholder="Select bike model" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="qlink">Qlink</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <label className="text-sm text-gray-500">Reg Number</label>
                <Input placeholder="123 4567 890"></Input>
            </div>

            <div className="space-y-2">
                <label className="text-sm text-gray-500">Status of bike</label>
                <Select defaultValue="new">
                    <SelectTrigger className="bg-gray-50">
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="new">Brand new</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <label className="text-sm text-gray-500">Distance</label>
                <Select defaultValue="700">
                    <SelectTrigger className="bg-gray-50">
                        <SelectValue placeholder="Select distance" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="700">700km</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <label className="text-sm text-gray-500">Colour</label>
                <Select defaultValue="black">
                    <SelectTrigger className="bg-gray-50">
                        <SelectValue placeholder="Select colour" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="black">Black</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <label className="text-sm text-gray-500">Any fault</label>
                <Select defaultValue="no">
                    <SelectTrigger className="bg-gray-50">
                        <SelectValue placeholder="Select fault status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="no">No</SelectItem>
                        <SelectItem value="yes">Yes</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <label className="text-sm text-gray-500">Duration</label>
                <Select defaultValue="2">
                    <SelectTrigger className="bg-gray-50">
                        <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="2">2 years</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </form>
    )
}

export default VehicleDetailsForm