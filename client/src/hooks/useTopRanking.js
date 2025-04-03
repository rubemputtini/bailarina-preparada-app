import { useEffect, useState } from 'react';
import { getRankingMonthTop5 } from 'features/dashboard/services/dashboardService';

const useTopRanking = () => {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await getRankingMonthTop5();
        setRanking(result);

      } catch (err) {
        console.error("Erro ao carregar ranking:", err);

      } finally {
        setLoading(false);
      }
    };
    
    fetch();
  }, []);

  return { ranking, loading };
};

export default useTopRanking;
