// entities/session/ui/UserMenu.tsx
"use client";

import Link from "next/link";
import { Avatar, AvatarFallback } from "@/shared/ui";
import { getDisplayName } from "../model/getDisplayName";
import type { MeResponse } from "../model/types";

export function UserMenu({ data }: { data: MeResponse }) {
    if (data.role === "None") {
        return (
            <Link href="/onboarding" className="text-sm font-medium text-brand hover:opacity-75">
                Завершите регистрацию
            </Link>
        );
    }

    const displayName = getDisplayName(data);

    return (
        <Link href="/dashboard" title={displayName}>
            <Avatar size="lg">
                <AvatarFallback>{displayName.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
        </Link>
    );
}