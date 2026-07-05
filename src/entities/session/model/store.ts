import { create } from "zustand";
import {SessionState} from "../model/types";
import {getMeRequest} from "../api/GetMeRequest";
import {ApiError} from "@/shared/api";

interface SessionStore {
    session: SessionState;
    isLoaded: boolean;
    isLoading: boolean;
    fetchSession: () => Promise<void>;
}

export const useSessionStore = create<SessionStore>((set, get) => ({
    session: { status: "loading" },
    isLoaded: false,
    isLoading: false,
    fetchSession: async () => {
        if (get().isLoaded || get().isLoading) return;
        set({ isLoading: true });
        try {
            const data = await getMeRequest();
            set({ session: { status: "resolved", data }, isLoaded: true });
        } catch (error) {
            if (error instanceof ApiError && error.status === 401) {
                set({ session: { status: "unauthenticated" }, isLoaded: true });
            } else {
                throw error;
            }
        } finally {
            set({ isLoading: false });
        }
    },
}));
