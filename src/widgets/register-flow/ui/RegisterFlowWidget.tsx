"use client";

import {useState} from "react";
import { RegisterForm } from "@/features/register";
import { ConfirmOtpForm } from "@/features/confirm-otp";
import {useRouter} from "next/navigation";

export function RegisterFlowWidget() {
    const [accountId, setAccountId] = useState<string | null>(null);
    const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);

    const router = useRouter();

    const handleRegisterSuccess = (newAccountId: string) => {
        setAccountId(newAccountId);
        setIsOtpModalOpen(true);
    }

    const handleOtpSuccess = () => {
        router.replace("/onboarding");
    }

    return (
        <>
            <RegisterForm onSuccess={handleRegisterSuccess} />

            { accountId && (
                <ConfirmOtpForm
                    accountId={accountId}
                    open={isOtpModalOpen}
                    onOpenChange={setIsOtpModalOpen}
                    onSuccess={handleOtpSuccess}
                />
            ) }
        </>
    );
}