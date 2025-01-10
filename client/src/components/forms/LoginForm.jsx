import { Alert, Box, Button, Container, Grid, TextField, Typography } from "@mui/material";

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
                            />
                        </Grid>
                        <Grid item xs={12} display="flex" justifyContent="center">
                            <Button
                                type="submit"
                                variant="contained"
                                size="medium"
                                disabled={disableSubmit}
                                sx={{
                                    backgroundColor: "#6c5c80",
                                    color: "#fff",
                                    textTransform: "none",
                                    fontWeight: 600,
                                    fontFamily: "'Montserrat', sans-serif",
                                    "&:hover": { backgroundColor: "#5b4c6c" },
                                    padding: "0.5rem 1.5rem",
                                }}
                            >
                                {buttonText}
                            </Button>
                        </Grid>
                        {error && (
                            <Grid item xs={12} display="flex" justifyContent="center">
                                <Alert severity="error"
                                    sx={{
                                        fontFamily: "'Montserrat', sans-serif",
                                    }}
                                >{error}</Alert>
                            </Grid>
                        )}
                    </Grid>
                </form>
            </Box>
        </Container>
    );
};

export default LoginForm;