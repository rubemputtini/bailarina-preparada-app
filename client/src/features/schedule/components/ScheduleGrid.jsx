import { Paper } from "@mui/material";
import DroppableSlot from "./DroppableSlot";
import { daysOfWeek, periods } from "../../../shared/utils/constants";

const ScheduleGrid = ({ events, setEvents, isEditing, setDeletedIds }) => {
    return (
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
                        {[0, 1].map((row) => (
                            <div
                                key={`${period.label}-${row}`}
                                className="grid grid-cols-8 gap-1 py-[3px] text-xs sm:text-sm md:text-base"
                            >
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
                                        setDeletedIds={setDeletedIds}
                                        events={events.filter(
                                            (event) =>
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
    );
};

export default ScheduleGrid;