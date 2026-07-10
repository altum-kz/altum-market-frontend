import { Avatar, AvatarFallback } from "@/shared/ui";
import { getDisplayName } from "../model/getDisplayName";
import type { MeResponse } from "../model/types";

export function UserProfileCard({ data }: { data: Exclude<MeResponse, { role: "None" }> }) {
    const displayName = getDisplayName(data);

    return (
        <div className="flex items-center gap-2 py-2">
            <Avatar size="lg">
                <AvatarFallback>{displayName.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium truncate">{displayName}</span>
        </div>
    );
}