const TrainingStatsCard = ({ days, trainings }) => {
    return (
        <div className="bg-gradient-to-br from-[#2a1c3f] to-[#1e1e2e] p-6 rounded-2xl shadow-xl animate-fade-in text-center">
            <p className="text-xs uppercase text-purple-300 mb-3 tracking-widest">Resumo anual</p>
            <div className="flex flex-row justify-center gap-6">
                <div>
                    <p className="text-white text-5xl font-extrabold leading-tight">{days}</p>
                    <p className="text-sm text-gray-400">dias de treino</p>
                </div>
                <div className="w-px bg-purple-800" />
                <div>
                    <p className="text-white text-5xl font-extrabold leading-tight">{trainings}</p>
                    <p className="text-sm text-gray-400">treinos totais</p>
                </div>
            </div>
        </div>
    );
};

export default TrainingStatsCard;
