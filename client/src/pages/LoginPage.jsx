import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/accountService";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoginForm from "../components/forms/LoginForm";
import { Box, CircularProgress } from "@mui/material";
import { setToken } from "../services/auth";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { token } = await login(email, password);

            setToken(token);
            navigate("/avaliacao");
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <Header />
            {loading ? (
                <Box my={22} display="flex" flexDirection="column" alignItems="center">
                    <CircularProgress color="primary" />
                </Box>
            ) : (
                <LoginForm
                    title="Bem-vindo de volta"
                    buttonText="Entrar"
                    onSubmit={handleLogin}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    disableSubmit={loading}
                    error={error}
                />
            )}
            <Footer />
        </div>
    );
};

export default LoginPage;
