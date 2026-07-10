"use client";

import {confirmEmailChangeRequest} from "@/features/confirm-email-change/api/ConfirmEmailChangeRequest";
import {OtpForm} from "@/shared/ui";

interface ConfirmEmailChangeFormProps {
    email: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
}

export function ConfirmEmailChangeForm({ email, open, onOpenChange, onSuccess }: ConfirmEmailChangeFormProps) {
    const handleVerify = async (otp_code: string) => {
        await confirmEmailChangeRequest({otp_code: otp_code});
        onSuccess();
        onOpenChange(false);
    }

    const description_message = `Мы отправили код подтверждения на почту: ${email}`;

    return (
        <OtpForm
            open={open}
            onOpenChange={onOpenChange}
            title="Подтверждение почты"
            description={description_message}
            onSubmitCode={handleVerify} />
    );
}