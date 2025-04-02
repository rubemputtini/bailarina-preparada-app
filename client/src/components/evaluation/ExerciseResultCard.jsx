import Badge from "./Badge";
import ReferenceBox from "./ReferenceBox";
import ExerciseMedia from "./ExerciseMedia";
import ObservationCard from "./ObservationCard";
import SideCard from "./SideCard";

const ExerciseResultCard = ({ ex }) => {
    const { exercise } = ex;

    if (!ex.unilateral) {
        const classification = ex.ref?.classification || "";
        const showReference = ex.ref && ex.ref.minValue != null;

        return (
            <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-300 text-black">
                <ExerciseMedia photoUrl={exercise.photoUrl} videoUrl={exercise.videoUrl} alt={exercise.name} />
                <h3 className="font-bold text-black text-lg mb-2 text-center">{exercise.name}</h3>
                <div className="text-center my-2">
                    <div className="text-3xl font-bold">{ex.score}</div>
                    <div className="text-sm text-gray-600">Pontuação</div>
                </div>
                {showReference && (
                    <>
                        <div className="flex justify-center">
                            <Badge classification={classification} />
                        </div>
                        <ReferenceBox minValue={ex.ref.minValue} maxValue={ex.ref.maxValue} />
                    </>
                )}
                {ex.observation && (
                    <ObservationCard observation={ex.observation} />
                )}
            </div>
        );
    }

    const left = ex.sides?.L;
    const right = ex.sides?.R;

    return (
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-300 text-black">
            <ExerciseMedia photoUrl={exercise.photoUrl} videoUrl={exercise.videoUrl} alt={exercise.name} />
            <h3 className="font-bold text-black text-lg mb-4 text-center">{exercise.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-center">
                {left && <SideCard label="Lado Esquerdo" data={left} />}
                {right && <SideCard label="Lado Direito" data={right} />}
            </div>
            {(right?.observation || left?.observation) && (
                <ObservationCard observation={`${right?.observation || ""} ${left?.observation || ""}`} />
            )}
        </div>
    );
};

export default ExerciseResultCard;