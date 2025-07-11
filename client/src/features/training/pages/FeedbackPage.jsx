import { useCallback, useEffect, useRef, useState } from "react";
import {
    Typography,
} from "@mui/material";
import PageLayout from "layouts/PageLayout";
import SuccessDialog from "shared/dialogs/SuccessDialog";
import ConfirmationDialog from "shared/dialogs/ConfirmationDialog";
import { acknowledgeFeedback, getMyFeedbacks } from "../services/feedbackService";
import FeedbackUserList from "../components/FeedbackUserList";
import DialogButton from "shared/buttons/DialogButton";
import LoadingCard from "shared/ui/LoadingCard";
import PageTitle from "layouts/PageTitle";

const FeedbackPage = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(5);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [feedbackToAcknowledge, setFeedbackToAcknowledge] = useState(null);
    const [acknowledgeLoading, setAcknowledgeLoading] = useState(false);
    const [acknowledgeSuccess, setAcknowledgeSuccess] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    const bottomRef = useRef(null);

    const fetchFeedbacks = useCallback(async (requestedPage = 1, reset = false) => {
        const setLoadingState = reset ? setLoading : setLoadingMore;
        setLoadingState(true);

        try {
            const data = await getMyFeedbacks(requestedPage, pageSize);

            setFeedbacks(prev => reset ? data : [...prev, ...data]);
            setPage(prev => reset ? 2 : prev + 1);
            setHasMore(data.length === pageSize);

            if (!reset && bottomRef.current) {
                bottomRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        } catch (err) {
            console.error("Erro ao carregar feedbacks:", err);
        } finally {
            setLoadingState(false);
        }
    }, [pageSize]);

    useEffect(() => {
        fetchFeedbacks(1, true);
    }, [refreshKey, fetchFeedbacks]);

    const handleRequestAcknowledge = (id) => {
        setFeedbackToAcknowledge(id);
    };

    const handleConfirmAcknowledge = async () => {
        setAcknowledgeLoading(true);
        await acknowledgeFeedback(feedbackToAcknowledge);
        setAcknowledgeSuccess(true);
        setFeedbackToAcknowledge(null);
        setRefreshKey((prev) => prev + 1);
        setAcknowledgeLoading(false);
    };

    const handleCloseSuccessDialog = () => {
        setAcknowledgeSuccess(false);
    };

    return (
        <PageLayout>
            <PageTitle>
                Feedbacks Recebidos
            </PageTitle>

            {loading ? (
                <LoadingCard />
            ) : feedbacks.length === 0 ? (
                <Typography className="text-center text-gray-500">
                    Nenhum feedback recebido.
                </Typography>
            ) : (
                <>
                    <FeedbackUserList
                        feedbacks={feedbacks}
                        onAcknowledgeRequest={handleRequestAcknowledge}
                    />
                    <div ref={bottomRef} />
                </>
            )}

            {!loading && hasMore && (
                <div className="text-center mt-4">
                    <DialogButton
                        onClick={() => fetchFeedbacks(page)}
                        loading={loadingMore}
                        disabled={loadingMore}
                        variant="secondary"
                        fullWidthOnMobile={false}
                    >
                        Ver mais feedbacks
                    </DialogButton>
                </div>
            )}

            {feedbackToAcknowledge && (
                <ConfirmationDialog
                    message="Tem certeza que deseja marcar este feedback como lido?"
                    onConfirm={handleConfirmAcknowledge}
                    onCancel={() => setFeedbackToAcknowledge(null)}
                    loading={acknowledgeLoading}
                />
            )}

            {acknowledgeSuccess && (
                <SuccessDialog
                    message="Feedback marcado como lido com sucesso!"
                    onClose={handleCloseSuccessDialog}
                />
            )}

        </PageLayout>
    );
};

export default FeedbackPage;
