import { useState } from "react";
import { sendEvaluationEmail, updatePhotosUrl } from "../services/evaluationService";
import InputDialog from "shared/dialogs/InputDialog";
import useIsAdmin from "hooks/useIsAdmin";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import ConfirmationDialog from "shared/dialogs/ConfirmationDialog";
import SuccessDialog from "shared/dialogs/SuccessDialog";

const PhotosCard = ({ photosUrl: initialUrl, evaluationId }) => {
    const isAdmin = useIsAdmin();
    const [photosUrl, setPhotosUrl] = useState(initialUrl || "");
    const [localPhotosUrl, setLocalPhotosUrl] = useState(initialUrl || "");
    const [openDialog, setOpenDialog] = useState(false);
    const [saving, setSaving] = useState(false);
    const [touched, setTouched] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [emailLoading, setEmailLoading] = useState(false);

    const handleSavePhotosUrl = async () => {
        if (!localPhotosUrl.trim()) return;

        try {
            setSaving(true);
            await updatePhotosUrl(evaluationId, { photosUrl: localPhotosUrl });

            setPhotosUrl(localPhotosUrl);
            setOpenDialog(false);
        } catch (err) {
            console.error("Erro ao salvar o link", err);
        } finally {
            setSaving(false);
        }
    };

    const handleSendEmailClick = () => {
        setShowConfirmDialog(true);
    };

    const handleConfirmSendEmail = async () => {
        setEmailLoading(true);

        try {
            await sendEvaluationEmail(evaluationId);
            setShowSuccessDialog(true);

        } catch (error) {
            console.error("Erro ao enviar e-mail: ", error);
        } finally {
            setEmailLoading(false);
            setShowConfirmDialog(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-purple-50 border border-purple-200 text-purple-900 rounded-2xl p-6 mb-8 shadow-sm">
            <h3 className="text-xl text-purple-900 font-semibold mb-2 text-center">
                Avaliação das Fotos
            </h3>

            <p className="text-sm text-gray-700 text-center mb-4">
                Aqui você pode acessar fotos e vídeos que complementam esta avaliação.
            </p>

            <div className="flex justify-center mb-5">
                <div className="w-full max-w-md aspect-video bg-gray-100 rounded-xl shadow-inner overflow-hidden">
                    <img
                        src=""
                        alt="Avaliação Bailarina Preparada"
                        className="object-cover w-full h-full"
                    />
                </div>
            </div>

            {photosUrl ? (
                <div className="text-center">
                    <a
                        href={photosUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 text-sm md:text-base md:px-8 md:py-3 rounded-full font-semibold shadow-lg transition-all"
                    >
                        VISUALIZAR
                    </a>
                </div>
            ) : (
                <p className="text-center text-sm text-gray-500">
                    A sua avaliação com fotos ainda não está pronta.
                </p>
            )}

            {isAdmin && (
                <div className="text-center mt-6 space-y-3">
                    {photosUrl && (
                        <button
                            onClick={handleSendEmailClick}
                            className="flex items-center justify-center mx-auto gap-2 bg-purple-800 hover:bg-purple-900 text-white px-3 py-2 sm:px-4 text-xs sm:text-base rounded-lg font-medium transition disabled:opacity-50 mb-5 md:mb-0"
                        >
                            <PaperAirplaneIcon className="w-3 h-3 md:w-5 md:h-5" />
                            Enviar e-mail
                        </button>
                    )}

                    <div className="border-t border-purple-200 pt-4 mt-4">
                        <button
                            onClick={() => setOpenDialog(true)}
                            className="bg-purple-100 text-purple-700 px-4 py-1 rounded-full text-xs font-semibold hover:bg-purple-200 transition"
                        >
                            {photosUrl ? "Editar" : "Adicionar"}
                        </button>
                    </div>
                </div>
            )}

            <InputDialog
                open={openDialog}
                onClose={() => {
                    setOpenDialog(false);
                    setLocalPhotosUrl(photosUrl || "");
                    setTouched(false);
                }}
                onSave={handleSavePhotosUrl}
                value={localPhotosUrl}
                setValue={setLocalPhotosUrl}
                saving={saving}
                touched={touched}
                setTouched={setTouched}
                title={photosUrl ? "Editar Link do Álbum" : "Adicionar Álbum de Fotos/Vídeos"}
                label="Link compartilhável do Canva:"
                placeholder="https://..."
                inputType="url"
                errorMessage="Por favor, insira um link válido."
                validate={(val) => val.trim().startsWith("http")}
            />

            {showConfirmDialog && (
                <ConfirmationDialog
                    message="Tem certeza que deseja enviar e-mail para este usuário?"
                    onConfirm={handleConfirmSendEmail}
                    onCancel={() => setShowConfirmDialog(false)}
                    loading={emailLoading}
                />
            )}

            {showSuccessDialog && (
                <SuccessDialog
                    message="E-mail enviado com sucesso!"
                    onClose={() => setShowSuccessDialog(false)}
                />
            )}
        </div >
    );
};

export default PhotosCard;