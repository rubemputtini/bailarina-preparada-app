import { useEffect, useState, useCallback, useRef } from 'react';
import PageLayout from 'layouts/PageLayout';
import SuccessDialog from 'shared/dialogs/SuccessDialog';
import ConfirmationDialog from 'shared/dialogs/ConfirmationDialog';
import FeedbackReplyDialog from '../components/FeedbackReplyDialog';
import { acknowledgeFeedback, getPendingFeedbacks, replyToFeedback } from '../services/feedbackService';
import FeedbackAdminList from '../components/FeedbackAdminList';
import PageTitle from 'layouts/PageTitle';
import LoadingCard from 'shared/ui/LoadingCard';
import { Pagination, Typography } from '@mui/material';
import SearchField from 'features/admin/components/SearchField';
import useDebounce from 'shared/services/useDebounce';
import CategorySelect from 'shared/forms/CategorySelect';

const FeedbackAdminPage = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const [totalFeedbacks, setTotalFeedbacks] = useState(0);
    const [loading, setLoading] = useState(true);
    const [feedbackToResolve, setFeedbackToResolve] = useState(null);
    const [resolveLoading, setResolveLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [replyId, setReplyId] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 400);
    const [categoryFilter, setCategoryFilter] = useState("");

    const bottomRef = useRef(null);

    const fetchFeedbacks = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getPendingFeedbacks(page, pageSize, debouncedSearchTerm, categoryFilter);
            setFeedbacks(data.feedbacks);
            setTotalFeedbacks(data.totalFeedbacks);
        } catch (err) {
            console.error("Erro ao carregar feedbacks:", err);
        } finally {
            setLoading(false);
        }
    }, [page, pageSize, debouncedSearchTerm, categoryFilter]);

    useEffect(() => {
        fetchFeedbacks();
    }, [refreshKey, page, fetchFeedbacks]);

    const handleRequestResolve = (id) => {
        setFeedbackToResolve(id);
    };

    const handleConfirmResolve = async () => {
        setResolveLoading(true);
        await acknowledgeFeedback(feedbackToResolve);
        setSuccessMessage("Feedback resolvido com sucesso!");
        setShowSuccess(true);
        setFeedbackToResolve(null);
        setRefreshKey((prev) => prev + 1);
        setResolveLoading(false);
    };

    const handleOpenReply = (id) => setReplyId(id);

    const handleReplySubmit = async (message) => {
        await replyToFeedback(replyId, { message });
        setReplyId(null);
        setSuccessMessage("Resposta enviada com sucesso!");
        setShowSuccess(true);
        setRefreshKey((prev) => prev + 1);
    };

    return (
        <PageLayout>
            <PageTitle>
                Feedbacks Recebidos
            </PageTitle>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div className="mx-auto md:mx-0">
                    <SearchField
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="mx-auto md:mx-0">
                    <CategorySelect value={categoryFilter} onChange={setCategoryFilter} />
                </div>
            </div>

            {loading ? (
                <LoadingCard />
            ) : feedbacks.length === 0 ? (
                <Typography className="text-center text-gray-500">
                    Nenhum feedback pendente.
                </Typography>
            ) : (
                <>
                    <FeedbackAdminList
                        feedbacks={feedbacks}
                        onReply={handleOpenReply}
                        onRequestResolve={handleRequestResolve}
                    />
                    <Pagination
                        count={Math.ceil(totalFeedbacks / pageSize)}
                        page={page}
                        onChange={(e, value) => setPage(value)}
                        shape="rounded"
                        siblingCount={1}
                        boundaryCount={1}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            mt: 6,
                            "& .MuiPaginationItem-root": {
                                color: "#c5e1e9",
                                backgroundColor: "transparent",
                                border: "1px solid #c5e1e9",
                                fontWeight: 600,
                                fontFamily: "Montserrat",
                                minWidth: "40px",
                                height: "40px",
                                borderRadius: "12px",
                                transition: "all 0.3s ease",
                            },
                            "& .MuiPaginationItem-root:hover": {
                                backgroundColor: "#c5e1e9",
                                color: "#1a1a2b",
                                borderColor: "#c5e1e9",
                            },
                            "& .Mui-selected": {
                                backgroundColor: "#ffffff",
                                color: "#4a148c",
                                borderColor: "#ffffff",
                                boxShadow: "0 0 0 2px #9575cd",
                            },
                            "& .Mui-selected:hover": {
                                backgroundColor: "#ffffff",
                                color: "#4a148c",
                            },
                            "& .MuiPaginationItem-ellipsis": {
                                color: "#c5e1e9",
                            },
                            "& .MuiPaginationItem-icon": {
                                color: "#c5e1e9",
                            },
                        }}
                    />

                    <div ref={bottomRef} />
                </>
            )}

            {feedbackToResolve && (
                <ConfirmationDialog
                    message="Tem certeza que deseja marcar este feedback como resolvido?"
                    onConfirm={handleConfirmResolve}
                    onCancel={() => setFeedbackToResolve(null)}
                    loading={resolveLoading}
                />
            )}

            {replyId && (
                <FeedbackReplyDialog
                    open={!!replyId}
                    onClose={() => setReplyId(null)}
                    onSubmit={handleReplySubmit}
                />
            )}

            {showSuccess && (
                <SuccessDialog
                    message={successMessage}
                    onClose={() => setShowSuccess(false)}
                />
            )}
        </PageLayout>
    );
};

export default FeedbackAdminPage;
