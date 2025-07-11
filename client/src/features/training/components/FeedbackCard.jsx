import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { trainingCategories, getCategoryColor } from "shared/utils/constants";

const FeedbackCard = ({ feedback, onAcknowledge }) => {
    const color = getCategoryColor(feedback.category);
    const category = trainingCategories.find((c) => c.name === feedback.category);
    const icon = category?.icon;

    const formattedDate = new Date(feedback.trainingDate).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

    return (
        <div
            className="rounded-2xl p-5 flex justify-between items-start shadow-sm"
            style={{
                backgroundColor: color,
                border: "1.5px solid rgba(0, 0, 0, 0.1)",
            }}
        >
            <div className="flex-1">
                <div className="group flex items-center gap-2 mb-2 transition-all duration-200">
                    <div className="w-6 h-6 group-hover:scale-110 transition-transform">{icon}</div>
                    <span className="text-base font-extrabold tracking-tight text-gray-900">
                        {feedback.category}
                    </span>
                </div>

                <p className="text-sm text-gray-900/80 mb-1">
                    {formattedDate}
                </p>

                <p className="text-[15px] text-gray-900 leading-relaxed mt-2">
                    <span className="font-semibold text-gray-900">Isabella:</span>{" "}
                    <span className="italic text-[16px] text-gray-800/90 tracking-tight">
                        “{feedback.message}”
                    </span>
                </p>

            </div>

            <button
                onClick={() => onAcknowledge(feedback.feedbackId)}
                className="ml-4 mt-1 w-7 h-7 rounded-full flex items-center justify-center bg-white hover:bg-emerald-50 transition"
            >
                <CheckCircleIcon
                    className="w-7 h-7 text-emerald-500"
                    style={{ transform: "scale(1.15)" }}
                />
            </button>

        </div>
    );
};

export default FeedbackCard;
