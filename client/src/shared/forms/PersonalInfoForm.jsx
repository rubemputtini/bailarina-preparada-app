import { Grid, TextField, Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { passwordRules } from "../utils/constants";
import { isPasswordConfirmed } from "../utils/validators";

const PersonalInfoForm = ({ data, onChange, passwordRequisites, showPasswordPopup, setShowPasswordPopup }) => {
    const hasTypedConfirmPassword = data.confirmPassword.length > 0;

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    label="Nome Completo"
                    fullWidth
                    required
                    variant="outlined"
                    size="small"
                    value={data.name}
                    onChange={(e) => onChange("name", e.target.value)}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    required
                    variant="outlined"
                    size="small"
                    value={data.email}
                    onChange={(e) => onChange("email", e.target.value)}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Data de Nascimento"
                    type="date"
                    fullWidth
                    required
                    variant="outlined"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    value={data.dateOfBirth}
                    onChange={(e) => onChange("dateOfBirth", e.target.value)}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
                />
            </Grid>
            <Grid item xs={12}>
                <PhoneInput
                    country={"br"}
                    value={data.phoneNumber}
                    onChange={(value) => onChange("phoneNumber", value)}
                    inputStyle={{
                        width: "100%",
                        height: "40px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        fontSize: "16px",
                        paddingLeft: "50px",
                        color: "#000",
                        backgroundColor: "#fff",
                        boxSizing: "border-box",
                    }}
                    buttonStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #ccc",
                        borderRadius: "8px 0 0 8px",
                    }}
                    dropdownStyle={{
                        borderRadius: "8px",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Senha"
                    type="password"
                    fullWidth
                    required
                    variant="outlined"
                    size="small"
                    value={data.password}
                    onChange={(e) => onChange("password", e.target.value)}
                    onFocus={() => setShowPasswordPopup(true)}
                    onBlur={() => setShowPasswordPopup(false)}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
                />
                {showPasswordPopup && (
                    <Box mt={1} p={1} border="1px solid #e0e0e0" borderRadius="8px">
                        <Typography variant="body2" color="textSecondary">
                            Sua senha deve conter:
                        </Typography>
                        <ul style={{ paddingLeft: "1rem", marginTop: "0.5rem" }}>
                            {passwordRules.map(({ id, text }) => (
                                <li key={id} style={{ display: "flex", alignItems: "center" }}>
                                    {passwordRequisites[id] ? <CheckCircleIcon style={{ color: "green", marginRight: "0.5rem" }} /> : <CancelIcon style={{ color: "red", marginRight: "0.5rem" }} />}
                                    <Typography variant="body2">{text}</Typography>
                                </li>
                            ))}
                        </ul>
                    </Box>
                )}
            </Grid>

            <Grid item xs={12}>
                <TextField
                    label="Confirme a Senha"
                    type="password"
                    fullWidth
                    required
                    variant="outlined"
                    size="small"
                    value={data.confirmPassword}
                    onChange={(e) => onChange("confirmPassword", e.target.value)}
                    error={hasTypedConfirmPassword && !isPasswordConfirmed(data.password, data.confirmPassword)}
                    helperText={hasTypedConfirmPassword && !isPasswordConfirmed(data.password, data.confirmPassword) ? "As senhas não coincidem" : ""}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
                />
            </Grid>
        </Grid>
    );
};

export default PersonalInfoForm;
