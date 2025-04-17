import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useParams } from "react-router-dom";
import PageLayout from "layouts/PageLayout";
import { getUserSchedule, updateSchedule, createSchedule, sendScheduleEmail } from "../services/scheduleService";
import { calculateAge } from "../../../shared/utils/dateUtils";
import { buildTaskPayload, areEventsEqual } from "shared/utils/scheduleUtils";
import HeaderSection from "../components/HeaderSection";
import UserInfo from "../components/UserInfo";
import ScheduleGrid from "../components/ScheduleGrid";
import NotesSection from "../components/NotesSection";
import SuggestedDateNotice from "../components/SuggestedDateNotice";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import ConfirmationDialog from "shared/dialogs/ConfirmationDialog";
import SuccessDialog from "shared/dialogs/SuccessDialog";

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
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [emailLoading, setEmailLoading] = useState(false);

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

    const handleSendEmailClick = () => {
        setShowConfirmDialog(true);
    };

    const handleConfirmSendEmail = async () => {
        setEmailLoading(true);

        try {
            await sendScheduleEmail(userId);
            setShowSuccessDialog(true);
        } catch (error) {
            console.log("Erro ao enviar e-mail: ", error);
        } finally {
            setEmailLoading(false);
            setShowConfirmDialog(false);
        }
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <PageLayout>
                <HeaderSection isEditing={isEditing} onEditToggle={handleToggleEdit} onSave={handleSave} />
                <div className="flex justify-between items-center mt-4 flex-wrap gap-2">
                    <UserInfo
                        name={userName}
                        age={calculateAge(userBirthDate)}
                        goal={goal}
                        setGoal={setGoal}
                        isEditing={isEditing}
                    />

                    {!isEditing && (
                        <button
                            onClick={handleSendEmailClick}
                            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 sm:px-4 text-sm sm:text-base rounded-lg font-medium transition disabled:opacity-50 mb-5 md:mb-0"
                        >
                            <PaperAirplaneIcon className="w-5 h-5" />
                            Enviar e-mail
                        </button>
                    )}
                </div>

                <ScheduleGrid events={events} setEvents={setEvents} isEditing={isEditing} setDeletedIds={setDeletedIds} />
                <NotesSection value={observations} setValue={setObservations} isEditing={isEditing} />
                {events.length > 0 && <SuggestedDateNotice date={suggestedDate} />}

                {showConfirmDialog && (
                    <ConfirmationDialog
                        message="Tem certeza que deseja enviar e-mail para este usuário?"
                        onConfirm={handleConfirmSendEmail}
                        onCancel={() => setShowConfirmDialog(false)}
                        loading={emailLoading}
                    />
                )}

                {showSuccessDialog && (
                    <SuccessDialog
                        message="E-mail enviado com sucesso!"
                        onClose={() => setShowSuccessDialog(false)}
                    />
                )}

            </PageLayout>
        </DndProvider>
    );
};

export default ScheduleAdminPage;