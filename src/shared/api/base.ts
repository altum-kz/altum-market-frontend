const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://api.agrow.asia";

interface RequestOptions {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: unknown;
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const response = await fetch(`${API_URL}/api/v1${path}`, {
        "method": options.method ?? "GET",
        "headers": {
            "Content-Type": "application/json",
            "X-Client-Type": "web",
        },
        "credentials": "include",
        "body": options.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
        throw new Error(`Произошла неизвестная ошибка. Статус: ${response.status}`);
    }

    return await response.json() as T;
}