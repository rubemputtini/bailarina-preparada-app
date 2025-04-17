import DialogButton from "shared/buttons/DialogButton";

const ConfirmationDialog = ({ message, onConfirm, onCancel, loading }) => (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center mx-4 sm:mx-8">
            <p className="text-lg font-semibold text-gray-800">{message}</p>
            <div className="flex justify-center gap-4 mt-4">
                <DialogButton
                    onClick={onCancel}
                    variant="secondary"
                    disabled={loading}
                >
                    CANCELAR
                </DialogButton>
                <DialogButton
                    onClick={onConfirm}
                    loading={loading}
                >
                    CONFIRMAR
                </DialogButton>
            </div>
        </div>
    </div>
);

export default ConfirmationDialog;
