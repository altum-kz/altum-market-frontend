"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAccount } from "@/shared/api/auth";
import { useSessionStore } from "@/entities/session";
// Достаем Input вместе с Button из нашего единого index.ts
import { Button, Input } from "@/shared/components/ui";

export function LoginForm() {
    const router = useRouter();
    const { setIsAuthenticated } = useSessionStore();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Заполните все поля");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            await loginAccount({ email, raw_password: password });

            setIsAuthenticated(true);
            router.push("/cabinet");
            router.refresh();
        } catch (err: any) {
            setError(err?.message || "Неверный логин или пароль");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            {error && (
                <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
                    {error}
                </div>
            )}

            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Email</label>
                {/* Заменили сырой тег на компонент Input */}
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@agrow.asia"
                    disabled={isLoading}
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Пароль</label>
                {/* То же самое здесь. Никаких лишних стилей. */}
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    disabled={isLoading}
                />
            </div>

            <Button
                type="submit"
                variant="default"
                size="lg"
                disabled={isLoading}
                className="w-full mt-2"
            >
                {isLoading ? "Вход..." : "Войти"}
            </Button>
        </form>
    );
}