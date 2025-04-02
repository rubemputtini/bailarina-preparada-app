import { AccountCircle, Today, CalendarMonth } from "@mui/icons-material";

const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString("pt-BR");

const EvaluationSummary = ({ name, date, nextDate }) => {
    return (
        <div className="bg-gray-800 rounded-2xl p-4 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm md:text-base shadow-md">
            <div className="flex items-center gap-2 justify-center">
                <AccountCircle />
                <span><strong>Nome:</strong> {name}</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
                <Today />
                <span><strong>Data:</strong> {formatDate(date)}</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
                <CalendarMonth />
                <span><strong>Próxima Avaliação:</strong> {nextDate}</span>
            </div>
        </div>
    );
};

export default EvaluationSummary;