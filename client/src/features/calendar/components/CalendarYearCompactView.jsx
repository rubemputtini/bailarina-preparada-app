import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Box } from "@mui/material";
import { getCalendarYearSummary } from "../services/calendarService";
import DialogButton from "shared/buttons/DialogButton";
import { months } from "shared/utils/constants";
import TrainingStatsCard from "./TrainingsStatsCard";
import LoadingCard from "shared/ui/LoadingCard";
import MiniMonthCard from "./MiniMonthCard";
import { buildTrainedDatesMap, generateMonthDays } from "shared/utils/calendarUtils";

const CalendarYearCompactView = ({ onBackToMonthView, onSelectMonth }) => {
    const [calendarData, setCalendarData] = useState([]);
    const [totalDays, setTotalDays] = useState(0);
    const [totalTrainings, setTotalTrainings] = useState(0);

    const [loading, setLoading] = useState(true);
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getCalendarYearSummary(currentYear);
                setCalendarData(result.dailySummaries);
                setTotalDays(result.daysTrained);
                setTotalTrainings(result.totalTrainings);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [currentYear]);

    const trainedDates = useMemo(() => buildTrainedDatesMap(calendarData), [calendarData]);

    const generateDays = useCallback(
        (month) => generateMonthDays(currentYear, month, trainedDates),
        [currentYear, trainedDates]
    );

    return (
        <Box>
            {loading ? (
                <LoadingCard />
            ) : (
                <>
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "repeat(3, 1fr)",
                                sm: "repeat(4, 1fr)",
                                lg: "repeat(6, 1fr)"
                            },
                            gap: { xs: 2, sm: 3, md: 4 },
                            justifyContent: "center",
                        }}
                    >
                        {months.map((month, index) => (
                            <MiniMonthCard
                                key={index}
                                monthIndex={index}
                                label={month.label}
                                isCurrentMonth={index === new Date().getMonth()}
                                generateDays={generateDays}
                                onClick={() => onSelectMonth?.(index)}
                            />
                        ))}
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 5, gap: 2 }}>
                        <TrainingStatsCard
                            days={totalDays}
                            trainings={totalTrainings}
                        />

                        {onBackToMonthView && (
                            <Box sx={{ mt: 2 }}>
                                <DialogButton
                                    onClick={onBackToMonthView}
                                    variant="secondary"
                                    fullWidthOnMobile={false}
                                >
                                    Ver mês atual
                                </DialogButton>
                            </Box>
                        )}
                    </Box>
                </>
            )}
        </Box>
    );
};

export default CalendarYearCompactView;
