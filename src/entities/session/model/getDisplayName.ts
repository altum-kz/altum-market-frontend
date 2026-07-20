import type { MeResponse } from "./types";

type ResolvedMeResponse = Exclude<MeResponse, { role: "None" }>;

export function getDisplayName(data: ResolvedMeResponse): string {
    return data.role === "customer"
        ? `${data.profile.first_name} ${data.profile.last_name}`
        : data.profile.shop_name ?? data.profile.legal_name;
}