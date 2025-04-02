import { classificationStyles } from "../../utils/classificationUtils";

const getClassificationColor = (classification) => {
    if (!classification) return "text-gray-400 bg-gray-200";

    const formatted = classification.trim().toLowerCase();
    return classificationStyles[formatted] || "text-gray-600 bg-gray-100";
};

const Badge = ({ classification }) => {
    const badgeColor = getClassificationColor(classification);

    return (
        <span className={`inline-block mt-2 px-3 py-1 rounded-full text-lg font-semibold ${badgeColor}`}>
            {classification}
        </span>
    );
};

export default Badge;