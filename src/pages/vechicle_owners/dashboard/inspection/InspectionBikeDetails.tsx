import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const thumbnails = [
    "https://images.unsplash.com/photo-1603039997315-6dcb72ec1204",
    "https://images.unsplash.com/photo-1603039997315-6dcb72ec1204",
    "https://images.unsplash.com/photo-1603039997315-6dcb72ec1204",
];

const inspectionData = [
    {
        date: "Mar 2024 - Week 1",
        plug: true,
        oilReplacement: true,
        airConditioner: false,
        loremIpsum1: true,
        loremIpsum2: false,
        loremIpsum3: true,
    },
    {
        date: "Mar 2024 - Week 3",
        plug: false,
        oilReplacement: true,
        airConditioner: true,
        loremIpsum1: true,
        loremIpsum2: false,
        loremIpsum3: true,
    },
    {
        date: "Apr 2024 - Week 1",
        plug: true,
        oilReplacement: true,
        airConditioner: true,
        loremIpsum1: false,
        loremIpsum2: false,
        loremIpsum3: false,
    },
];

export default function InspectionBikeDetails() {
    return (
        <div className="container max-w-6xl  mx-auto p-4 space-y-8">
            <div className="grid md:grid-cols-3 gap-8 w-full">
                {/* Image Gallery */}
                <div className="space-y-4 col-span-2 md:col-span-1">
                    <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg">
                        <img
                            src="https://images.unsplash.com/photo-1603039997315-6dcb72ec1204"
                            alt="Motorcycle main view"
                            className="object-cover"
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-2 justify-center">
                        {thumbnails.map((src, i) => (
                            <div key={i} className="relative aspect-square overflow-hidden rounded-lg w-full">
                                <img
                                    src={src}
                                    alt={`Motorcycle view ${i + 2}`}
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Details */}
                <div className="space-y-6 col-span-2">
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h1 className="text-2xl font-bold mb-2">AB - 2345890</h1>
                                <p className="text-muted-foreground">Qlink 2024</p>
                            </div>
                            <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mb-4">Health status</h2>
                        <div className="grid gap-4">
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                                    Body and exteriors
                                </h3>
                                <p className="font-medium">No damage</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                                    Engine
                                </h3>
                                <p className="font-medium">Optimal performance</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Inspection Table */}
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <h2 className="text-lg font-semibold">Inspection</h2>
                    <Badge variant="outline">Every 2 weeks</Badge>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    <Card className="lg:col-span-4">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Inspection Date</TableHead>
                                    <TableHead>Plug</TableHead>
                                    <TableHead>Oil Replacement</TableHead>
                                    <TableHead>Air Conditioner</TableHead>
                                    <TableHead>Lorem Ipsum</TableHead>
                                    <TableHead>Lorem Ipsum</TableHead>
                                    <TableHead>Lorem Ipsum</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {inspectionData.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{row.date}</TableCell>
                                        <TableCell>
                                            <span
                                                className={cn(
                                                    "px-2 py-1 rounded text-sm font-medium",
                                                    row.plug
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                )}
                                            >
                                                {row.plug ? "Yes" : "No"}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span
                                                className={cn(
                                                    "px-2 py-1 rounded text-sm font-medium",
                                                    row.oilReplacement
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                )}
                                            >
                                                {row.oilReplacement ? "Yes" : "No"}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span
                                                className={cn(
                                                    "px-2 py-1 rounded text-sm font-medium",
                                                    row.airConditioner
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                )}
                                            >
                                                {row.airConditioner ? "Yes" : "No"}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span
                                                className={cn(
                                                    "px-2 py-1 rounded text-sm font-medium",
                                                    row.loremIpsum1
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                )}
                                            >
                                                {row.loremIpsum1 ? "Yes" : "No"}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span
                                                className={cn(
                                                    "px-2 py-1 rounded text-sm font-medium",
                                                    row.loremIpsum2
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                )}
                                            >
                                                {row.loremIpsum2 ? "Yes" : "No"}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span
                                                className={cn(
                                                    "px-2 py-1 rounded text-sm font-medium",
                                                    row.loremIpsum3
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                )}
                                            >
                                                {row.loremIpsum3 ? "Yes" : "No"}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </div>
            </div>
        </div>
    );
}
