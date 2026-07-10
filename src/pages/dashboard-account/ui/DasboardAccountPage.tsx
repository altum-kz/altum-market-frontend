"use client";

import { AccountSettingsWidget } from "@/widgets/account-settings";
import { useSessionStore } from "@/entities/session";

export function DashboardAccountPage() {
    const session = useSessionStore((state) => state.session);

    if (session.status !== "resolved" || session.data.role === "None") {
        return null;
    }

    return <AccountSettingsWidget data={session.data} />;
}