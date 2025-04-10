import { PlusIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "shared/routes/routes";

const RegisterTrainingButton = () => {
    const navigate = useNavigate();

    return (
        <div
            className="fixed bottom-6 right-6 bg-gradient-to-tr from-[#6C3DB4] to-[#9B6CF3] text-white p-4 rounded-full shadow-[0_6px_20px_rgba(108,61,180,0.35)] cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
            onClick={() => navigate(ROUTES.training)}
        >
            <PlusIcon className="w-6 h-6" strokeWidth={2.5} />
        </div>
    );
};

export default RegisterTrainingButton;
