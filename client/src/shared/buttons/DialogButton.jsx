import { CircularProgress } from "@mui/material";

const DialogButton = ({
    children,
    onClick,
    disabled = false,
    loading = false,
    variant = "primary",
    fullWidthOnMobile = true,
}) => {
    const baseStyles = "px-4 py-2 text-white rounded-xl transition-all duration-200";
    const widthStyles = fullWidthOnMobile ? "w-[70%] sm:w-auto" : "w-auto";
    const variantStyles =
        variant === "secondary"
            ? "bg-gray-500 hover:bg-gray-600"
            : disabled
                ? "bg-purple-300 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700";

    return (
        <button
            className={`${baseStyles} ${widthStyles} ${variantStyles}`}
            onClick={onClick}
            disabled={disabled || loading}
        >
            {loading ? <CircularProgress size={24} color="inherit" /> : children}
        </button>
    );
};

export default DialogButton;