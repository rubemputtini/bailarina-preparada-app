import { Box, Typography, TextField } from "@mui/material";
import { useState } from "react";
import ErrorCard from "shared/ui/ErrorCard";

const StepDate = ({ newTraining, setNewTraining, today, error, onValidityChange }) => {
    const [dateError, setDateError] = useState("");

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        const isFuture = new Date(selectedDate) > new Date(today);

        if (isFuture) {
            setDateError("Você não pode registrar treinos em datas futuras.");
            onValidityChange?.(false);
        } else {
            setDateError("");
            onValidityChange?.(true);
        }

        setNewTraining({ ...newTraining, date: selectedDate });
    };

    const displayError = dateError || error;

    return (
        <>
            <Typography variant="h6" sx={{ color: "#323232", marginBottom: "16px", textAlign: "center" }}>
                Quando foi seu treino?
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                <Box sx={{ width: "80%" }}>
                    <TextField
                        type="date"
                        value={newTraining.date}
                        onChange={handleDateChange}
                        fullWidth
                        InputProps={{ inputProps: { max: today } }}
                        sx={{
                            backgroundColor: "#FFFFFF",
                            borderRadius: "24px",
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "24px",
                                borderColor: "#A7C7E7",
                                "&:hover fieldset": { borderColor: "#6A1B9A" },
                                "&.Mui-focused fieldset": { borderColor: "#4A148C" },
                            },
                            "& .MuiInputBase-input": { padding: "12px", fontSize: "16px", color: "#323232", textAlign: "center" },
                        }}
                    />
                </Box>
            </Box>
            {displayError && <ErrorCard message={displayError} />}
        </>
    );
};

export default StepDate;
