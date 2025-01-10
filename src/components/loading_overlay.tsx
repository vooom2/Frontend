import { Loader } from 'lucide-react';
import { ReactNode } from 'react';

interface LoadingOverlayProps {
    isLoading: boolean;
    children: ReactNode;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading, children }) => {
    if (!isLoading) return children;

    return (
        <div className="relative">
            {children}

            {/* Overlay */}
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="flex flex-col items-center gap-4 bg-white p-6 rounded-lg">
                    <Loader className="animate-spin text-black duration-1000" size={32} />
                </div>
            </div>
        </div>
    );
};

export default LoadingOverlay;