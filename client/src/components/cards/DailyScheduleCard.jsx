import { Card, CardContent, Typography } from '@mui/material'
import { tasksColorsMap } from '../../utils/constants';
import calendar from '../../assets/calendar.png';

const DailyScheduleCard = ({ dailySchedule }) => {
    return (
        <Card className="bg-white text-black shadow-lg lg:col-span-2">
            <CardContent>
                <div className="flex items-center mb-2">
                    <img src={calendar} alt="Calendário" className="w-6 h-6 mr-2" />
                    <Typography variant="h6" className="font-bold text-gray-800">Aulas do Dia</Typography>
                </div>
                {dailySchedule.length > 0 ? (
                    <ul className="space-y-3">
                        {dailySchedule.map((classItem, index) => {
                            const colorClass = tasksColorsMap[classItem.color]?.tailwind || "bg-gray-200 border-gray-400";

                            return (
                                <li
                                    key={index}
                                    className={`p-5 rounded-lg shadow-sm flex justify-between border-l-4 ${colorClass}`}
                                >
                                    <span className="font-medium">{classItem.activity}</span>
                                    <span className="text-sm">{classItem.period}</span>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <Typography variant="body2" className="text-gray-500">Nenhuma aula agendada para hoje.</Typography>
                )}
            </CardContent>
        </Card>
    )
}

export default DailyScheduleCard;