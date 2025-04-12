import { useAuth } from "features/auth/AuthContext";

const useIsAdmin = () => {
    const { role } = useAuth();
    
    return role === "admin";
};

export default useIsAdmin;