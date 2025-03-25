import { useState, useEffect } from 'react';
import { getMyGoalByYear, setMyGoal } from '../services/userGoalService';

const useUserGoal = (year, trainingDaysCount) => {
  const [goal, setGoal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchGoal = async () => {
      setLoading(true);

      try {
        const data = await getMyGoalByYear(year);
        setGoal(data);
        setNotFound(false);

      } catch (error) {
        if (error?.response?.status === 404) {
          setNotFound(true);

        } else {
          console.error("Erro inesperado ao buscar meta:", error);

        }
      } finally {
        setLoading(false);

      }
    };

    fetchGoal();
  }, [year]);

  const saveGoal = async (goalDays) => {
    try {
      const data = await setMyGoal({ year, goalDays });

      setGoal(data);
      setNotFound(false);

    } catch (error) {
      console.error("Erro ao salvar meta:", error);
      
    }
  };

  const progress = goal ? (trainingDaysCount / goal.goalDays) * 100 : 0;

  return {
    goal,
    loading,
    notFound,
    saveGoal,
    progress,
  };
};

export default useUserGoal;