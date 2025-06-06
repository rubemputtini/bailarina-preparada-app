const PhysicalScoreCard = ({ averageClassification }) => (
    <div className="max-w-2xl mx-auto bg-purple-50 border border-purple-200 text-purple-900 rounded-2xl p-6 mb-8 shadow-sm">
        <h3 className="text-xl text-purple-900 font-semibold mb-2 text-center">
            Avaliação das Capacidades Físicas
        </h3>

        <p className="text-sm text-gray-700 text-center mb-4">
            Este teste avalia diferentes capacidades físicas através do número <strong>máximo</strong> de repetições completas.
        </p>

        <p className="text-sm text-gray-700 text-center mb-3">
            Critérios analisados:
        </p>

        <p className="text-sm text-gray-600 text-center font-semibold mb-5">
            Força, Resistência, Cardio e Equilíbrio
        </p>

        <p className="text-md text-green-700 font-medium mb-5 text-center">
            Quanto maior o número de repetições, melhor o preparo físico geral.
        </p>
        <div className="text-center text-xl font-bold text-purple-800">
            A sua classificação geral foi {averageClassification}!
        </div>
    </div>
);

export default PhysicalScoreCard;
