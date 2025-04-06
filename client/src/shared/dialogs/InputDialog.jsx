import { CircularProgress } from "@mui/material";

const InputDialog = ({
    open,
    onClose,
    onSave,
    value,
    setValue,
    saving,
    touched,
    setTouched,
    title = "Adicionar Informação",
    label = "Conteúdo",
    placeholder = "Digite aqui...",
    inputType = "text",
    validate = (val) => !!val.trim(),
    errorMessage = "Este campo é obrigatório."
}) => {
    const isInvalid = touched && !validate(value);

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 sm:mx-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
                    {title}
                </h2>

                <label className="block text-sm text-left text-gray-700 mb-2 font-medium">
                    {label}
                </label>
                <input
                    type={inputType}
                    required
                    onBlur={() => setTouched(true)}
                    className={`w-full p-3 border rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-purple-500 ${isInvalid ? "border-red-500" : "border-gray-300"
                        }`}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />

                {isInvalid && (
                    <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
                )}

                <div className="flex justify-center gap-4 mt-6">
                    <button
                        className="px-4 py-2 bg-gray-500 text-white rounded-xl w-full sm:w-auto hover:bg-gray-600"
                        onClick={onClose}
                        disabled={saving}
                    >
                        CANCELAR
                    </button>
                    <button
                        className={`px-4 py-2 text-white rounded-xl w-full sm:w-auto ${saving || !validate(value)
                            ? "bg-purple-300 cursor-not-allowed"
                            : "bg-purple-600 hover:bg-purple-700"
                            }`}
                        onClick={onSave}
                        disabled={saving || !validate(value)}
                    >
                        {saving ? <CircularProgress size={24} color="inherit" /> : "SALVAR"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InputDialog;