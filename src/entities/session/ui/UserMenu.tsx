import {MeResponse} from "@/entities/session/model/types";
import Link from "next/link";
import {AvatarFallback, Avatar} from "@/shared/ui";

interface UserMenuProps {
    data: MeResponse;
}

export function UserMenu({ data }: UserMenuProps) {
    if (data.role === "None") {
        return (
            <Link href="/onboarding" className="text-sm font-medium text-brand hover:opacity-75">
                Завершите регистрацию
            </Link>
        );
    }

    const displayName = data.role === "customer"
        ? `${data.profile.last_name} ${data.profile.first_name}`
        : data.profile.shop_name ?? data.profile.legal_name;

    return (
        <Link href="/dashboard" title={displayName} className="flex items-center gap-2">
            <Avatar size="lg">
                <AvatarFallback>{displayName.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
        </Link>
    )
}
