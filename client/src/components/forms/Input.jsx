const Input = ({ label, value, onChange, disabled, type = "text" }) => {
    return (
        <div>
            <label className="text-sm text-gray-700 mb-1 block">{label}</label>
            <input
                type={type}
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
                className={`w-full px-4 h-[44px] border rounded-lg text-black appearance-none ${disabled
                    ? "bg-gray-100 border-gray-300"
                    : "bg-white border border-purple-300 focus:outline-none focus:ring-0"
                    }`}
            />
        </div>
    );
};

export default Input;