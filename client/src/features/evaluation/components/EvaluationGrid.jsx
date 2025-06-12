import ExerciseResultCard from "./ExerciseResultCard";

const EvaluationGrid = ({ items, userAge, userGender }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center items-stretch">
            {items.map((ex) => (
                <div key={ex.exercise.exerciseId} className="w-full max-w-md h-full">
                    <ExerciseResultCard
                        ex={ex}
                        userAge={userAge}
                        userGender={userGender}
                    />
                </div>
            ))}
        </div>
    );
};

export default EvaluationGrid;
