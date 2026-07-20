"use client";

import { confirmOtpRequest } from "@/features/confirm-otp";
import {OtpForm} from "@/shared/ui";

interface ConfirmAccountFormProps {
    accountId: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
}

export function ConfirmOtpForm({ accountId, open, onOpenChange, onSuccess }: ConfirmAccountFormProps) {
    const handleVerify = async (otp_code: string) => {
        await confirmOtpRequest({ account_id: accountId, confirm_code: otp_code });
        console.log("Аккаунт успешно подтвержден!");
        onSuccess();
        onOpenChange(false);
    };

    return (
        <OtpForm
            open={open}
            onOpenChange={onOpenChange}
            title="Подтверждение аккаунта"
            description="Введите код, который мы отправили вам на почту"
            onSubmitCode={handleVerify}
        />
    );
}