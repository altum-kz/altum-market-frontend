"use client";

import { z } from "zod";
import {useForm, SubmitHandler, Controller} from "react-hook-form";
import { confirmOtpSchema } from "@/features/confirm-otp";
import {zodResolver} from "@hookform/resolvers/zod";
import { confirmOtpRequest } from "@/features/confirm-otp";
import {ApiError} from "@/shared/api";
import {Button, Field, InputOTP, InputOTPGroup, InputOTPSlot} from "@/shared/ui";
import { REGEXP_ONLY_DIGITS } from "input-otp";

type formData = z.infer<typeof confirmOtpSchema>

export function ConfirmOtpForm(
    { accountId, onSuccess }: { accountId: string, onSuccess: () => void }
) {
    const { control, handleSubmit, setError } = useForm<formData>({
        resolver: zodResolver(confirmOtpSchema)
    });

    const onSubmit: SubmitHandler<formData> = async (data: formData) => {
        try {
            await confirmOtpRequest({ account_id: accountId, confirm_code: data.confirm_code });
            onSuccess();
            console.log("Код отправлен. Почта подтверждена!")
        } catch (error) {
            if (error instanceof ApiError) {
                setError("confirm_code", { type: "server", message: error.detail });
            } else {
                setError("root.serverError", { type: "deps", message: "Произошла непредвиденная ошибка" });
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-sm">
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold">Подтверждение аккаунта</h2>
                <p className="text-sm text-muted-foreground">Введите код подтверждения отправленный на вашу электронную почту</p>
            </div>

            <Field>
                <Controller
                    name="confirm_code"
                    control={control}
                    render={({ field }) => (
                        <InputOTP
                            maxLength={6}
                            id="otp-verification"
                            required
                            pattern={REGEXP_ONLY_DIGITS}
                            {...field}
                        >
                            <InputOTPGroup className="gap-2">
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                    )}
                >
                </Controller>
            </Field>

            <Button type="submit" size="default">Подтвердить</Button>
        </form>
    );
}