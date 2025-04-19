import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, IconButton, Tooltip } from '@mui/material';
import { getRecentBirthdays } from 'features/admin/services/adminService';
import LoadingCard from 'shared/ui/LoadingCard';
import cake from 'assets/cake.png';
import partyIcon from 'assets/partypopper.png';
import { FaWhatsapp } from 'react-icons/fa';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const BirthdayCard = () => {
    const [birthdays, setBirthdays] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBirthdays = async () => {
            try {
                const data = await getRecentBirthdays();
                setBirthdays(data);
            } catch (error) {
                console.error("Erro ao buscar aniversariantes:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBirthdays();
    }, []);

    const formatBirthday = (date) => {
        try {
            return format(new Date(date), "d 'de' MMMM", { locale: ptBR });
        } catch {
            return '';
        }
    };

    const formatPhone = (raw) => raw?.replace(/\D/g, '');

    return (
        <Card className="bg-white shadow-xl rounded-2xl lg:col-span-1">
            <CardContent>
                <div className="flex items-center mb-2">
                    <img src={cake} alt="Aniversário" className="w-6 h-6 mr-2" />
                    <Typography variant="h6" className="font-bold text-gray-800">
                        Aniversariantes Recentes
                    </Typography>
                </div>

                {loading ? (
                    <LoadingCard marginY={5} />
                ) : birthdays.length === 0 ? (
                    <Typography variant="body2" className="text-gray-500">
                        Nenhum aniversário nos próximos dias.
                    </Typography>
                ) : (
                    <ul className="space-y-2">
                        {birthdays.map((user, index) => {
                            const isTodayBirthday = user.daysUntilBirthday === 0;
                            const initials = user.name.charAt(0).toUpperCase();

                            return (
                                <li
                                    key={index}
                                    className={`relative flex items-center justify-between px-4 py-3 rounded-xl shadow-sm transition-all ${isTodayBirthday
                                        ? 'bg-gradient-to-r from-purple-100 to-violet-100 border border-violet-300 animate-fade-in'
                                        : 'bg-gray-100'
                                        }`}
                                >
                                    <div className="flex items-center space-x-3">
                                        <div
                                            className={`w-10 h-10 min-w-[2.5rem] min-h-[2.5rem] shrink-0 rounded-full text-white flex items-center justify-center font-bold tracking-wide shadow-inner ${isTodayBirthday
                                                ? 'bg-gradient-to-tr from-pink-400 via-purple-500 to-yellow-400 animate-gradient-pulse'
                                                : 'bg-gradient-to-tr from-purple-400 to-purple-600'
                                                }`}
                                        >
                                            {initials}
                                        </div>

                                        <div className="flex flex-col">
                                            <span className="font-semibold text-gray-800 flex flex-col">
                                                {user.name}
                                                {isTodayBirthday && (
                                                    <span className="self-start mt-1 px-2 py-0.5 rounded-full text-xs font-semibold text-purple-800 bg-purple-200 animate-bounce">
                                                        <img src={partyIcon} alt="Bolo de aniversário" className="inline w-5 h-5 mr-1 -mt-1" /> HOJE
                                                    </span>
                                                )}
                                            </span>
                                            <span className="text-sm text-gray-600 leading-tight">
                                                {`${formatBirthday(user.dateOfBirth)} — ${user.age} anos`}
                                            </span>
                                        </div>
                                    </div>

                                    {user.phoneNumber && (
                                        <Tooltip title="Enviar mensagem no WhatsApp" arrow>
                                            <IconButton
                                                size="small"
                                                className={`hover:scale-105 transition-transform ${isTodayBirthday ? 'animate-pulse' : ''
                                                    }`}
                                                onClick={() =>
                                                    window.open(`https://wa.me/${formatPhone(user.phoneNumber)}`, '_blank')
                                                }
                                            >
                                                <FaWhatsapp className="text-green-500 text-2xl" />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                </li>
                            );
                        })}
                    </ul>

                )}
            </CardContent>
        </Card>
    );
};

export default BirthdayCard;
