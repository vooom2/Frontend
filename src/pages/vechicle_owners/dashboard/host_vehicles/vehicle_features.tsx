import * as React from "react"
import { Card } from "@/components/ui/card"

interface FeatureOption {
    id: string
    label: string
    options: [string, string]
    defaultValue: string
}

const features: FeatureOption[] = [
    { id: "transmission", label: "Gear transmission", options: ["Automatic", "Manual"], defaultValue: "Automatic" },
    { id: "bluetooth", label: "Bluetooth", options: ["Yes", "No"], defaultValue: "Yes" },
    { id: "android", label: "Android auto", options: ["Yes", "No"], defaultValue: "Yes" },
    { id: "camera", label: "Rear camera", options: ["Yes", "No"], defaultValue: "Yes" },
    { id: "aux", label: "Aux input", options: ["Yes", "No"], defaultValue: "No" },
    { id: "gps", label: "GPS", options: ["Yes", "No"], defaultValue: "No" },
    { id: "usbInput", label: "USB input", options: ["Yes", "No"], defaultValue: "No" },
    { id: "usbOutput", label: "USB output", options: ["Yes", "No"], defaultValue: "No" },
]

export default function VehicleFeatures() {
    const [selections, setSelections] = React.useState<Record<string, string>>(() => {
        return features.reduce((acc, feature) => ({
            ...acc,
            [feature.id]: feature.defaultValue
        }), {})
    })

    const handleSelection = (featureId: string, value: string) => {
        setSelections(prev => ({
            ...prev,
            [featureId]: value
        }))
    }

    return (
        <div className="w-full max-w-3xl mx-auto p-4">
            <div className="grid  sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {features.map((feature) => (
                    <Card key={feature.id} className="px-6 py-8 shadow-none border border-black">
                        <div className="space-y-3">
                            <div className="text-sm font-medium text-gray-700">
                                {feature.label}
                            </div>
                            <div className="flex gap-2">
                                {feature.options.map((option) => (
                                    <button
                                        key={`${feature.id}-${option}`}
                                        onClick={() => handleSelection(feature.id, option)}
                                        className={`
                      flex-1 px-2 py-2 rounded-md text-xs font-medium
                      transition-colors duration-200
                      ${selections[feature.id] === option
                                                ? 'bg-[#FF5722] text-white'
                                                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                                            }
                    `}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}

