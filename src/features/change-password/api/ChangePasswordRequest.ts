import {ChangePasswordData} from "@/features/change-password/model/types";
import {apiRequest} from "@/shared/api";

export async function changePasswordRequest(request: ChangePasswordData): Promise<void> {
    return await apiRequest<void>("/api/v1/iam/change-password", {
        method: "POST",
        body: request,
    });
}