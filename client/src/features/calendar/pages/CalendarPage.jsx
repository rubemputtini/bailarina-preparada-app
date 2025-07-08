import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CalendarSummary from "../components/CalendarSummary";
import { getCalendarSummary } from "../services/calendarService";
import PageLayout from "layouts/PageLayout";
import LoadingCard from "shared/ui/LoadingCard";
import ErrorCard from "shared/ui/ErrorCard";
import CalendarYearCompactView from "../components/CalendarYearCompactView";
import DialogButton from "shared/buttons/DialogButton";
import TrainingDayDialog from "../components/TrainingDayDialog";

const CalendarPage = () => {
    const [calendarData, setCalendarData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [showYearView, setShowYearView] = useState(false);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);

    const uniqueDaysTrained = useMemo(() => {
        return new Set(calendarData.map((item) => new Date(item.date).toLocaleDateString("sv-SE"))).size;
    }, [calendarData]);

    const fetchSummary = useCallback(async () => {
        try {
            setLoading(true);

            const formatDate = (date) => {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const day = String(date.getDate()).padStart(2, "0");

                return `${year}-${month}-${day}`;
            };

            const startDate = formatDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1));
            const endDate = formatDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0));

            const data = await getCalendarSummary(startDate, endDate);

            setCalendarData(data);
        } catch (err) {
            console.error(err);
            setError("Erro ao carregar os dados.");
        } finally {
            setLoading(false);
        }
    }, [currentMonth]);

    useEffect(() => {
        fetchSummary();
    }, [fetchSummary]);

    const getTileClassName = ({ date }) => {
        const formattedDate = date.toLocaleDateString("sv-SE"); // formato 'YYYY-MM-DD' sem problemas de fuso
        return calendarData.some((item) => item.date.split("T")[0] === formattedDate) ? "training-day" : null;
    };

    const handleNavigation = ({ activeStartDate }) => {
        setCurrentMonth(activeStartDate);
    };

    const handleDayClick = (date) => {
        const selected = date.toLocaleDateString("sv-SE");
        const hasTraining = calendarData.some(
            (item) => item.date.split("T")[0] === selected
        );

        if (hasTraining) {
            setSelectedDate(selected);
        }
    };

    const handleSelectMonth = (monthIndex) => {
        const selectedMonth = new Date(new Date().getFullYear(), monthIndex, 1);
        setCurrentMonth(selectedMonth);
        setShowYearView(false);
    };

    return (
        <PageLayout>
            <Typography
                variant="h4"
                sx={{
                    fontWeight: "800",
                    textAlign: "center",
                    background: "linear-gradient(90deg, #ffffff 0%, #c5e1e9 60%, #c5e1e9 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    marginBottom: "24px",
                    fontSize: { xs: "2rem", md: "2.5rem" },
                }}
            >
                Frequência de Treinos
            </Typography>

            {showYearView ? (
                <CalendarYearCompactView
                    onBackToMonthView={() => {
                        setCurrentMonth(new Date());
                        setShowYearView(false);
                    }}
                    onSelectMonth={handleSelectMonth}
                />

            ) : loading ? (
                <LoadingCard />
            ) : error ? (
                <ErrorCard message={error} />
            ) : (
                <>
                    <Calendar
                        tileClassName={getTileClassName}
                        onActiveStartDateChange={handleNavigation}
                        showNeighboringMonth={false}
                        formatShortWeekday={(locale, date) =>
                            date.toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", "")
                        }
                        maxDate={new Date()}
                        tileDisabled={({ date }) => {
                            const formattedDate = date.toLocaleDateString("sv-SE");
                            const hasTraining = calendarData.some(
                                (item) => item.date.split("T")[0] === formattedDate
                            );
                            return !hasTraining; // Desabilita se não teve treino
                        }}
                        navigationLabel={({ date }) => (
                            <Box sx={{ textAlign: "center", lineHeight: 1.2 }}>
                                <Typography variant="body2" sx={{ fontWeight: "bold", fontSize: "1rem", lineHeight: 1 }}>
                                    {date.getFullYear()}
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: "0.875rem", lineHeight: 1 }}>
                                    {date.toLocaleString("pt-BR", { month: "long" })}
                                </Typography>
                            </Box>
                        )}
                        prev2Label={null}
                        next2Label={null}
                        view="month"
                        defaultView="month"
                        allowPartialRange={false}
                        value={currentMonth}
                        onClickDay={handleDayClick}
                    />
                    <CalendarSummary uniqueDaysTrained={uniqueDaysTrained} />

                    <Box sx={{ mt: 3, textAlign: "center" }}>
                        {!showYearView && (
                            <DialogButton
                                onClick={() => setShowYearView(true)}
                                fullWidthOnMobile={false}
                            >
                                Ver ano completo
                            </DialogButton>
                        )}
                    </Box>
                </>
            )}

            <TrainingDayDialog
                open={!!selectedDate}
                onClose={() => setSelectedDate(null)}
                selectedDate={selectedDate}
                onTrainingChanged={fetchSummary}
            />
        </PageLayout>
    );
};

export default CalendarPage;
