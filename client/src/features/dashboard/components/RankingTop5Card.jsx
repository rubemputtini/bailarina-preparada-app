import { Card, CardContent, Typography } from '@mui/material';
import { FaCrown } from "react-icons/fa";
import trophy from 'assets/trophy.png';
import LoadingCard from 'shared/ui/LoadingCard';
import gold from 'assets/gold.png';
import silver from 'assets/silver.png';
import bronze from 'assets/bronze.png';

const medals = [gold, silver, bronze];

const RankingTop5Card = ({ ranking, loading }) => {
    return (
        <Card className="bg-white shadow-xl rounded-2xl lg:col-span-1">
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
                            <ul className="space-y-2">
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
                                        ? 'bg-yellow-50 border border-yellow-300'
                                        : 'bg-gray-100';

                                    return (
                                        <li
                                            key={index}
                                            className={`flex items-center space-x-3 px-3 py-1.5 rounded-xl shadow-sm ${bgColor}`}
                                        >
                                            <div className="relative">
                                                <div
                                                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-base shadow-md ${isTop3
                                                        ? index === 0
                                                            ? 'ring-2 ring-yellow-500 bg-gradient-to-br from-yellow-300 to-yellow-400 backdrop-blur-sm'
                                                            : index === 1
                                                                ? 'ring-2 ring-gray-400 bg-gradient-to-br from-gray-300 to-gray-400 backdrop-blur-sm'
                                                                : 'ring-2 ring-amber-700 bg-gradient-to-br from-amber-600 to-amber-700 backdrop-blur-sm'
                                                        : ''
                                                        }`}
                                                    style={{
                                                        color: isTop1
                                                            ? '#78350f'
                                                            : index === 1
                                                                ? '#374151'
                                                                : index === 2
                                                                    ? '#3f1d0b'
                                                                    : '#fff',
                                                        backgroundColor: isTop3 ? undefined : avatarColor,
                                                    }}
                                                >
                                                    {index + 1}
                                                </div>

                                                {isTop3 && (
                                                    <img
                                                        src={medals[index]}
                                                        alt={`Medalha ${index + 1}`}
                                                        className="absolute -top-2 -right-2 w-7 h-7 object-contain drop-shadow"
                                                    />
                                                )}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className={`font-medium tracking-tight ${isTop1 ? 'text-lg text-yellow-600 flex items-center' : 'text-gray-900'}`}>
                                                    {user.userName}
                                                    {isTop1 && <FaCrown className="text-yellow-500 ml-1 animate-bounce" />}
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
