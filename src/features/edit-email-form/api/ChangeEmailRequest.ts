import {ChangeEmailRequest} from "../model/types";
import {apiRequest} from "@/shared/api";

export async function requestEmailChange(request: ChangeEmailRequest): Promise<void> {
    return await apiRequest<void>("/api/v1/iam/email/change", {
        method: "PATCH",
        body: request,
    });
}

