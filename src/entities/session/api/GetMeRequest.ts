import type { MeResponse } from "../model/types";
import {apiRequest} from "@/shared/api";

export async function getMeRequest(): Promise<MeResponse> {
    return await apiRequest<MeResponse>(
        "/api/v1/iam/me",
        {method: "GET"},
    );
}
