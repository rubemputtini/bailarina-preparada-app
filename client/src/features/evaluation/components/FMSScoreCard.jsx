const FMSScoreCard = ({ totalFMSScore }) => (
    <div className="max-w-2xl mx-auto bg-purple-50 border border-purple-200 text-purple-900 rounded-2xl p-6 mb-8 shadow-sm">
        <h3 className="text-xl text-purple-900 font-semibold mb-2 text-center">
            Avaliação de Movimento Funcional (FMS)
        </h3>
        <p className="text-sm text-gray-700 text-center mb-4">
            O FMS (<span className="italic">Functional Movement Screen</span>) avalia padrões de movimento com notas de <strong>0 a 3</strong>.
        </p>
        <p className="text-sm text-gray-700 text-center mb-3">
            Critérios analisados:
        </p>
        <p className="text-sm text-gray-600 text-center font-semibold mb-5">
            Mobilidade, Estabilidade, Postura e Dor/Incômodo
        </p>
        <div className="flex flex-col items-center gap-2 text-md mb-5 text-center">
            <span className="flex items-center gap-1 text-yellow-700 font-medium">
                ⚠️ Risco de lesão: 14 ou menos
            </span>
            <span className="flex items-center gap-1 text-green-700 font-medium">
                ✅ Ideal: 14 ou mais
            </span>
        </div>
        <p className="text-center text-xl font-bold text-purple-800">
            O seu total foi de {totalFMSScore} pontos!
        </p>
    </div>
);

export default FMSScoreCard;