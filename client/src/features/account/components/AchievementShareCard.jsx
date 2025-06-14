import logoBP from 'assets/logo-white.png';
import heart from 'assets/heart.png';
import biceps from 'assets/biceps.png';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

dayjs.locale('pt-br');

const AchievementShareCard = ({ title, description, achievedAt, icon }) => {
    const formattedDate = achievedAt
        ? dayjs(achievedAt).format("DD [de] MMMM [de] YYYY")
        : "";

    return (
        <div className="flex flex-col items-center">
            <div
                className="w-[360px] h-[640px] px-6 py-10 shadow-xl text-white flex flex-col justify-between text-center overflow-hidden bg-gradient-to-br from-[#b8c3dc] to-[#523288]">
                <div className="flex flex-col items-center justify-between h-full mb-5">

                    <div className="flex flex-col items-center">
                        <img src={logoBP} alt="Logo" className="h-20 p-2 mb-4" />

                        <h2 className="text-3xl font-bold text-white mb-2">
                            Nova conquista!
                        </h2>

                        <p className="text-base px-6 leading-relaxed text-gray-200 mb-10">
                            {description}
                        </p>

                        <div className="w-40 h-40 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-purple-300 mb-4">
                            <img
                                src={icon}
                                alt={title}
                                className="w-36 h-36 rounded-full object-contain"
                            />
                        </div>

                        <p className="text-xl font-bold text-white pt-4 pb-2">
                            {title}
                        </p>

                        {formattedDate && (
                            <p className="text-sm text-gray-300">
                                {formattedDate}
                            </p>
                        )}
                    </div>

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

export default AchievementShareCard;
