import { apiRequest } from "@/shared/api";
import { CreateAccountRequest } from "@/features/register";

export async function registerRequest(request: CreateAccountRequest): Promise<string> {
    const data = await apiRequest<{ response: string, message: string }>(
        "/api/v1/iam/registration", {
            method: "POST",
            body: request,
        });

    return data.response;
}

