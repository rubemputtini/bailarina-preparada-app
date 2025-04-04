import { Card, CardContent, Typography, Avatar } from '@mui/material';
import { FaCrown } from "react-icons/fa";
import trophy from '../../../assets/trophy.png';
import LoadingCard from 'shared/ui/LoadingCard';

const medals = ["🥇", "🥈", "🥉"];

const RankingTop5Card = ({ ranking, loading }) => {
    return (
        <Card className="bg-gradient-to-b from-purple-100 via-white to-white shadow-xl rounded-2xl lg:col-span-1">
            <CardContent>
                <div className="flex items-center mb-2">
                    <img src={trophy} alt="Troféu" className="w-6 h-6 mr-2" />
                    <Typography variant="h6" className="font-bold text-gray-800">
                        TOP 5 - {new Date().toLocaleString('pt-BR', { month: 'long' }).toUpperCase()}
                    </Typography>
                </div>
                {loading ? (
                    <LoadingCard marginY={5} />
                ) :
                    ranking.length === 0 ?
                        (
                            <Typography variant="body2" className="text-gray-500">
                                Nenhum treino registrado neste mês ainda.
                            </Typography>
                        ) : (
                            <ul className="space-y-4">
                                {ranking.map((user, index) => {
                                    const isTop1 = index === 0;
                                    const isTop3 = index < 3;

                                    const avatarColor = isTop1
                                        ? '#facc15'
                                        : index === 1
                                            ? '#d1d5db'
                                            : index === 2
                                                ? '#cd7f32'
                                                : '#6b7280'

                                    const bgColor = isTop1
                                        ? 'bg-yellow-50 border border-yellow-200'
                                        : 'bg-gray-100';

                                    return (
                                        <li
                                            key={index}
                                            className={`flex items-center space-x-3 px-3 py-2 rounded-xl shadow-sm ${bgColor}`}
                                        >
                                            <div className="relative">
                                                <Avatar
                                                    sx={{
                                                        bgcolor: avatarColor,
                                                        width: 40,
                                                        height: 40,
                                                        fontSize: '1rem',
                                                        fontWeight: 700,
                                                        color: '#fff'
                                                    }}
                                                >
                                                    {index + 1}
                                                </Avatar>
                                                {isTop3 && (
                                                    <div className="absolute -top-2 -right-2 text-xl">
                                                        {medals[index]}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className={`font-semibold ${isTop1 ? 'text-yellow-600 text-lg flex items-center' : 'text-gray-800'}`}>
                                                    {isTop1 && <FaCrown className="text-yellow-500 mr-1 animate-bounce" />}
                                                    {user.userName}
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    {user.daysTrained} {user.daysTrained === 1 ? 'dia' : 'dias'}
                                                </span>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
            </CardContent>
        </Card>
    );
};

export default RankingTop5Card;
