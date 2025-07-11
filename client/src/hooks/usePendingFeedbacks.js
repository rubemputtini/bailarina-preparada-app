import { getMyFeedbacks, getPendingFeedbacks } from 'features/training/services/feedbackService';
import { useEffect, useState } from 'react';
import useIsAdmin from './useIsAdmin';

const usePendingFeedbacks = () => {
  const [hasPending, setHasPending] = useState(false);
  const isAdmin = useIsAdmin();

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = isAdmin 
          ? await getPendingFeedbacks(1, 1)
          : await getMyFeedbacks(1, 1);

        const pendingCount = isAdmin
          ? result.totalFeedbacks
          : result.length;

        setHasPending(pendingCount > 0);
      } catch (error) {
        console.error("Erro ao buscar feedbacks pendentes", error);
      }
    };

    fetch();
  }, [isAdmin]);

  return hasPending;
};

export default usePendingFeedbacks;
