"use client";

import { useState } from "react";
import { RegisterForm } from "@/features/register";
import { ConfirmOtpForm } from "@/features/confirm-otp";
import Link from "next/link";

export function RegisterFlowWidget() {
    const [step, setStep] = useState<"register" | "otp" | "success">("register");
    const [accountId, setAccountId] = useState<string | null>(null);

    const handleRegisterSuccess = (newAccountId: string) => {
        setAccountId(newAccountId);
        setStep("otp");
    }

    const handleOtpSuccess = () => {
        setStep("success");
    }

    if (step === "register") {
        return <RegisterForm onSuccess={handleRegisterSuccess}/>;
    }
    
    if (step === "otp" && accountId) {
        return <ConfirmOtpForm accountId={accountId} onSuccess={handleOtpSuccess}/>;
    }

    if (step === "success") {
        return (
            <div className="flex flex-col items-center gap-4 max-w-sm text-center">
                <h2 className="text-2xl font-bold text-green-600">Почта подтверждена!</h2>
                <p className="text-sm text-muted-foreground">
                    Ваш аккаунт успешно создан. Теперь вы можете приступить к работе.
                    <Link href="/login" className="text-sm text-brand">Войти</Link>
                </p>
                {/* Сюда можно добавить кнопку */}
            </div>
        );
    }
    return null;
}