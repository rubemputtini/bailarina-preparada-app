export const calculateTotalFMSScore = (fmsExercises) => {
        const map = new Map();

        fmsExercises.forEach((ex) => {
            const id = ex.exercise.exerciseId;

            if (!ex.exercise.isUnilateral) {
                map.set(id, ex.score);
            } else {
                const current = map.get(id);
                map.set(id, current === undefined ? ex.score : Math.min(current, ex.score));
            }
        });

        return Array.from(map.values()).reduce((sum, val) => sum + val, 0);
    };