import { useState } from "react";
import { Box, Container, Grid, TextField, Typography } from "@mui/material";
import Header from "layouts/Header";
import Footer from "layouts/Footer";
import { forgotPassword } from "features/account/services/accountService";
import SuccessDialog from "shared/dialogs/SuccessDialog";
import DialogButton from "shared/buttons/DialogButton";
import ErrorCard from "shared/ui/ErrorCard";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            const { message } = await forgotPassword(email);
            setMessage(message);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

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
                        Redefinir senha
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="E-mail"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    required
                                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
                                />
                            </Grid>

                            <Grid item xs={12} display="flex" justifyContent="center">
                                <DialogButton
                                    type="submit"
                                    loading={loading}
                                    fullWidthOnMobile={false}
                                >
                                    Enviar link
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
                    onClose={() => setMessage("")}
                />
            )}
        </div>
    );
};

export default ForgotPasswordPage;
