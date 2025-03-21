import { Box, Typography, TextField } from "@mui/material";

const StepDate = ({ newTraining, setNewTraining, today }) => {
    return (
        <>
            <Typography variant="h6" sx={{ color: "#323232", marginBottom: "16px" }}>
                Quando foi seu treino?
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                <Box sx={{ width: "80%" }}>
                    <TextField
                        type="date"
                        value={newTraining.date}
                        onChange={(e) => setNewTraining({ ...newTraining, date: e.target.value })}
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
        </>
    );
};

export default StepDate;
