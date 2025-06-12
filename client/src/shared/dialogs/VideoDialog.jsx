import { useEffect } from "react";
import ReactPlayer from "react-player/youtube";
import { XMarkIcon } from "@heroicons/react/24/solid";

const VideoDialog = ({ open, onClose, videoUrl }) => {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    if (!open) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            onClick={handleOverlayClick}
            className="fixed inset-0 z-50 bg-gray-800 bg-opacity-70 flex items-center justify-center px-4 sm:px-0"
        >
            <div className="relative text-center">
                <div className="bg-white rounded-2xl shadow-2xl w-[90vw] max-w-2xl p-4 md:p-6 overflow-hidden">
                    <div className="aspect-video">
                        <ReactPlayer
                            url={videoUrl}
                            width="100%"
                            height="100%"
                            controls
                        />
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="mt-4 text-gray-500 hover:text-gray-800 transition"
                    aria-label="Fechar vídeo"
                >
                    <div className="bg-white p-2 rounded-full shadow-md inline-flex">
                        <XMarkIcon className="w-6 h-6" />
                    </div>
                </button>
            </div>
        </div>
    );
};

export default VideoDialog;
