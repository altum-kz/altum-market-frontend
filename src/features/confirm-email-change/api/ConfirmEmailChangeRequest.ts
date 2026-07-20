import {ConfirmEmailChangeRequest} from "@/features/confirm-email-change/model/types";
import {apiRequest} from "@/shared/api";

export async function confirmEmailChangeRequest(request: ConfirmEmailChangeRequest): Promise<void> {
    return await apiRequest<void>("/api/v1/iam/email/confirm", {
        method: "PATCH",
        body: request,
    });
}