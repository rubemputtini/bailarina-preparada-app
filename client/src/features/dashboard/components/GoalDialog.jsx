import { useState } from "react";
import { CircularProgress } from "@mui/material";

const GoalDialog = ({ open, onClose, currentGoal, onSave }) => {
    const [goal, setGoal] = useState(currentGoal || "");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    if (!open) return null;

    const handleConfirm = async () => {
        const parsedGoal = Number(goal);

        if (!parsedGoal || isNaN(parsedGoal) || parsedGoal < 1 || parsedGoal > 365) {
            setError("Insira um número entre 1 e 365.");
            return;
        }

        setIsLoading(true);
        setError("");
        await onSave(parsedGoal);
        setIsLoading(false);
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex justify-center items-center z-50">
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg max-w-md w-full text-center mx-4 sm:mx-8">
                <h2 className="text-xl font-bold text-gray-800 mb-3">Qual a sua meta para esse ano?</h2>

                <div className="bg-gradient-to-r from-purple-100 to-purple-50 text-gray-800 mb-5 p-4 rounded-xl shadow-sm text-sm leading-relaxed">
                    <p className="font-medium mb-2">Se você deseja treinar:</p>
                    <ul className="space-y-1">
                        <li>
                            <span className="text-lg">🩰</span> <span className="ml-1">2x por semana → aprox. <strong>104 dias</strong></span>
                        </li>
                        <li>
                            <span className="text-lg">💪</span> <span className="ml-1">3x por semana → aprox. <strong>156 dias</strong></span>
                        </li>
                        <li>
                            <span className="text-lg">🔥</span> <span className="ml-1">4x por semana → aprox. <strong>208 dias</strong></span>
                        </li>
                        <li>
                            <span className="text-lg">🏆</span> <span className="ml-1">5x por semana → aprox. <strong>260 dias</strong></span>
                        </li>
                    </ul>
                </div>

                <input
                    type="number"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    min={1}
                    max={365}
                    className={`border-2 ${error ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3 w-full mb-2 text-center text-5xl font-bold text-purple-700 outline-purple-500 transition-all`}
                />

                <p className="text-xs text-gray-500 italic mt-1">
                    Quem treina hoje, dança melhor amanhã 💙
                </p>

                {error && (
                    <p className="text-sm text-red-600 mb-2">{error}</p>
                )}

                <div className="flex justify-center gap-4 flex-col sm:flex-row-reverse mt-2">
                    <button
                        className={`px-4 py-2 text-white rounded-xl w-full sm:w-auto ${isLoading
                            ? "bg-purple-300 cursor-not-allowed"
                            : "bg-purple-600 hover:bg-purple-700"
                            }`}
                        onClick={handleConfirm}
                        disabled={isLoading}
                    >
                        {isLoading ? <CircularProgress size={24} color="inherit" /> : "SALVAR"}
                    </button>

                    <button
                        className="px-4 py-2 border border-gray-400 text-gray-700 rounded-xl w-full sm:w-auto hover:bg-gray-100"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        CANCELAR
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GoalDialog;
