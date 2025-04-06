import PhotosCard from "./PhotosCard";

const PhotosTab = ({ evaluationId, photosUrl }) => {
    return (
        <div className="flex flex-col items-center justify-center gap-6">
            <PhotosCard evaluationId={evaluationId} photosUrl={photosUrl} />
        </div>
    );
};

export default PhotosTab;