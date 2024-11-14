import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";
import { checkAuthStatus, loginUser, signupUser, logoutUser } from "../helpers/api-communicators";

type User = {
    name: string;
    email: string;
};

type UserAuth = {
    isLoggedIn: boolean;
    loading: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function checkStatus() {
            setLoading(true);
            try {
                const data = await checkAuthStatus();
                if (data) {
                    setUser({ email: data.email, name: data.name });
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.error("Error checking auth status:", error);
            } finally {
                setLoading(false);
            }
        }
        checkStatus();
    }, []);

    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            const data = await loginUser(email, password);
            if (data) {
                setUser({ email: data.email, name: data.name });
                setIsLoggedIn(true);
            }
        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const signup = async (name: string, email: string, password: string) => {
        setLoading(true);
        try {
            const data = await signupUser(name, email, password);
            if (data) {
                setUser({ email: data.email, name: data.name });
                setIsLoggedIn(true);
            }
        } catch (error) {
            console.error("Signup failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            await logoutUser();
            setUser(null);
            setIsLoggedIn(false);
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const value = useMemo(() => ({
        user,
        isLoggedIn,
        loading,
        login,
        logout,
        signup,
    }), [user, isLoggedIn, loading]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
