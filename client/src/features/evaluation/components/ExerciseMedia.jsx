import { useState } from "react";
import { YouTube } from "@mui/icons-material";
import VideoDialog from "shared/dialogs/VideoDialog";

const ExerciseMedia = ({ photoUrl, videoUrl, alt }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
            <img
                src={photoUrl}
                alt={alt}
                className="w-full h-full object-cover"
            />
            {videoUrl && (
                <>
                    <button
                        onClick={() => setOpen(true)}
                        className="absolute top-2 right-2 p-1 hover:scale-105 transition"
                    >
                        <YouTube className="text-red-700" />
                    </button>
                    <VideoDialog
                        open={open}
                        onClose={() => setOpen(false)}
                        videoUrl={videoUrl}
                    />
                </>
            )}
        </div>
    );
};

export default ExerciseMedia;
