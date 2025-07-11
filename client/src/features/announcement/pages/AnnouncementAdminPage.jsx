import { useState } from 'react';
import { Typography } from '@mui/material';
import AnnouncementForm from '../components/AnnouncementForm';
import AnnouncementPreview from '../components/AnnouncementPreview';
import AnnouncementList from '../components/AnnouncementList';
import SuccessDialog from 'shared/dialogs/SuccessDialog';
import ConfirmationDialog from 'shared/dialogs/ConfirmationDialog';
import { deleteAnnouncement } from '../services/announcementService';
import PageLayout from 'layouts/PageLayout';
import PageTitle from 'layouts/PageTitle';

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
        <PageLayout>
            <PageTitle>
                Central de Avisos
            </PageTitle>

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
                    loading={deleting}
                />
            )}
        </PageLayout>
    );
};

export default AnnouncementAdminPage;
