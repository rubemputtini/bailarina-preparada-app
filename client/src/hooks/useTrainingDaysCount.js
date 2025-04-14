import { useEffect, useState } from 'react';
import { getYearlyTrainingDaysCount } from 'features/dashboard/services/dashboardService';

const useTrainingDaysCount = () => {
  const [trainingDaysCount, setTrainingDaysCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    setLoading(true);
    try {
      const result = await getYearlyTrainingDaysCount();
      setTrainingDaysCount(result);
    } catch (err) {
      console.error("Erro ao carregar dias treinados:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return { trainingDaysCount, loading, refetch: fetch };
};

export default useTrainingDaysCount;
