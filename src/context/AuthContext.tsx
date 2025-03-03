"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

interface User {
    name: string;
    email: string;
}

interface AuthState {
    token: string | null;
    user: User | null;
    setAuth: (authData: { token: string; user: User }) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [auth, setAuthState] = useState<AuthState>({
        token: null,
        user: null,
        setAuth: () => { },
        logout: () => { },
    });

    useEffect(() => {
        // Load token & user data from cookies
        const token = Cookies.get("auth_token");
        const userInfo = Cookies.get("user_info");

        if (token && userInfo) {
            setAuthState({
                token,
                user: JSON.parse(userInfo),
                setAuth,
                logout,
            });
        }
    }, []);

    const setAuth = (authData: { token: string; user: User }) => {
        setAuthState((prev) => ({ ...prev, ...authData }));
    };

    const logout = () => {
        Cookies.remove("auth_token");
        Cookies.remove("user_info");
        setAuthState({ token: null, user: null, setAuth, logout });
    };

    return (
        <AuthContext.Provider value={{ ...auth, setAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};
