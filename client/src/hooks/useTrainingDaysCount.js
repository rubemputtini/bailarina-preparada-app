import { useEffect, useState } from 'react';
import { getYearlyTrainingDaysCount } from '../services/dashboardService';

const useTrainingDaysCount = () => {
  const [trainingDaysCount, setTrainingDaysCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await getYearlyTrainingDaysCount();
        setTrainingDaysCount(result);

      } catch (err) {
        console.error("Erro ao carregar dias treinados:", err);

      } finally {
        setLoading(false);

      }
    };
    
    fetch();
  }, []);

  return { trainingDaysCount, loading };
};

export default useTrainingDaysCount;
