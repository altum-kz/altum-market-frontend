const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://api.agrow.asia";

interface RequestOptions {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: unknown;
    headers?: Record<string, string>;
}

export async function apiRequest<T>(
    path: string,
    options: RequestOptions = {}
): Promise<T> {
    const { method = "GET", body, headers = {} } = options;

    const response = await fetch(`${API_URL}${path}`, {
        method,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "X-Client-Type": "web",
            ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.detail ?? "Неизвестная ошибка");
    }

    return await response.json() as Promise<T>;
}