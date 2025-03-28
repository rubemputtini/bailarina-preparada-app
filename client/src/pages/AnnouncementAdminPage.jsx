import { useState } from 'react';
import { Typography } from '@mui/material';
import AnnouncementForm from '../components/announcement/AnnouncementForm';
import AnnouncementPreview from '../components/announcement/AnnouncementPreview';
import AnnouncementList from '../components/announcement/AnnouncementList';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import SuccessDialog from '../components/dialogs/SuccessDialog';
import ConfirmationDialog from '../components/dialogs/ConfirmationDialog';
import { deleteAnnouncement } from '../services/announcementService';

const AnnouncementAdminPage = () => {
    const [previewData, setPreviewData] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [showDialog, setShowDialog] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteTargetId, setDeleteTargetId] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleSuccess = (message) => {
        setSuccessMessage(message);
        setShowDialog(true);
        setRefreshKey((prev) => prev + 1);
    };

    const handleRequestDelete = (announcementId) => {
        setDeleteTargetId(announcementId);
        setShowConfirm(true);
    };

    const handleConfirmDelete = async () => {
        if (!deleteTargetId) return;
        setDeleting(true);
        await deleteAnnouncement(deleteTargetId);
        setShowConfirm(false);
        setDeleting(false);
        setRefreshKey((prev) => prev + 1);
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#0f0f1a] text-white">
            <Nav />
            <main className="flex-grow px-4 md:px-8 py-5">
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: "800",
                        textAlign: "center",
                        background: "linear-gradient(90deg, #ffffff 0%, #c5e1e9 60%, #c5e1e9 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        marginBottom: "24px",
                        fontSize: { xs: "2rem", md: "2.5rem" },
                    }}
                >
                    Central de Avisos
                </Typography>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-xl p-5 shadow-md">
                            <Typography variant="h6" className="font-semibold text-gray-800" sx={{ marginBottom: "0.5em" }}>
                                Criar Novo Aviso
                            </Typography>
                            <AnnouncementForm
                                onPreviewChange={setPreviewData}
                                onSuccess={handleSuccess}
                            />
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl p-5 shadow-md">
                            <Typography variant="h6" className="font-semibold text-gray-800" sx={{ marginBottom: "0.5em" }}>
                                Pré-visualização
                            </Typography>
                            <AnnouncementPreview data={previewData} />
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <AnnouncementList
                        onDeleteRequest={handleRequestDelete}
                        refreshKey={refreshKey}
                    />
                </div>
            </main>

            {showDialog && (
                <SuccessDialog
                    message={successMessage}
                    onClose={() => setShowDialog(false)}
                />
            )}

            {showConfirm && (
                <ConfirmationDialog
                    message="Tem certeza que deseja excluir este aviso?"
                    onConfirm={handleConfirmDelete}
                    onCancel={() => setShowConfirm(false)}
                    isLoading={deleting}
                />
            )}

            <Footer />
        </div>
    );
};

export default AnnouncementAdminPage;
