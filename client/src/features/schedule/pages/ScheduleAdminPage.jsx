import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useParams } from "react-router-dom";
import PageLayout from "layouts/PageLayout";
import { getUserSchedule, updateSchedule, createSchedule } from "../services/scheduleService";
import { calculateAge } from "../../../shared/utils/dateUtils";
import { buildTaskPayload, areEventsEqual } from "shared/utils/scheduleUtils";
import HeaderSection from "../components/HeaderSection";
import UserInfo from "../components/UserInfo";
import ScheduleGrid from "../components/ScheduleGrid";
import NotesSection from "../components/NotesSection";
import SuggestedDateNotice from "../components/SuggestedDateNotice";

const ScheduleAdminPage = () => {
    const [events, setEvents] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [suggestedDate, setSuggestedDate] = useState();
    const [deletedIds, setDeletedIds] = useState([]);
    const [initialEvents, setInitialEvents] = useState([]);
    const [userName, setUserName] = useState("");
    const [userBirthDate, setUserBirthDate] = useState("");
    const [goal, setGoal] = useState("");
    const [observations, setObservations] = useState("");
    const [initialGoal, setInitialGoal] = useState("");
    const [initialObservations, setInitialObservations] = useState("");
    const { userId } = useParams();

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const response = await getUserSchedule(userId);
                setUserName(response.userName || "");
                setUserBirthDate(response.dateOfBirth);
                setGoal(response.goal || "");
                setObservations(response.observations || "");

                const lastUpdate = new Date(response.updatedAt || response.createdAt);
                const nextSuggestedDate = new Date(lastUpdate);
                nextSuggestedDate.setMonth(nextSuggestedDate.getMonth() + 3);
                setSuggestedDate(nextSuggestedDate.toLocaleDateString("pt-BR"));

                const formattedEvents = response.tasks.map((task) => ({
                    id: task.scheduleTaskId,
                    scheduleId: response.scheduleId,
                    title: task.activity,
                    dayOfWeek: task.dayOfWeek,
                    period: task.period,
                    row: task.slot,
                    notes: task.notes,
                    color: task.color,
                    link: task.link,
                    activityLinkId: task.activityLinkId ?? null
                }));

                setEvents(formattedEvents);
                setInitialEvents(formattedEvents);
                setInitialGoal(response.goal || "");
                setInitialObservations(response.observations || "");
            } catch (error) {
                console.error("Erro ao buscar avaliações:", error);
            }
        };

        fetchSchedule();
    }, [userId]);

    const handleToggleEdit = () => setIsEditing(!isEditing);

    const handleSave = async () => {
        const hasGoalOrObsChanged = goal !== initialGoal || observations !== initialObservations;
        const isUnchanged = areEventsEqual(events, initialEvents) && deletedIds.length === 0 && !hasGoalOrObsChanged;

        const nothingChanged =
            isUnchanged || (events.length === 0 && deletedIds.length === 0 && !hasGoalOrObsChanged);

        if (nothingChanged) {
            setIsEditing(false);
            return;
        }

        let scheduleId = events[0]?.scheduleId;

        if (!scheduleId) {
            const createResponse = await createSchedule({
                userId,
                goal,
                observations,
                tasks: buildTaskPayload(events),
            });

            scheduleId = createResponse.scheduleId;
        } else {
            const payload = {
                scheduleId,
                goal,
                observations,
                tasks: buildTaskPayload(events),
            };

            await updateSchedule(scheduleId, payload);

        }

        setDeletedIds([]);
        setInitialGoal(goal);
        setInitialObservations(observations);
        setInitialEvents(events);
        setIsEditing(false);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <PageLayout>
                <HeaderSection isEditing={isEditing} onEditToggle={handleToggleEdit} onSave={handleSave} />
                <UserInfo name={userName} age={calculateAge(userBirthDate)} goal={goal} setGoal={setGoal} isEditing={isEditing} />
                <ScheduleGrid events={events} setEvents={setEvents} isEditing={isEditing} setDeletedIds={setDeletedIds} />
                <NotesSection value={observations} setValue={setObservations} isEditing={isEditing} />
                {events.length > 0 && <SuggestedDateNotice date={suggestedDate} />}
            </PageLayout>
        </DndProvider>
    );
};

export default ScheduleAdminPage;