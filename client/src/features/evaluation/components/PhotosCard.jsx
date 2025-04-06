import { useAuth } from "features/auth/AuthContext";
import { useState } from "react";
import { updatePhotosUrl } from "../services/evaluationService";
import InputDialog from "shared/dialogs/InputDialog";

const PhotosCard = ({ photosUrl: initialUrl, evaluationId }) => {
    const { role } = useAuth();
    const [photosUrl, setPhotosUrl] = useState(initialUrl || "");
    const [localPhotosUrl, setLocalPhotosUrl] = useState(initialUrl || "");
    const [openDialog, setOpenDialog] = useState(false);
    const [saving, setSaving] = useState(false);
    const [touched, setTouched] = useState(false);

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

            {role === "admin" && (
                <div className="text-center mt-6">
                    <div className="border-t border-purple-200 pt-4 mt-6 text-center">
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
        </div >
    );
};

export default PhotosCard;