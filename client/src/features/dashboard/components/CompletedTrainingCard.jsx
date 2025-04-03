import { useState } from 'react';
import {
    Card,
    CardContent,
    CircularProgress,
    Typography,
    LinearProgress,
    IconButton,
    Box
} from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import target from '../../../assets/target.png';
import partypopper from '../../../assets/partypopper.png';
import useUserGoal from 'hooks/useUserGoal';
import GoalDialog from './GoalDialog';
import SuccessDialog from 'shared/dialogs/SuccessDialog';

const CompletedTrainingCard = ({ trainingDaysCount }) => {
    const currentYear = new Date().getFullYear();
    const { goal, loading, notFound, progress, saveGoal } = useUserGoal(currentYear, trainingDaysCount);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    const progressValue = Math.min(progress, 100);

    if (loading) {
        return (
            <Card className="bg-white text-black shadow-lg lg:col-span-2">
                <CardContent>
                    <Box display="flex" justifyContent="center" my={10}>
                        <CircularProgress size={24} color="inherit" />
                    </Box>
                </CardContent>
            </Card>
        );
    }

    if (notFound || !goal) {
        return (
            <>
                <Card className="bg-white text-black shadow-lg lg:col-span-2">
                    <CardContent className="px-5 py-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center">
                                <img src={target} alt="Alvo" className="w-5 h-5 mr-2" />
                                <Typography variant="h6" className="font-bold text-gray-800">
                                    Dias Treinados em {currentYear}
                                </Typography>
                            </div>
                        </div>

                        <div
                            onClick={() => setDialogOpen(true)}
                            className="cursor-pointer bg-gradient-to-r from-[#6B21A8] to-[#4c1d95] text-white p-5 rounded-xl shadow-lg hover:brightness-110 transition-all duration-200 text-center"
                        >
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                                Voce ainda não definiu sua meta!
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1, fontSize: '0.75rem', opacity: 0.95 }}>
                                Clique aqui para escolher quantos dias você quer treinar em {currentYear}.
                            </Typography>
                        </div>
                    </CardContent>
                </Card>

                <GoalDialog
                    open={dialogOpen}
                    onClose={() => setDialogOpen(false)}
                    currentGoal=""
                    onSave={async (value) => {
                        await saveGoal(value);
                        setDialogOpen(false);
                        setSuccessDialogOpen(true);
                    }}
                />

                {successDialogOpen && (
                    <SuccessDialog
                        message="Meta registrada com sucesso!"
                        onClose={() => setSuccessDialogOpen(false)}
                    />
                )}
            </>
        );
    }

    return (
        <>
            <Card className="bg-white text-black shadow-lg lg:col-span-2">
                <CardContent className="px-5 py-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center">
                            <img src={target} alt="Alvo" className="w-5 h-5 mr-2" />
                            <Typography variant="h6" className="font-bold text-gray-800">
                                Dias Treinados em {currentYear}
                            </Typography>
                        </div>
                        <IconButton size="small" onClick={() => setDialogOpen(true)}>
                            <EditNoteIcon className="text-[#6B21A8] hover:text-[#4c1d95]" />
                        </IconButton>
                    </div>

                    <div className="flex justify-center items-baseline gap-2 mb-1">
                        <Typography variant="h2" className="text-[#6B21A8] font-extrabold leading-none">
                            {trainingDaysCount}
                        </Typography>
                        <Typography variant="subtitle1" className="text-gray-600 font-medium">
                            / {goal.goalDays}
                        </Typography>
                    </div>

                    <LinearProgress
                        variant="determinate"
                        value={progressValue}
                        className="h-3 rounded-lg bg-gray-200"
                        sx={{ '& .MuiLinearProgress-bar': { backgroundColor: '#6B21A8' } }}
                    />

                    <Typography variant="body1" className="text-center text-gray-600" sx={{ marginTop: "1em" }}>
                        {trainingDaysCount === goal.goalDays ? (
                            <>
                                Meta atingida!
                                <img src={partypopper} alt="🎉" className="inline w-5 h-5 ml-1 align-middle" />
                            </>
                        ) : trainingDaysCount > goal.goalDays ? (
                            <>
                                Você superou sua meta! 👏
                                <img src={partypopper} alt="🎉" className="inline w-5 h-5 ml-1 align-middle" />
                            </>
                        ) : (
                            `Faltam ${goal.goalDays - trainingDaysCount} dias para sua meta.`
                        )}
                    </Typography>
                </CardContent>
            </Card>

            <GoalDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                currentGoal={goal?.goalDays || ''}
                onSave={async (value) => {
                    await saveGoal(value);
                    setDialogOpen(false);
                    setSuccessDialogOpen(true);
                }}
            />

            {successDialogOpen && (
                <SuccessDialog
                    message="Meta registrada com sucesso!"
                    onClose={() => setSuccessDialogOpen(false)}
                />
            )}
        </>
    );
};

export default CompletedTrainingCard;