import { useState } from "react";
import DialogButton from "shared/buttons/DialogButton";
import ConfirmationDialog from "shared/dialogs/ConfirmationDialog";
import { VALIDATION_LIMITS } from "shared/utils/validationRules";

const FeedbackReplyDialog = ({
    open,
    onClose,
    onSubmit,
    title = "Escrever Feedback",
    placeholder = "Digite a resposta aqui...",
    validate = (val) => !!val.trim(),
    errorMessage = "A mensagem não pode estar vazia.",
}) => {
    const maxLength = VALIDATION_LIMITS.descriptionMaxLength;
    const [message, setMessage] = useState("");
    const [touched, setTouched] = useState(false);
    const [saving, setSaving] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const isInvalid = touched && !validate(message);
    const isAtLimit = message.length === maxLength;

    const handleConfirmSend = async () => {
        setConfirmOpen(false);
        setSaving(true);
        await onSubmit(message);
        setSaving(false);
        onClose();
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 sm:mx-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
                    {title}
                </h2>

                <textarea
                    rows={5}
                    required
                    maxLength={maxLength}
                    onBlur={() => setTouched(true)}
                    className={`w-full p-3 border rounded-xl text-black resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 ${isInvalid ? "border-red-500" : "border-gray-300"}`}
                    placeholder={placeholder}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />

                <div className="text-right text-sm mt-1 mr-1" style={{ color: isAtLimit ? "#d32f2f" : "#6e6e6e" }}>
                    {message.length}/{maxLength} caracteres
                </div>

                {isInvalid && (
                    <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
                )}

                <div className="flex justify-center gap-4 mt-6">
                    <DialogButton onClick={onClose} variant="secondary" loading={saving}>
                        CANCELAR
                    </DialogButton>
                    <DialogButton
                        onClick={() => setConfirmOpen(true)}
                        disabled={!validate(message)}
                        loading={saving}
                    >
                        ENVIAR
                    </DialogButton>
                </div>
            </div>

            {confirmOpen && (
                <ConfirmationDialog
                    message="Tem certeza que deseja enviar esta resposta para o usuário?"
                    onConfirm={handleConfirmSend}
                    onCancel={() => setConfirmOpen(false)}
                    loading={saving}
                />
            )}
        </div>
    );
};

export default FeedbackReplyDialog;
