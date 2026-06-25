"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { registerAccount } from "@/shared/api";
import { useSessionStore } from "@/entities/session";
import { Button, Input } from "@/shared/components/ui";

export function RegisterForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const setPendingAccountId = useSessionStore((state) => state.setPendingAccountId);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const data = await registerAccount(email, password);
            setPendingAccountId(data.response);
            router.push("/otp");
        } catch (err: any) {
            setError(err?.message || "Произошла неизвестная ошибка");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            {error && (
                <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg border border-red-100">
                    {error}
                </div>
            )}

            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Email</label>
                {/* Теперь тут аккуратный Shadcn Input */}
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="name@agrow.asia"
                    disabled={isLoading}
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Пароль</label>
                {/* И здесь тоже */}
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    disabled={isLoading}
                />
            </div>

            <Button
                type="submit"
                size="lg"
                disabled={isLoading}
                className="w-full mt-2"
            >
                {isLoading ? "Создание аккаунта..." : "Зарегистрироваться"}
            </Button>
        </form>
    );
}