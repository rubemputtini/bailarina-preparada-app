import DialogButton from "shared/buttons/DialogButton";

const SuccessDialog = ({ message, onClose }) => (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center mx-4 sm:mx-8">
            <p className="text-lg font-semibold text-gray-800">{message}</p>
            <div className="mt-6 flex justify-center">
                <DialogButton onClick={onClose}>FECHAR</DialogButton>
            </div>
        </div>
    </div>
);

export default SuccessDialog;
