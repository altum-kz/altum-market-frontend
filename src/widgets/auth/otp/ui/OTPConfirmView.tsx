import React from "react";
import { OTPConfirmForm } from "@/features/auth/otp-confirm-form";

export const OTPConfirmFormView = () => {
    return (
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-6">
            <div className="flex flex-col gap-1.5 text-center">
                <h1 className="text-2xl font-bold font-montserrat tracking-tight text-gray-900">
                    Подтверждение регистрации
                </h1>
                <p className="text-sm text-gray-500">
                    Мы отправили шестизначный код на ваш Email
                </p>
            </div>

            <OTPConfirmForm />
        </div>
    );
};