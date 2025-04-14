import logo from 'assets/logo.png';
import heart from 'assets/heart.png';
import biceps from 'assets/biceps.png';
import { trainingCategories, getCategoryColor } from 'shared/utils/constants';
import useUserGoal from 'hooks/useUserGoal';
import dayjs from 'dayjs';

const ShareImageCard = ({ category = 'FORÇA', trainingDaysCount = 0 }) => {
    const currentYear = dayjs().year();
    const { goal, loading } = useUserGoal(currentYear, trainingDaysCount);
    const categoryInfo = trainingCategories.find((c) => c.name === category);
    const categoryColor = getCategoryColor(category);

    return (
        <div className="flex flex-col items-center">
            <div
                className="w-[360px] h-[640px] px-6 py-10 shadow-xl text-white flex flex-col justify-between text-center overflow-hidden bg-gradient-to-br from-[#1b1536] to-[#3c1e78]">
                <div className="flex flex-col items-center justify-between h-full mb-5" >
                    <div className="flex flex-col items-center">
                        <img src={logo} alt="Logo" className="h-28 rounded-full bg-white/10 p-2 mb-4" />

                        <h2 className="text-3xl font-bold text-white mb-2">Treino feito! 💪</h2>

                        <p className="text-base px-6 leading-relaxed text-white mb-7">
                            Finalizei mais um treino com o <span className="font-semibold">Clube Bailarina Preparada</span>
                        </p>

                        <div
                            className="flex flex-col items-center justify-center px-4 py-2 rounded-[20px] min-h-[80px] min-w-[120px] text-[#1E1E1E] shadow-[0_4px_10px_rgba(0,0,0,0.1)]"
                            style={{
                                backgroundColor: categoryColor,
                            }}
                        >
                            {categoryInfo?.icon}
                            <p className="mt-1 font-semibold text-[13px] text-[#1E1E1E]">{category}</p>
                        </div>
                    </div>

                    {!loading && goal && (
                        <div className="mb-6">
                            <p className="text-5xl font-extrabold text-white mb-1">
                                {trainingDaysCount}
                            </p>
                            <p className="text-sm text-gray-300">
                                de <span className="font-semibold">{goal.goalDays}</span> treinos este ano
                            </p>
                        </div>
                    )}

                    <div className="flex flex-col items-center gap-2">
                        <p className="text-base font-medium text-white flex items-center gap-2">
                            Constância e Paciência <img src={heart} alt="Coração" className="w-5 h-5" />
                            <img src={biceps} alt="Bíceps" className="w-5 h-5" />
                        </p>
                        <p className="text-sm text-gray-300">@bailarinapreparada</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShareImageCard;