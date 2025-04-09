import { useEffect, useState } from "react";
import { getUserDetails } from "shared/services/userService";
import { useAuth } from "features/auth/AuthContext";

export const useUserData = () => {
    const { userId } = useAuth();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (userId) {
            getUserDetails(userId).then((data) => {
                setUserData(data);
            });
        }
    }, [userId]);

    return userData;
};