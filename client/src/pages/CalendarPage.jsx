import React, { useState, useEffect, useMemo } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CalendarSummary from "../components/CalendarSummary";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { getCalendarSummary } from "../services/calendarService";

const CalendarPage = () => {
    const [calendarData, setCalendarData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [error, setError] = useState(null);

    const uniqueDaysTrained = useMemo(() => {
        return new Set(calendarData.map((item) => item.date.split("T")[0])).size;
    }, [calendarData]);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                setLoading(true);
                const startDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).toISOString();
                const endDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).toISOString();
                const data = await getCalendarSummary(startDate, endDate);

                setCalendarData(data);
            } catch (err) {
                console.error(err);
                setError("Erro ao carregar os dados.");
            } finally {
                setLoading(false);
            }
        };

        fetchSummary();
    }, [currentMonth]);

    const getTileClassName = ({ date }) => {
        const formattedDate = date.toISOString().split("T")[0];
        return calendarData.some((item) => item.date.split("T")[0] === formattedDate) ? "training-day" : null;
    };

    const handleNavigation = ({ activeStartDate }) => {
        const minDate = new Date(2025, 0, 1);
        const maxDate = new Date();

        if (activeStartDate < minDate) {
            setCurrentMonth(minDate);
        } else if (activeStartDate > maxDate) {
            setCurrentMonth(maxDate);
        } else {
            setCurrentMonth(activeStartDate);
        }
    };

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            </Box>
        );
    }

    return (
        <>
            <Nav />
            <Box
                sx={{
                    padding: "16px",
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        maxWidth: "500px",
                        textAlign: "center",
                        backgroundColor: "#FFFFFF",
                        borderRadius: "12px",
                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                        padding: "24px",
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{ fontWeight: "bold", color: "#4A148C", marginBottom: "16px" }}
                    >
                        Frequência de Treinos
                    </Typography>

                    {loading ? (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                minHeight: "300px",
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Calendar
                            tileClassName={getTileClassName}
                            onActiveStartDateChange={handleNavigation}
                            showNeighboringMonth={false}
                            minDate={new Date(2025, 0, 1)}
                            maxDate={new Date()}
                            navigationLabel={({ date }) => (
                                <div>
                                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                        {date.getFullYear()}
                                    </Typography>
                                    <Typography sx={{ fontWeight: "medium" }}>
                                        {date.toLocaleString("pt-BR", { month: "long" })}
                                    </Typography>
                                </div>
                            )}
                            prev2Label={null}
                            next2Label={null}
                            view="month"
                            defaultView="month"
                            allowPartialRange={false}
                        />
                    )}

                    <CalendarSummary uniqueDaysTrained={uniqueDaysTrained} />
                </Box>
            </Box>
            <Footer />
        </>
    );
};

export default CalendarPage;
