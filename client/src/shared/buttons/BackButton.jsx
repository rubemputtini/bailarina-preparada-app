import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const BackButton = ({ to = -1 }) => {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(to)}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white mb-4 shadow hover:scale-105 transition"
            title="Voltar"
        >
            <ArrowLeftIcon className="w-5 h-5" />
        </button>
    );
};

export default BackButton;
