"use client";

import {useEffect, useState} from "react";
import { RegisterForm } from "@/features/register";
import { ConfirmOtpForm } from "@/features/confirm-otp";
import {useRouter} from "next/navigation";

export function RegisterFlowWidget() {
    const [step, setStep] = useState<"register" | "otp" | "success">("register");
    const [accountId, setAccountId] = useState<string | null>(null);

    const router = useRouter();

    const handleRegisterSuccess = (newAccountId: string) => {
        setAccountId(newAccountId);
        setStep("otp");
    }

    const handleOtpSuccess = () => {
        setStep("success");
    }

    useEffect(() => {
        if (step === "success") {
            router.push("/onboarding");
        }
    }, [step, router]);

    if (step === "register") {
        return <RegisterForm onSuccess={handleRegisterSuccess}/>;
    }
    
    if (step === "otp" && accountId) {
        return <ConfirmOtpForm accountId={accountId} onSuccess={handleOtpSuccess}/>;
    }

    return null;
}