import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "features/account/services/accountService";
import Header from "layouts/Header";
import Footer from "layouts/Footer";
import SignupStepper from "../SignupStepper";
import { useAuth } from "features/auth/AuthContext";
import { ROUTES } from "shared/routes/routes";

const SignupPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleRegister = async (formData) => {
        setLoading(true);
        setError(null);

        try {
            const result = await register(formData);

            if (result?.token) {
                login(result.token);
                navigate(ROUTES.dashboard);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLoginRedirect = () => {
        navigate(ROUTES.login);
    };

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <Header />
            <SignupStepper
                onRegister={handleRegister}
                onLoginRedirect={handleLoginRedirect}
                error={error}
                loading={loading}
            />
            <Footer />
        </div>
    );
};

export default SignupPage;