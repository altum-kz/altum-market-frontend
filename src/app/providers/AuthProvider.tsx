"use client";

import { useEffect } from "react";
import { useSessionStore } from "@/entities/session";

interface AuthProviderProps {
    isAuthenticated: boolean;
    children: React.ReactNode;
}

export function AuthProvider({ isAuthenticated, children }: AuthProviderProps) {
    const { setIsAuthenticated, setIsLoading } = useSessionStore();

    useEffect(() => {
        setIsAuthenticated(isAuthenticated);
        setIsLoading(false);
    }, [isAuthenticated, setIsAuthenticated, setIsLoading]);

    return <>{children}</>;
}