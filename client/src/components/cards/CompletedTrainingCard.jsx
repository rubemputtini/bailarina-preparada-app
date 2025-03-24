import { Card, CardContent, Typography, LinearProgress } from '@mui/material'
import target from '../../assets/target.png';
import partypopper from '../../assets/partypopper.png';

const CompletedTrainingCard = ({ trainingDaysCount, daysGoal }) => {
    return (
        <Card className="bg-white text-black shadow-lg lg:col-span-2">
            <CardContent>
                <div className="flex items-center mb-2">
                    <img src={target} alt="Alvo" className="w-6 h-6 mr-2" />
                    <Typography variant="h6" className="font-bold text-gray-800">Dias Treinados no Ano</Typography>
                </div>
                <Typography variant="h4" className="font-bold text-blue-500">{trainingDaysCount}</Typography>
                <Typography variant="body2" className="text-gray-600">Meta: {daysGoal} dias</Typography>
                <LinearProgress variant="determinate" value={(trainingDaysCount / daysGoal) * 100} className="mt-3 h-3 rounded-lg" />
                <Typography variant="body2" className="text-gray-600 mt-2">
                    {trainingDaysCount >= daysGoal ? (
                        <>
                            Meta atingida!
                            <img src={partypopper} alt="Comemoração" className="inline w-5 h-5 ml-1" />
                        </>
                    ) : `Continue treinando! Faltam ${daysGoal - trainingDaysCount} dias.`}

                </Typography>
            </CardContent>
        </Card>
    )
}

export default CompletedTrainingCard;