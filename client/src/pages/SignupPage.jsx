import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/accountService";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SignupForm from "../components/forms/SignupForm"
import { Box, CircularProgress } from "@mui/material";

const SignupPage = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await register(userName, email, password);

            navigate("/home");
        } catch (error) {
            setError(error.message || 'Erro ao cadastrar, tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            {loading ? (
                <Box my={22} display="flex" flexDirection="column" alignItems="center">
                    <CircularProgress color="primary" />
                </Box>
            ) : (
                <SignupForm
                    title="Crie sua conta"
                    buttonText="Registrar"
                    onSubmit={handleRegister}
                    userName={userName}
                    setUserName={setUserName}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    confirmPassword={confirmPassword}
                    setConfirmPassword={setConfirmPassword}
                    onLoginRedirect={handleLoginRedirect}
                    disableSubmit={loading}
                />
            )}
            {error && <div className="text-red-500 text-center mt-4">{error}</div>}
            <Footer />
        </div>
    );
};

export default SignupPage;