import { apiRequest } from "@/shared/api";
import { AccountConfirmationRequest } from "@/features/confirm-otp";

export async function confirmOtpRequest(request: AccountConfirmationRequest): Promise<void> {
    await apiRequest<void>("/api/v1/iam/account_confirmation", {
        method: "POST",
        body: request,
    });
}