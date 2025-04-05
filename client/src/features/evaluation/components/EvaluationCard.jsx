import { CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Badge from "./Badge";
import { ROUTES } from "shared/routes/routes";

const EvaluationCard = ({ evaluation, fmsScore, classification }) => {
    const navigate = useNavigate();

    return (
        <div
            key={evaluation.evaluationId}
            className="bg-white p-5 rounded-2xl shadow-md hover:shadow-2xl transition duration-300 flex flex-col justify-between items-center text-center min-w-72"
        >
            <div className="mb-4 space-y-3">
                <div className="flex items-center justify-center text-purple-800 gap-2 font-semibold text-base sm:text-lg">
                    <CalendarDays className="w-5 h-5" />
                    {format(new Date(evaluation.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                </div>

                <div className="text-gray-700 gap-2 text-sm sm:text-base">
                    <span className="font-medium">Pontuação FMS: </span>
                </div>
                <div className="text-gray-700 font-extrabold text-xl">{fmsScore}</div>

                <div className="text-gray-700 gap-2 text-sm sm:text-base">
                    <span className="font-medium">Capacidades Físicas:</span>
                </div>
                <Badge classification={classification} />
            </div>

            <button
                className="bg-purple-700 text-white py-2 px-4 rounded-xl font-bold hover:bg-purple-800 transition text-sm mt-2 w-full"
                onClick={() => navigate(ROUTES.evaluationDetail(evaluation.evaluationId))}
            >
                VER DETALHES
            </button>
        </div>
    );
};

export default EvaluationCard;
