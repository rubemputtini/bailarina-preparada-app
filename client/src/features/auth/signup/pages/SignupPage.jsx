import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "features/account/services/accountService";
import Header from "layouts/Header";
import Footer from "layouts/Footer";
import SignupStepper from "../SignupStepper";

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