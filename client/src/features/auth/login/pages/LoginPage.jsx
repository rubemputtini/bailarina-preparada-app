import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginRequest } from "features/account/services/accountService";
import Header from "layouts/Header";
import Footer from "layouts/Footer";
import LoginForm from "../components/LoginForm";
import { useAuth } from "features/auth/AuthContext";
import { ROUTES } from "shared/routes/routes";
import { pingHealthCheck } from "shared/services/healthService";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        pingHealthCheck();
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await loginRequest(email, password);

            if (response.error === "locked") {
                setError("Muitas tentativas. Tente novamente em alguns minutos.");
                return;
            }

            login(response.token);
            navigate(ROUTES.dashboard);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <Header />
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
            <Footer />
        </div>
    );
};

export default LoginPage;
