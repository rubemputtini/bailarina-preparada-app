import { useEffect, useState } from "react";
import { getDailySchedule, getRankingMonthTop5, getYearlyTrainingDaysCount } from "../services/dashboardService";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import RegisterTrainingButton from "../components/training/RegisterTrainingButton";
import NotificationsCard from "../components/cards/NotificationsCard";
import CompletedTrainingCard from "../components/cards/CompletedTrainingCard";
import RankingTop5Card from "../components/cards/RankingTop5Card";
import DailyScheduleCard from "../components/cards/DailyScheduleCard";

const Dashboard = () => {
    const [dailySchedule, setDailySchedule] = useState([]);
    const [ranking, setRanking] = useState([]);
    const [trainingDaysCount, setTrainingDaysCount] = useState(0);

    const DAYS_GOAL = 100; // Meta anual de dias

    useEffect(() => {
        const fetchData = async () => {
            const dailyScheduleData = await getDailySchedule();
            const rankingData = await getRankingMonthTop5();
            const trainingDaysData = await getYearlyTrainingDaysCount();

            setDailySchedule(dailyScheduleData);
            setRanking(rankingData);
            setTrainingDaysCount(trainingDaysData);
        };
        fetchData();
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gray-900 text-white">
            <Nav />
            <div className="p-6 flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <DailyScheduleCard dailySchedule={dailySchedule} />
                    <RankingTop5Card ranking={ranking} />
                    <CompletedTrainingCard trainingDaysCount={trainingDaysCount} daysGoal={DAYS_GOAL} />
                    <NotificationsCard />
                </div>
                <RegisterTrainingButton />
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;
