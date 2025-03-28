import Footer from "../components/Footer";
import Nav from "../components/Nav";
import RegisterTrainingButton from "../components/training/RegisterTrainingButton";
import AnnouncementsFeedCard from "../components/cards/AnnouncementsFeedCard";
import CompletedTrainingCard from "../components/cards/CompletedTrainingCard";
import RankingTop5Card from "../components/cards/RankingTop5Card";
import DailyScheduleCard from "../components/cards/DailyScheduleCard";
import useDailySchedule from "../hooks/useDailySchedule";
import useTopRanking from "../hooks/useTopRanking";
import useTrainingDaysCount from "../hooks/useTrainingDaysCount";

const Dashboard = () => {
    const { dailySchedule, loading: loadingSchedule } = useDailySchedule();
    const { ranking, loading: loadingRanking } = useTopRanking();
    const { trainingDaysCount } = useTrainingDaysCount();

    return (
        <div className="min-h-screen flex flex-col text-white">
            <Nav />
            <div className="p-6 flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <DailyScheduleCard dailySchedule={dailySchedule} loading={loadingSchedule} />
                    <RankingTop5Card ranking={ranking} loading={loadingRanking} />
                    <CompletedTrainingCard trainingDaysCount={trainingDaysCount} />
                    <AnnouncementsFeedCard loading={false} />
                </div>
                <RegisterTrainingButton />
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;
