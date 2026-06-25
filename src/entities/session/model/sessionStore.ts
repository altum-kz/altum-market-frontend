import {create} from "zustand";

interface SessionState {
    pendingAccountId: string | null;
    setPendingAccountId: (id: string) => void;
    clearPendingAccountId: () => void;

    isAuthenticated: boolean;
    isLoading: boolean;
    setIsAuthenticated: (value: boolean) => void;
    setIsLoading: (value: boolean) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
    pendingAccountId: null,
    setPendingAccountId: (id) => set({ pendingAccountId: id }),
    clearPendingAccountId: () => set({ pendingAccountId: null }),

    isAuthenticated: false,
    isLoading: false,
    setIsAuthenticated: (value) => set({ isAuthenticated: value }),
    setIsLoading: (value) => set({ isLoading: value }),
}));