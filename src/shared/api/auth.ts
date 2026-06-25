import {apiRequest} from "./base";

interface RegisterResponse {
    response: string;
    message: string;
}

export async function registerAccount(
    email: string,
    raw_password: string,
): Promise<RegisterResponse> {
    return apiRequest<RegisterResponse>("/api/v1/iam/registration", {
        method: "POST",
        body: { email, raw_password: raw_password },
    });
}

export async function verifyOTP(account_id: string, confirmCode: string): Promise<{ message: string }> {
    return apiRequest<{ message: string }>("/api/v1/iam/account_confirmation", {
        method: "POST",
        body: {
            account_id,
            confirm_code: confirmCode
        },
    });
}

interface LoginRequest {
    email: string;
    raw_password: string;
}

export async function loginAccount(payload: LoginRequest): Promise<LoginRequest> {
    return apiRequest<LoginRequest>("/api/v1/iam/login", {
        method: "POST",
        body: payload,
    });
}
