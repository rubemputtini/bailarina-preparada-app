import React, { useEffect, useState } from "react";
import { getUserAchievements } from "features/ranking/services/achievementService";
import LoadingCard from "shared/ui/LoadingCard";
import ErrorCard from "shared/ui/ErrorCard";
import AchievementCardPremium from "./AchievementCardPremium";

const AchievementsSection = () => {
    const [achievements, setAchievements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAchievements = async () => {
            try {
                const data = await getUserAchievements();
                setAchievements(data);
            } catch (err) {
                setError("Erro ao carregar conquistas.");
            } finally {
                setLoading(false);
            }
        };
        fetchAchievements();
    }, []);

    if (loading) return <LoadingCard color="#000" />;
    if (error) return <ErrorCard message={error} />;

    if (!achievements || achievements.length === 0) {
        return (
            <div className="text-center text-gray-500 text-sm py-8">
                Nenhuma conquista encontrada.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {achievements.map((ach) =>
                ach?.achievementId && (
                    <AchievementCardPremium
                        key={ach.achievementId}
                        achievement={ach}
                    />
                )
            )}
        </div>
    );
};

export default AchievementsSection;
