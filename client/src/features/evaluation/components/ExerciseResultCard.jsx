import { useState } from "react";
import Badge from "./Badge";
import ReferenceBox from "./ReferenceBox";
import ExerciseMedia from "./ExerciseMedia";
import ObservationCard from "./ObservationCard";
import SideCard from "./SideCard";
import ReferenceDetailDialog from "./ReferenceDetailDialog";
import { getLevelsForUser } from "../services/exerciseReferenceService";

const ExerciseResultCard = ({ ex, userAge, userGender }) => {
    const { exercise } = ex;
    const [openReferenceDialog, setOpenReferenceDialog] = useState(false);
    const [levels, setLevels] = useState([]);
    const [activeSide, setActiveSide] = useState(null); // L, R ou null

    const handleOpenReferenceDialog = async () => {
        const data = await getLevelsForUser(exercise.exerciseId, userAge, userGender);
        setLevels(data);
        setOpenReferenceDialog(true);
    };

    // Exercício bilateral
    if (!ex.unilateral) {
        const classification = ex.ref?.classification || "";
        const showReference = ex.ref && ex.ref.minValue != null;

        return (
            <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-300 text-black">
                <ExerciseMedia
                    photoUrl={exercise.photoUrl}
                    videoUrl={exercise.videoUrl}
                    alt={exercise.name}
                />

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
                        <ReferenceBox
                            minValue={ex.ref.minValue}
                            maxValue={ex.ref.maxValue}
                            onClick={handleOpenReferenceDialog}
                        />
                        <ReferenceDetailDialog
                            open={openReferenceDialog}
                            onClose={() => setOpenReferenceDialog(false)}
                            references={levels}
                            exerciseName={exercise.name}
                        />
                    </>
                )}

                {ex.observation && <ObservationCard observation={ex.observation} />}
            </div>
        );
    }

    // Exercício unilateral
    const left = ex.sides?.L;
    const right = ex.sides?.R;
    const hasRef = (side) => side?.ref && side.ref.minValue != null;

    return (
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-300 text-black">
            <ExerciseMedia
                photoUrl={exercise.photoUrl}
                videoUrl={exercise.videoUrl}
                alt={exercise.name}
            />

            <h3 className="font-bold text-black text-lg mb-4 text-center">{exercise.name}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-center">
                {left && (
                    <div>
                        <SideCard label="Lado Esquerdo" data={left} />
                        {hasRef(left) && (
                            <>
                                <Badge classification={left.ref.classification} />
                                <ReferenceBox
                                    minValue={left.ref.minValue}
                                    maxValue={left.ref.maxValue}
                                    onClick={() => {
                                        setActiveSide("L");
                                        handleOpenReferenceDialog();
                                    }}
                                />
                            </>
                        )}
                    </div>
                )}

                {right && (
                    <div>
                        <SideCard label="Lado Direito" data={right} />
                        {hasRef(right) && (
                            <>
                                <Badge classification={right.ref.classification} />
                                <ReferenceBox
                                    minValue={right.ref.minValue}
                                    maxValue={right.ref.maxValue}
                                    onClick={() => {
                                        setActiveSide("R");
                                        handleOpenReferenceDialog();
                                    }}
                                />
                            </>
                        )}
                    </div>
                )}
            </div>

            {left?.observation && (
                <ObservationCard observation={`${left?.observation || ""}`} label="Observação Esquerdo" />
            )}
            {right?.observation && (
                <ObservationCard observation={`${right?.observation || ""}`} label="Observação Direito" />
            )}

            <ReferenceDetailDialog
                open={openReferenceDialog}
                onClose={() => setOpenReferenceDialog(false)}
                references={levels}
                exerciseName={exercise.name}
            />
        </div>
    );
};

export default ExerciseResultCard;