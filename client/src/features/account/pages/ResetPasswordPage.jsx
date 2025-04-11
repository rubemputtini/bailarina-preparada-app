import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Box, Container, Grid, TextField, Typography } from "@mui/material";
import { resetPassword } from "features/account/services/accountService";
import Header from "layouts/Header";
import Footer from "layouts/Footer";
import SuccessDialog from "shared/dialogs/SuccessDialog";
import { ROUTES } from "shared/routes/routes";
import { passwordRules } from "shared/utils/constants";
import { validatePassword, isPasswordConfirmed } from "shared/utils/validators";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import DialogButton from "shared/buttons/DialogButton";
import ErrorCard from "shared/ui/ErrorCard";

const ResetPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showRules, setShowRules] = useState(false);
    const [passwordRequisites, setPasswordRequisites] = useState(validatePassword(""));
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        setEmail(searchParams.get("email") || "");
        setToken(searchParams.get("token") || "");
    }, [searchParams]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const { message } = await resetPassword({ email, token, newPassword });
            setMessage(message);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const isValid = Object.values(passwordRequisites).every(Boolean) && isPasswordConfirmed(newPassword, confirmPassword);

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <Header />
            <Container
                maxWidth="xs"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "1rem",
                }}
            >
                <Box
                    sx={{
                        width: "80%",
                        padding: "1.5rem",
                        backgroundColor: "#fff",
                        borderRadius: "12px",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                    }}
                >
                    <Typography
                        variant="h5"
                        align="center"
                        sx={{
                            fontWeight: 600,
                            fontFamily: "'Montserrat', sans-serif",
                            marginBottom: "1rem",
                            color: "#403b4d",
                        }}
                    >
                        Criar nova senha
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Nova senha"
                                    type="password"
                                    fullWidth
                                    required
                                    size="small"
                                    value={newPassword}
                                    onChange={(e) => {
                                        setNewPassword(e.target.value);
                                        setPasswordRequisites(validatePassword(e.target.value));
                                    }}
                                    onFocus={() => setShowRules(true)}
                                    onBlur={() => setShowRules(false)}
                                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
                                />
                            </Grid>

                            {showRules && (
                                <Grid item xs={12}>
                                    <Box
                                        mt={0}
                                        p={2}
                                        border="1px solid #e0e0e0"
                                        borderRadius="8px"
                                        bgcolor="#fafafa"
                                    >
                                        <Typography variant="body2" color="textSecondary" mb={1}>
                                            Sua senha deve conter:
                                        </Typography>
                                        <ul style={{ paddingLeft: "1rem", margin: 0 }}>
                                            {passwordRules.map(({ id, text }) => (
                                                <li key={id} style={{ display: "flex", alignItems: "center", marginBottom: "4px" }}>
                                                    {passwordRequisites[id] ? (
                                                        <CheckCircleIcon style={{ color: "green", marginRight: "0.5rem" }} />
                                                    ) : (
                                                        <CancelIcon style={{ color: "red", marginRight: "0.5rem" }} />
                                                    )}
                                                    <Typography variant="body2">{text}</Typography>
                                                </li>
                                            ))}
                                        </ul>
                                    </Box>
                                </Grid>
                            )}

                            <Grid item xs={12}>
                                <TextField
                                    label="Confirme a senha"
                                    type="password"
                                    fullWidth
                                    required
                                    size="small"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    error={confirmPassword.length > 0 && !isPasswordConfirmed(newPassword, confirmPassword)}
                                    helperText={
                                        confirmPassword.length > 0 && !isPasswordConfirmed(newPassword, confirmPassword)
                                            ? "As senhas não coincidem"
                                            : ""
                                    }
                                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
                                />
                            </Grid>

                            <Grid item xs={12} display="flex" justifyContent="center">
                                <DialogButton
                                    type="submit"
                                    loading={loading}
                                    fullWidthOnMobile={false}
                                    disabled={!isValid}
                                >
                                    Redefinir senha
                                </DialogButton>
                            </Grid>

                            {error && (
                                <Grid item xs={12}>
                                    <ErrorCard
                                        message={error}
                                        sx={{ mt: 2 }}
                                    />
                                </Grid>
                            )}
                        </Grid>
                    </form>
                </Box>
            </Container>
            <Footer />

            {message && (
                <SuccessDialog
                    message={message}
                    onClose={() => {
                        setMessage("");
                        navigate(ROUTES.login);
                    }}
                />
            )}
        </div>
    );
};

export default ResetPasswordPage;