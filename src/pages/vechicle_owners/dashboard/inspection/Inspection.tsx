import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router"

interface Inspection {
    id: string
    date: string
    inspectionCount: number
    status: string
    inspector: {
        name: string
        avatar: string
    }
}

const inspections: Inspection[] = [
    ...Array(5).fill({
        id: "AB - 2345890",
        date: "Qlink 2024",
        inspectionCount: 34,
        status: "Good Shape",
        inspector: {
            name: "Paschal",
            avatar: "https://randomuser.me/api/portraits/men/1.jpg"
        }
    })
]

export default function Inspection() {
    return (
        <div className="w-full container mx-auto p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <h2 className="text-xl font-semibold">Inspection</h2>
                <span className="text-sm text-onprimary">Total 6 Bikes</span>
            </div>
            <div className="space-y-4">
                {inspections.map((inspection, index) => (
                    <div
                        key={index}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-lg border gap-4 h-fit"
                    >
                        <div className="flex items-center gap-4">
                            <div className=" w-44 h-40  relative">
                                <img
                                    src="https://images.unsplash.com/photo-1603039997315-6dcb72ec1204"
                                    alt="Motorcycle"
                                    className="object-cover rounded-md relative w-full h-full"
                                />
                            </div>
                            <div className="space-y-1 min-w-0">
                                <div className="font-medium truncate">{inspection.id}</div>
                                <div className="text-sm text-muted-foreground">
                                    {inspection.date}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                            <span className="text-sm text-muted-foreground whitespace-nowrap">
                                {inspection.inspectionCount} Inspection
                            </span>
                            <Badge variant="secondary" className="bg-orange-100 text-orange-600 hover:bg-orange-100">
                                {inspection.status}
                            </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                            <Avatar className="w-12 h-12 rounded-full">
                                <AvatarImage src={inspection.inspector.avatar} className="rounded-full" />
                                <AvatarFallback>
                                    {inspection.inspector.name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col gap-1">
                                <span className="text-sm font-medium">
                                    {inspection.inspector.name}
                                </span>
                                <span className="text-sm font-medium text-muted-foreground">
                                    Rider
                                </span>
                            </div>
                        </div>
                        <Link to={`${index}`}>
                            <Button variant="secondary" size="sm" className="w-full sm:w-auto">
                                View Details
                            </Button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

