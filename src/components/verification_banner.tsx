import { APP_NAME } from "@/utils/constant";
import { FileWarning, X } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router";
export default function VerificationBanner() {
    return (
        <div>
            <div className="relative flex flex-col p-6 bg-black text-white rounded-lg shadow-lg max-w-4xl mx-auto">
                <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                    aria-label="Close"
                >
                    <X className="h-5 w-5" />
                </button>
                <p className="text-sm text-gray-200">Hi, Lorem Ipsum</p>
                <h2 className="md:text-4xl text-2xl font-bold mt-1">
                    Finish your account setup (0/3){" "}
                    <span aria-hidden="true" className="ml-2">→</span>
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                    Complete your KYC and Identity Verification to enable you to become
                    verified on Vooom
                </p>
                <div className="mt-4 flex items-center space-x-4 bg-white py-4 px-6 rounded-xl">
                    <Step label="Personal Verification" />
                    <Separator />
                    <Step label="National Verification" />
                    <Separator />
                    <Step label="Guarantors" />
                </div>
            </div>
            <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center px-4">

                <div className="rounded-full bg-blue-100 p-4 mb-4 w-fit">
                    <FileWarning className="h-8 w-8 sm:h-12 sm:w-12 text-blue-500" />
                </div>
                <h3 className="text-lg font-medium mb-3">You have no active Bike on {APP_NAME}</h3>
                <Link to="/dashboard/setupaccount">
                    <Button className='rounded-3xl bg-black'>Complete Verification</Button>
                </Link>
            </div>
        </div>
    );
}

interface StepProps {
    label: string;
}

function Step({ label }: StepProps) {
    return (
        <div
            className="flex items-center space-x-2 text-black"
        >
            <div
                className="h-5 w-5 flex items-center justify-center rounded-full border bg-black"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>

            </div>
            <span className="text-sm">{label}</span>
        </div >
    );
}

function Separator() {
    return <div className="w-10 h-[2px] bg-black rounded" />;
}
