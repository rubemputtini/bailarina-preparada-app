import { useEffect, useState } from "react";
import { Container, Typography, Paper } from "@mui/material";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { getMySchedule } from "../services/scheduleService";
import DroppableSlot from "../components/schedule/DroppableSlot";
import { scheduleForm, daysOfWeek, periods } from "../utils/constants";

const SchedulePage = () => {
    const [events, setEvents] = useState([]);
    const [goal, setGoal] = useState("");
    const [observations, setObservations] = useState("");
    const [suggestedDate, setSuggestedDate] = useState();

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const response = await getMySchedule();

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

            } catch (error) {
                console.error("Error fetching schedule:", error);
            }
        };

        fetchSchedule();
    }, []);

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="min-h-screen flex flex-col text-white">
                <Nav />
                <Container className="flex-grow py-5">
                    <div className="flex justify-between items-center mb-4">
                        <Typography variant="h4" className="text-[#c5e1e9]">
                            Planejamento Semanal
                        </Typography>
                    </div>
                    <div className="mb-4">
                        <div className="flex items-center space-x-2">
                            <label className="text-sm text-gray-300 whitespace-nowrap">Objetivo:</label>
                            <textarea
                                className="p-1 rounded bg-gray-800 text-white text-sm w-96 resize-none"
                                rows={1}
                                value={goal}
                                disabled
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
                                                    setEvents={setEvents}
                                                    events={events.filter(
                                                        event =>
                                                            event.dayOfWeek === colIndex &&
                                                            event.period === period.label &&
                                                            event.row === row
                                                    )}
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
                            value={observations}
                            disabled
                        />
                    </div>
                    <div className="mt-6 text-center">
                        <div className="flex flex-col sm:flex-row items-center justify-center text-gray-300 text-xl sm:text-2xl">
                            <span>Próxima atualização sugerida:</span>
                            <span className="font-bold sm:ml-2 sm:whitespace-nowrap">{suggestedDate}</span>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center mt-2 text-gray-300 text-base">
                            <span>Precisa de um novo planejamento?</span>
                            <a
                                href={scheduleForm}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#c5e1e9] font-bold underline hover:text-[#8ad9ee] sm:ml-2 sm:whitespace-nowrap"
                            >
                                Solicite aqui.
                            </a>
                        </div>
                    </div>

                </Container>
                <Footer />
            </div>
        </DndProvider>
    );
};

export default SchedulePage;
