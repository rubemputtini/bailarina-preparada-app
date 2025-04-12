import Footer from "../../../layouts/Footer";
import Nav from "../../../layouts/Nav";
import RegisterTrainingButton from "features/training/components/RegisterTrainingButton";
import AnnouncementsFeedCard from "../components/AnnouncementsFeedCard";
import CompletedTrainingCard from "../components/CompletedTrainingCard";
import RankingTop5Card from "../components/RankingTop5Card";
import DailyScheduleCard from "../components/DailyScheduleCard";
import useDailySchedule from "../../../hooks/useDailySchedule";
import useTopRanking from "../../../hooks/useTopRanking";
import useTrainingDaysCount from "../../../hooks/useTrainingDaysCount";
import BirthdayCard from "../components/BirthdayCard";
import useIsAdmin from "hooks/useIsAdmin";

const Dashboard = () => {
    const { dailySchedule, loading: loadingSchedule } = useDailySchedule();
    const { ranking, loading: loadingRanking } = useTopRanking();
    const { trainingDaysCount } = useTrainingDaysCount();
    const isAdmin = useIsAdmin();

    return (
        <div className="min-h-screen flex flex-col text-white">
            <Nav />
            <div className="p-6 flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <DailyScheduleCard dailySchedule={dailySchedule} loading={loadingSchedule} />
                    {isAdmin && <BirthdayCard />}
                    <RankingTop5Card ranking={ranking} loading={loadingRanking} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
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
