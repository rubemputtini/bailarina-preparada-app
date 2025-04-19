import { Box, Container, Grid, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DialogButton from "shared/buttons/DialogButton";
import { ROUTES } from "shared/routes/routes";
import ErrorCard from "shared/ui/ErrorCard";

const LoginForm = ({
    title,
    buttonText,
    onSubmit,
    email,
    setEmail,
    password,
    setPassword,
    disableSubmit,
    error
}) => {
    const navigate = useNavigate();

    return (
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
                    {title}
                </Typography>
                <form onSubmit={onSubmit}>
                    <Grid container spacing={2}>
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
                                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Senha"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                                loading={disableSubmit}
                                fullWidthOnMobile={false}
                            >
                                {buttonText}
                            </DialogButton>
                        </Grid>
                        <Grid item xs={12} textAlign="center">
                            <Typography
                                variant="body2"
                                sx={{
                                    color: "#8e24aa",
                                    fontWeight: "bold",
                                    background: "none",
                                    border: "none",
                                    padding: 0,
                                    cursor: "pointer",
                                    fontSize: "0.875rem",
                                    textDecoration: "underline",
                                    '&:hover': {
                                        opacity: 0.8
                                    }
                                }}
                                onClick={() => navigate(ROUTES.forgotPassword)}
                            >
                                Esqueci minha senha
                            </Typography>
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
    );
};

export default LoginForm;
