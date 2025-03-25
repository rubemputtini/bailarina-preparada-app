import { useEffect, useState } from 'react';
import { getDailySchedule } from '../services/dashboardService';

const useDailySchedule = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await getDailySchedule();
        setData(result);

      } catch (err) {
        console.error("Erro ao carregar aulas do dia:", err);

      } finally {
        setLoading(false);
      }
    };
    
    fetch();
  }, []);

  return { dailySchedule: data, loading };
};

export default useDailySchedule;
