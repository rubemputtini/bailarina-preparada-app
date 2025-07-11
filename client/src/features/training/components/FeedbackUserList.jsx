import FeedbackCard from "./FeedbackCard";

const FeedbackUserList = ({ feedbacks, onAcknowledgeRequest }) => {
    return (
        <div className="space-y-4">
            {feedbacks.map((f) => (
                <FeedbackCard
                    key={f.feedbackId}
                    feedback={f}
                    onAcknowledge={onAcknowledgeRequest}
                />
            ))}
        </div>
    );
};

export default FeedbackUserList;
