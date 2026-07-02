import { ApiError } from "./error";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://api.agrow.asia";

interface RequestOptions {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: unknown;
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}, isRetry = false): Promise<T> {
    const response = await fetch(`${API_URL}${path}`, {
        "method": options.method ?? "GET",
        "headers": {
            "Content-Type": "application/json",
            "X-Client-Type": "web",
        },
        "credentials": "include",
        "body": options.body ? JSON.stringify(options.body) : undefined,
    });

    if (response.status === 401 && !isRetry) {
        const refreshed = await tryRefresh();
        if (refreshed) {
            return apiRequest<T>(path, options, true);
        }
    }
    if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));

        throw new ApiError(
            response.status || 500,
            errorBody.detail ?? "Неизвестная ошибка"
        );
    }

    return await response.json() as T;
}

let refreshPromise: Promise<boolean> | null = null;

function tryRefresh(): Promise<boolean> {
    if (!refreshPromise) {
        refreshPromise = fetch(`${API_URL}/api/v1/iam/refresh`, {
            method: "POST",
            credentials: "include",
            headers: {"X-Client-Type": "web"},
        })
            .then((res) => res.ok)
            .finally(() => { refreshPromise = null; });
    }

    return refreshPromise;
}