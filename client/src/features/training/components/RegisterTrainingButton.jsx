import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "shared/routes/routes";

const RegisterTrainingButton = () => {
    const navigate = useNavigate();

    return (
        <div
            className="fixed bottom-6 right-6 bg-blue text-white p-4 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-all"
            onClick={() => navigate(ROUTES.training)}
        >
            <span className="text-2xl md:text-3xl"><FaPlus /></span>
        </div>
    );
};

export default RegisterTrainingButton;
