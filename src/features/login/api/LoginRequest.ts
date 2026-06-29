import { apiRequest } from "@/shared/api";
import { LoginAccount } from "@/features/login";

export async function loginRequest(request: LoginAccount): Promise<void> {
    await apiRequest<void>("/api/v1/iam/login", {
        method: "POST",
        body: request,
    });
}