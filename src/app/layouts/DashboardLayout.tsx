"use client";

import { useEffect, type ReactNode } from "react";
import {usePathname, useRouter} from "next/navigation";
import { useSessionStore } from "@/entities/session";
import {DashboardSidebar} from "@/widgets/dashboard-sidebar";
import {NAV_ITEMS} from "@/widgets/dashboard-sidebar";

export function DashboardLayout({ children }: { children: ReactNode }) {
    const session = useSessionStore((state) => state.session);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (session.status === "unauthenticated") router.replace("/login");
        if (session.status === "resolved" && session.data.role === "None") router.replace("/onboarding");
    }, [session, router]);

    if (session.status !== "resolved" || session.data.role === "None") {
        return null;
    }

    const currentItem = NAV_ITEMS.find((item) => item.href === pathname);

    return (
        <div className="flex flex-1 gap-4 py-8">
            <DashboardSidebar data={session.data} />
            <div className="flex-1 flex flex-col gap-4">
                {currentItem && <h1 className="text-2xl font-bold bg-white p-6 rounded-lg">{currentItem.label}</h1>}
                {children}
            </div>
        </div>
    );
}
