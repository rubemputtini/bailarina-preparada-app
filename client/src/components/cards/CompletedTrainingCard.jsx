import { Card, CardContent, Typography, LinearProgress } from '@mui/material'

const CompletedTrainingCard = ({ trainingDaysCount, daysGoal }) => {
    return (
        <Card className="bg-white text-black shadow-lg lg:col-span-2">
            <CardContent>
                <Typography variant="h6" className="font-bold text-gray-800" style={{ marginBottom: "0.5em" }}>🎯 Dias Treinados no Ano</Typography>
                <Typography variant="h4" className="font-bold text-blue-500">{trainingDaysCount}</Typography>
                <Typography variant="body2" className="text-gray-600">Meta: {daysGoal} dias</Typography>
                <LinearProgress variant="determinate" value={(trainingDaysCount / daysGoal) * 100} className="mt-3 h-3 rounded-lg" />
                <Typography variant="body2" className="text-gray-600 mt-2">
                    {trainingDaysCount >= daysGoal ? "Meta atingida! 🎉" : `Continue treinando! Faltam ${daysGoal - trainingDaysCount} dias.`}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default CompletedTrainingCard;