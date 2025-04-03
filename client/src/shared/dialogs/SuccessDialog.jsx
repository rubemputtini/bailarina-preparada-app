const SuccessDialog = ({ message, onClose }) => (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center mx-4 sm:mx-8">
            <p className="text-lg font-semibold text-gray-800">{message}</p>
            <button className="mt-6 px-6 py-2 bg-purple-500 text-white rounded-lg w-[70%] sm:w-auto hover:bg-purple-600 transition-all duration-300" onClick={onClose}>
                FECHAR
            </button>
        </div>
    </div>
);

export default SuccessDialog;
