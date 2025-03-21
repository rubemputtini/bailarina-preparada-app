import { Card, CardContent, Typography, Avatar } from '@mui/material'
import { FaMedal } from "react-icons/fa";

const RankingTop5Card = ({ ranking }) => {
    return (
        <Card className="bg-white text-black shadow-lg lg:col-span-1">
            <CardContent>
                <Typography variant="h6" className="font-bold text-gray-800" style={{ marginBottom: "0.5em" }}>🏆 TOP 5 - {new Date().toLocaleString('pt-BR', { month: 'long' }).toUpperCase()}</Typography>
                <ul className="space-y-3">
                    {ranking.map((user, index) => (
                        <li key={index} className="flex items-center space-x-3 p-2 bg-gray-100 rounded-lg shadow-sm">
                            <Avatar className="bg-blue-500 text-white">{index + 1}</Avatar>
                            {index < 3 && <FaMedal className={`${index === 0 ? "text-yellow-500" : index === 1 ? "text-gray-400" : "text-orange-400"} text-lg`} />}
                            <span className={`font-medium ${index === 0 ? "text-yellow-600" : "text-gray-800"}`}>
                                {user.userName}
                            </span>
                            <span className="ml-auto text-gray-600">{user.daysTrained} dias</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}

export default RankingTop5Card;