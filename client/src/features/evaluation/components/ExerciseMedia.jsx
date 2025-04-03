import { YouTube } from "@mui/icons-material";

const ExerciseMedia = ({ photoUrl, videoUrl, alt }) => (
    <div className="relative">
        <img
            src={photoUrl}
            alt={alt}
            className="w-full h-44 object-cover rounded-xl mb-4"
        />
        {videoUrl && (
            <button
                onClick={() => window.open(videoUrl, "_blank")}
                className="absolute top-2 right-2 p-1 hover:scale-105 transition"
            >
                <YouTube className="text-red-700" />
            </button>
        )}
    </div>
);

export default ExerciseMedia;