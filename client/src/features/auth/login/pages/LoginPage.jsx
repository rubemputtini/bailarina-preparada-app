import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "features/account/services/accountService";
import Header from "layouts/Header";
import Footer from "layouts/Footer";
import LoginForm from "../components/LoginForm";
import { setToken } from "features/auth/services/auth";

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
            navigate("/dashboard");
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
