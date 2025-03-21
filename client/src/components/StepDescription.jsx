import { Typography, TextField } from "@mui/material";

const StepDescription = ({ newTraining, setNewTraining }) => {
    return (
        <>
            <Typography variant="h6" sx={{ color: "#323232", marginBottom: "16px" }}>
                O que achou do seu treino?
            </Typography>
            <TextField
                label="Observações (opcional)"
                value={newTraining.description}
                onChange={(e) => setNewTraining({ ...newTraining, description: e.target.value })}
                fullWidth
                multiline
                rows={2}
                sx={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "12px",
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        borderColor: "#A7C7E7",
                        "&:hover fieldset": { borderColor: "#6A1B9A" },
                        "&.Mui-focused fieldset": { borderColor: "#4A148C" },
                    },
                    "& .MuiInputBase-input": { fontSize: "16px", color: "#323232" },
                    "& .MuiInputLabel-root": { color: "#323232" },
                    "& .MuiOutlinedInput-notchedOutline": { borderRadius: "12px" },
                }}
            />
        </>
    );
};

export default StepDescription;
