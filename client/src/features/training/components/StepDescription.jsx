import { Typography, TextField } from "@mui/material";
import { VALIDATION_LIMITS } from "shared/utils/validationRules";

const StepDescription = ({ newTraining, setNewTraining }) => {
    const maxLength = VALIDATION_LIMITS.descriptionMaxLength;
    const value = newTraining.description;
    const isAtLimit = value.length === maxLength;

    const handleChange = (e) => {
        const newValue = e.target.value;

        if (newValue.length <= maxLength) {
            setNewTraining({ ...newTraining, description: newValue });
        }
    };

    return (
        <>
            <Typography variant="h6" sx={{ color: "#323232", marginBottom: "16px" }}>
                O que achou do seu treino?
            </Typography>
            <TextField
                label="Observações (opcional)"
                value={value}
                onChange={handleChange}
                fullWidth
                multiline
                rows={2}
                inputProps={{ maxLength }}
                helperText={`${value.length}/${maxLength} caracteres`}
                FormHelperTextProps={{
                    sx: {
                        fontSize: "13px",
                        textAlign: "right",
                        mt: 0.5,
                        mr: 0.5,
                        color: isAtLimit ? "#d32f2f" : "#6e6e6e",
                    },
                }}
                sx={{
                    borderRadius: "12px",
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        backgroundColor: "#F8F6FD",
                        "& fieldset": {
                            borderColor: isAtLimit ? "#d32f2f" : "#A7C7E7",
                        },
                        "&:hover fieldset": {
                            borderColor: isAtLimit ? "#d32f2f" : "#6A1B9A",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: isAtLimit ? "#d32f2f" : "#4A148C",
                        },
                    },
                    "& .MuiInputBase-input": {
                        fontSize: "16px",
                        color: "#323232",
                    },
                    "& .MuiInputLabel-root": {
                        fontSize: "15px",
                        color: "#323232",
                        backgroundColor: "#F8F6FD",
                        px: "4px",
                    },
                }}
            />
        </>
    );
};

export default StepDescription;
