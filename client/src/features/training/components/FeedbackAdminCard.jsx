import { CheckCircleIcon, ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { trainingCategories, getCategoryColor } from "shared/utils/constants";
import { Tooltip } from "@mui/material";

const FeedbackAdminCard = ({ feedback, onReply, onResolve }) => {
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
                    <div className="w-6 h-6 group-hover:scale-110 transition-transform">
                        {icon}
                    </div>
                    <span className="text-base font-extrabold tracking-tight text-gray-900">
                        {feedback.category}
                    </span>
                </div>

                <p className="text-sm text-gray-900/80 mb-1">{formattedDate}</p>

                <p className="text-[15px] text-gray-900 leading-relaxed mt-2">
                    <span className="font-semibold text-gray-900">{feedback.userName}:</span>{" "}
                    <span className="italic text-[16px] text-gray-800/90 tracking-tight">
                        “{feedback.observation}”
                    </span>
                </p>
            </div>

            <div className="flex flex-row gap-2 items-center justify-center ml-4">
                <Tooltip title="Responder" arrow>
                    <button
                        onClick={onReply}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-500 to-slate-600 text-white flex items-center justify-center shadow-md hover:scale-110 hover:drop-shadow-lg transition"
                    >
                        <ChatBubbleBottomCenterTextIcon className="w-5 h-5" />
                    </button>
                </Tooltip>

                <Tooltip title="Resolver" arrow>
                    <button
                        onClick={onResolve}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white flex items-center justify-center shadow-md hover:scale-110 hover:drop-shadow-lg transition"
                    >
                        <CheckCircleIcon className="w-5 h-5" />
                    </button>
                </Tooltip>
            </div>
        </div>
    );
};

export default FeedbackAdminCard;