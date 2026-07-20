"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui";
import { UserProfileCard } from "@/entities/session";
import type { MeResponse } from "@/entities/session";
import { NAV_ITEMS } from "../model/nav-items";

interface DashboardSidebarProps {
    data: Exclude<MeResponse, { role: "None" }>;
}

export function DashboardSidebar({ data }: DashboardSidebarProps) {
    const pathname = usePathname();
    const items = NAV_ITEMS.filter((item) => !item.roles || item.roles.includes(data.role));

    return (
        <aside className="w-80 bg-white p-6 shrink-0 flex flex-col gap-4 rounded-lg">
            <UserProfileCard data={data} />

            <nav className="flex flex-col gap-4">
                {items.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                                isActive ? "text-brand bg-brand/[0.08]" : "text-gray-600 hover:bg-gray-50"
                            )}
                        >
                            <Icon className="size-4" />
                            {item.label}
                        </Link>
                    );
                })}

                <Button type="button" onClick={() => console.log("logout")}>
                    <LogOut className="size-4" />
                </Button>
            </nav>
        </aside>
    );
}