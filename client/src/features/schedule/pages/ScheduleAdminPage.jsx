import { useEffect, useState } from "react";
import { Container, Typography, Paper, IconButton } from "@mui/material";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FaEdit, FaCheck } from "react-icons/fa";
import Nav from "../../../layouts/Nav";
import Footer from "../../../layouts/Footer";
import { getUserSchedule, updateSchedule, createSchedule } from "../services/scheduleService";
import { deleteScheduleTask } from "../services/scheduleTaskService";
import DroppableSlot from "../components/DroppableSlot";
import { daysOfWeek, periods } from "../../../shared/utils/constants";
import { calculateAge } from "../../../shared/utils/dateUtils";
import { useParams } from "react-router-dom";

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
                    color: task.color
                }));

                setEvents(formattedEvents);
                setInitialEvents(formattedEvents);
                setInitialGoal(response.goal || "");
                setInitialObservations(response.observations || "");
            } catch (error) {
                console.error("Error fetching schedule:", error);
            }
        };

        fetchSchedule();
    }, [userId]);

    const handleToggleEdit = () => setIsEditing(!isEditing);

    const areEventsEqual = (a, b) => {
        if (a.length !== b.length) return false;

        const sortById = (list) => [...list].sort((x, y) => (x.id ?? 0) - (y.id ?? 0));

        const sortedA = sortById(a);
        const sortedB = sortById(b);

        return sortedA.every((event, index) => {
            const other = sortedB[index];
            return (
                event.id === other.id &&
                event.title === other.title &&
                event.dayOfWeek === other.dayOfWeek &&
                event.period === other.period &&
                event.row === other.row &&
                event.color === other.color &&
                event.notes === other.notes
            );
        });
    };

    const handleSave = async () => {
        const hasGoalOrObsChanged = goal !== initialGoal || observations !== initialObservations;
        const isUnchanged = areEventsEqual(events, initialEvents) && deletedIds.length === 0 && !hasGoalOrObsChanged;

        if (isUnchanged) {
            setIsEditing(false);
            return;
        }

        if (events.length === 0 && deletedIds.length === 0) return;

        let scheduleId = events[0]?.scheduleId;

        if (!scheduleId) {
            const createResponse = await createSchedule({
                userId,
                goal,
                observations,
                tasks: events.map(event => ({
                    dayOfWeek: event.dayOfWeek,
                    slot: event.row,
                    period: event.period,
                    activity: event.title,
                    notes: event.notes,
                    color: event.color
                }))
            });
            scheduleId = createResponse.scheduleId;
        } else {
            const payload = {
                scheduleId,
                goal,
                observations,
                tasks: events.map(event => ({
                    scheduleTaskId: event.id,
                    dayOfWeek: event.dayOfWeek,
                    slot: event.row,
                    period: event.period,
                    activity: event.title,
                    notes: event.notes,
                    color: event.color
                }))
            };
            await updateSchedule(scheduleId, payload);

            for (const id of deletedIds) {
                await deleteScheduleTask(id);
            }
        }

        setDeletedIds([]);
        setInitialGoal(goal);
        setInitialObservations(observations);
        setIsEditing(false);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="min-h-screen flex flex-col text-white">
                <Nav />
                <Container className="flex-grow p-6">
                    <div className="flex justify-between items-center mb-4">
                        <Typography variant="h4" className="text-[#c5e1e9]">
                            Planejamento Semanal:
                        </Typography>
                        <IconButton onClick={isEditing ? handleSave : handleToggleEdit} sx={{ color: "#c5e1e9" }}>
                            {isEditing ? <FaCheck size={24} /> : <FaEdit size={24} />}
                        </IconButton>
                    </div>
                    <div className="mb-4">
                        <Typography
                            variant="subtitle1"
                            sx={{
                                color: '#9575cd',
                                fontSize: { xs: '20px', sm: '22px' },
                                fontWeight: 500,
                                marginBottom: '6px'
                            }}
                        >
                            {userName}, {calculateAge(userBirthDate)} anos
                        </Typography>

                        <div className="flex items-center space-x-2">
                            <label className="text-sm text-gray-300 whitespace-nowrap">Objetivo:</label>
                            <textarea
                                className="p-1 rounded bg-gray-800 text-white text-sm w-96 resize-none"
                                rows={1}
                                disabled={!isEditing}
                                value={goal}
                                onChange={(e) => setGoal(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto overflow-y-auto max-h-[450px] sm:max-h-[500px]">
                        <Paper elevation={3} className="p-4 bg-gray-100 shadow-lg min-w-[900px]">
                            <div className="grid grid-cols-8 gap-1 text-center border-b border-gray-400 pb-2 text-gray-900 text-xs sm:text-sm md:text-lg bg-white font-bold">
                                <div className="text-left">Período</div>
                                {daysOfWeek.map((day, index) => (
                                    <div key={index}>{day}</div>
                                ))}
                            </div>

                            {periods.map((period, periodIndex) => (
                                <div key={periodIndex} className="mb-1">
                                    {[0, 1].map(row => (
                                        <div key={`${period.label}-${row}`} className="grid grid-cols-8 gap-1 py-[3px] text-xs sm:text-sm md:text-base">
                                            <div className="text-left text-gray-900 font-semibold pr-4">
                                                {row === 0 ? period.label : ""}
                                            </div>
                                            {daysOfWeek.map((_, colIndex) => (
                                                <DroppableSlot
                                                    key={`${colIndex}-${period.label}-${row}`}
                                                    colIndex={colIndex}
                                                    period={period}
                                                    row={row}
                                                    isEditing={isEditing}
                                                    setEvents={setEvents}
                                                    events={events.filter(
                                                        event =>
                                                            event.dayOfWeek === colIndex &&
                                                            event.period === period.label &&
                                                            event.row === row
                                                    )}
                                                    setDeletedIds={setDeletedIds}
                                                />
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </Paper>
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm text-gray-300 mb-1">Observações:</label>
                        <textarea
                            className="w-full p-2 rounded bg-gray-800 text-white resize-none"
                            rows={2}
                            disabled={!isEditing}
                            value={observations}
                            onChange={(e) => setObservations(e.target.value)}
                        />
                    </div>
                    <div className="mt-6 text-center">
                        <div className="flex flex-col sm:flex-row items-center justify-center text-gray-300 text-xl sm:text-2xl">
                            <span>Próxima atualização sugerida:</span>
                            <span className="font-bold sm:ml-2 sm:whitespace-nowrap">{suggestedDate}</span>
                        </div>
                    </div>
                </Container>
                <Footer />
            </div>
        </DndProvider>
    );
};

export default ScheduleAdminPage;
