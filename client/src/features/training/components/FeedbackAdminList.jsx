import { Box } from '@mui/material';
import FeedbackAdminCard from './FeedbackAdminCard';

const FeedbackAdminList = ({ feedbacks, onReply, onRequestResolve }) => {
    return (
        <Box className="space-y-4">
            {feedbacks.map((f) => (
                <FeedbackAdminCard
                    key={f.feedbackId}
                    feedback={f}
                    onReply={() => onReply(f.feedbackId)}
                    onResolve={() => onRequestResolve(f.feedbackId)}
                />
            ))}
        </Box>
    );
};

export default FeedbackAdminList;