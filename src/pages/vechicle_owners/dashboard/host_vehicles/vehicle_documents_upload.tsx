import { Upload } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

interface UploadSectionProps {
    title: string
    onUpload: (file: File) => void
}

function UploadSection({ title, onUpload }: UploadSectionProps) {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            onUpload(file)
        }
    }

    return (
        <Card className="bg-gray-100">
            <CardContent className="p-4">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-red-900 rounded-lg flex items-center justify-center">
                        <Upload className="w-6 h-6 text-white" />
                    </div>
                    <Label
                        htmlFor={`upload-${title}`}
                        className="cursor-pointer w-full"
                    >
                        <div className="bg-white rounded px-4 py-2 text-center hover:bg-gray-50 transition-colors">
                            Upload PDF
                        </div>
                        <input
                            type="file"
                            id={`upload-${title}`}
                            accept=".pdf"
                            onChange={handleFileChange}
                            className="sr-only"
                        />
                    </Label>
                    <span className="text-sm text-gray-600">{title}</span>
                </div>
            </CardContent>
        </Card>
    )
}

export default function VehicleDocumentsUpload() {
    const handleUpload = (file: File) => {
        console.log('Uploading file:', file.name)
    }

    const documents = [
        { title: 'V/O registration' },
        { title: 'Amsc registration' },
        { title: 'Board registration' },
        { title: 'Insurance' },
        { title: 'Bike Receipt' },
    ]

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            {/* Document upload grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                {documents.slice(0, 4).map((doc) => (
                    <UploadSection
                        key={doc.title}
                        title={doc.title}
                        onUpload={handleUpload}
                    />
                ))}
            </div>

            {/* Centered bottom upload section */}
            <div className="flex justify-center">
                <div className="w-full sm:w-[calc(50%-0.5rem)]">
                    <UploadSection
                        title={documents[4].title}
                        onUpload={handleUpload}
                    />
                </div>
            </div>
        </div>
    )
}

