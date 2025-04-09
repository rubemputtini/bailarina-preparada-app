import DialogButton from "shared/buttons/DialogButton";

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
                    <DialogButton
                        onClick={onClose}
                        variant="secondary"
                        loading={saving}
                    >
                        CANCELAR
                    </DialogButton>
                    <DialogButton
                        onClick={onSave}
                        disabled={!validate(value)}
                        loading={saving}
                    >
                        SALVAR
                    </DialogButton>
                </div>
            </div>
        </div>
    );
};

export default InputDialog;