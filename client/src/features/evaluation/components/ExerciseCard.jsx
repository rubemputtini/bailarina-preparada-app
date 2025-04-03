const ExerciseCard = ({
    exercise,
    score,
    observation,
    error,
    onScoreChange,
    onObservationChange,
    toggleSide,
    currentSide
}) => {
    const side = exercise.isUnilateral ? currentSide : "None";

    return (
        <div className="flex flex-col lg:flex-row items-center gap-6 bg-white rounded-2xl p-4 shadow-lg border border-gray-300">
            <img src={exercise.photoUrl} alt={exercise.name} className="w-44 h-44 object-cover rounded-xl" />

            <div className="flex-1 flex flex-col gap-2 w-full overflow-hidden">
                <h3 className="text-lg font-bold text-gray-800 break-words max-w-full text-center md:text-start">
                    {exercise.name}
                </h3>

                {exercise.isUnilateral && (
                    <div onClick={toggleSide} className="flex flex-col items-center md:items-start gap-2">
                        <div className="flex rounded-full overflow-hidden bg-gray-300 cursor-pointer shadow-inner">
                            <div className={`px-4 py-1 text-sm font-bold transition-all duration-300 ${side === "Right" ? 'bg-purple-600 text-white' : 'text-gray-600'}`}>
                                DIREITA
                            </div>
                            <div className={`px-4 py-1 text-sm font-bold transition-all duration-300 ${side === "Left" ? 'bg-purple-600 text-white' : 'text-gray-600'}`}>
                                ESQUERDA
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                    <div className="flex flex-col sm:w-32 w-full">
                        <input
                            type="number"
                            inputMode="numeric"
                            min={0}
                            max={exercise.category === "FMS" ? 3 : 100}
                            value={score?.[side] || ""}
                            onChange={(e) => onScoreChange(exercise.exerciseId, side, e.target.value)}
                            placeholder="Nota"
                            className={`p-3 rounded-xl bg-gray-100 border ${error ? 'border-red-500' : 'border-gray-400'} text-gray-800 appearance-none focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
                        />
                        {error && (
                            <span className="text-red-600 text-xs text-center mt-1 ml-1">
                                {exercise.category === "FMS"
                                    ? "Nota deve ser entre 0 e 3"
                                    : "Nota deve ser entre 0 e 100"}
                            </span>
                        )}
                    </div>

                    <textarea
                        rows={2}
                        placeholder="Observações"
                        value={observation?.[side] || ""}
                        onChange={(e) => onObservationChange(exercise.exerciseId, side, e.target.value)}
                        className="w-full flex-grow p-3 rounded-xl bg-gray-100 border border-gray-400 text-gray-800 focus:outline-none"
                    ></textarea>
                </div>

            </div>
        </div>
    );
};

export default ExerciseCard;