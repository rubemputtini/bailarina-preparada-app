import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/accountService";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Box, CircularProgress } from "@mui/material";
import SignupStepper from "../components/signup/SignupStepper";

const SignupPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (formData) => {
        setLoading(true);
        setError(null);

        try {
            await register(formData);
            navigate("/dashboard");
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <Header />
            {loading ? (
                <Box my={22} display="flex" flexDirection="column" alignItems="center">
                    <CircularProgress color="primary" />
                </Box>
            ) : (
                <SignupStepper
                    onRegister={handleRegister}
                    onLoginRedirect={handleLoginRedirect}
                    error={error}
                />
            )}
            <Footer />
        </div>
    );
};

export default SignupPage;