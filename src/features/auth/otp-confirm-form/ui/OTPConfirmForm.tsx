"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { verifyOTP } from "@/shared/api";
import { useSessionStore } from "@/entities/session";
import { Button } from "@/shared/components/ui";

export function OTPConfirmForm() {
    const [confirmCode, setConfirmCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();
    const pendingAccountId = useSessionStore((state) => state.pendingAccountId);

    useEffect(() => {
        if (!pendingAccountId) {
            router.push("/register");
        }
    }, [pendingAccountId, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!pendingAccountId || confirmCode.length < 6) return;

        setIsLoading(true);
        setError(null);
        try {
            await verifyOTP(pendingAccountId, confirmCode);
            router.push("/login");
        } catch (err: any) {
            setError(err?.message || "Неверный код подтверждения");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full items-center">
            {error && (
                <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg border border-red-100 w-full text-left">
                    {error}
                </div>
            )}

            <div className="w-full flex flex-col gap-1.5 text-left">
                <label className="text-sm font-medium text-gray-700 text-center">
                    Код подтверждения
                </label>
                <input
                    type="text"
                    maxLength={6}
                    value={confirmCode}
                    // Разрешаем только ввод цифр
                    onChange={(e) => setConfirmCode(e.target.value.replace(/\D/g, ""))}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg text-black text-center text-2xl tracking-[0.4em] font-mono focus:outline-none focus:ring-2 focus:ring-ring bg-white transition-all"
                    placeholder="000000"
                    disabled={isLoading}
                />
            </div>

            <Button
                type="submit"
                size="lg"
                disabled={isLoading || confirmCode.length < 6}
                className="w-full"
            >
                {isLoading ? "Проверка..." : "Подтвердить код"}
            </Button>
        </form>
    );
}