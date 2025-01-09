import { useState } from "react";
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import { passwordRules } from "../../utils/constants";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const SignupForm = ({
    title,
    buttonText,
    onSubmit,
    userName,
    setUserName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    onLoginRedirect,
    disableSubmit,
}) => {
    const [passwordRequisites, setPasswordRequisites] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false,
    });
    const [showPasswordPopup, setShowPasswordPopup] = useState(false);
    const isPasswordConfirmed = password === confirmPassword;

    const validatePassword = (password) => {
        setPasswordRequisites({
            length: password.length >= 6,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            specialChar: /[^A-Za-z0-9]/.test(password),
        });
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        validatePassword(value);
    };

    const isPasswordValid = Object.values(passwordRequisites).every((isValid) => isValid);

    return (
        <Container
            maxWidth="xs"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                padding: "1rem",
                background: "linear-gradient(144.39deg, #ffffff -278.56%, #403b4d -78.47%, #302539 91.61%)",
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
                        marginBottom: "1rem",
                        color: "#403b4d",
                    }}
                >
                    {title}
                </Typography>
                <form onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Nome Completo"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                fullWidth
                                variant="outlined"
                                size="small"
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                fullWidth
                                variant="outlined"
                                size="small"
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Senha"
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                onFocus={() => setShowPasswordPopup(true)}
                                onBlur={() => setShowPasswordPopup(false)}
                                fullWidth
                                variant="outlined"
                                size="small"
                                required
                            />
                            {showPasswordPopup && (
                                <Box mt={1} p={1} border="1px solid #e0e0e0" borderRadius="8px">
                                    <Typography variant="body2" color="textSecondary">
                                        Sua senha deve conter:
                                    </Typography>
                                    <ul style={{ paddingLeft: "1rem", marginTop: "0.5rem" }}>
                                        {passwordRules.map(({ id, text }) => (
                                            <li key={id} style={{ display: "flex", alignItems: "center" }}>
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
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Confirme a Senha"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                fullWidth
                                variant="outlined"
                                size="small"
                                error={!isPasswordConfirmed && confirmPassword.length > 0}
                                helperText={!isPasswordConfirmed && confirmPassword.length > 0 ? "As senhas não coincidem" : ""}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} display="flex" justifyContent="center">
                            <Button
                                type="submit"
                                variant="contained"
                                size="medium"
                                disabled={!isPasswordValid || !isPasswordConfirmed || disableSubmit}
                                sx={{
                                    backgroundColor: "#6c5c80",
                                    color: "#fff",
                                    textTransform: "none",
                                    fontWeight: 600,
                                    "&:hover": { backgroundColor: "#5b4c6c" },
                                    padding: "0.5rem 1.5rem",
                                }}
                            >
                                {buttonText}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <Typography
                    variant="body2"
                    align="center"
                    sx={{
                        marginTop: "1rem",
                        color: "#6c5c80",
                    }}
                >
                    <div className="flex items-center justify-center mt-4">
                        <p className="text-gray-400">Já possui uma conta?{' '}</p>
                        <button
                            onClick={onLoginRedirect}
                            className="text-fuchsia-800 hover:underline font-bold ml-1"
                        >
                            Entre aqui
                        </button>
                    </div>
                </Typography>
            </Box>
        </Container>
    );
};

export default SignupForm;
