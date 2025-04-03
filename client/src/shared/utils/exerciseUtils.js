export const groupUnilateralExercises = (exercises, referenceMap) => {
    const ordered = [];
    const map = new Map();
  
    exercises.forEach((ex) => {
      const id = ex.exercise.exerciseId;
      const sideKey = ex.side === 1 ? 'R' : ex.side === 2 ? 'L' : 'U';
      const isUnilateral = ex.exercise.isUnilateral;
  
      const refKey = `${id}-${sideKey}`;
      const ref = referenceMap[refKey] || null;
  
      if (!isUnilateral) {
        ordered.push({
          key: `${id}-U`,
          exercise: ex.exercise,
          unilateral: false,
          score: ex.score,
          observation: ex.observation,
          ref,
        });
      } else {
        if (!map.has(id)) {
          map.set(id, {
            exercise: ex.exercise,
            unilateral: true,
            sides: {},
            index: ordered.length,
          });
          ordered.push(map.get(id));
        }
        map.get(id).sides[sideKey] = {
          score: ex.score,
          observation: ex.observation,
          ref,
        };
      }
    });
  
    return ordered;
  };

export const groupByCategory = (exercises) => {
    return exercises.reduce(
        (acc, ex) => {
            if (ex.exercise.category === "FMS") acc.fms.push(ex);
            else acc.physical.push(ex);
            return acc;
        },
        { fms: [], physical: [] }
    );
};
