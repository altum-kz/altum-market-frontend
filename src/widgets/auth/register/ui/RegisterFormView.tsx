import React from "react";
import Link from "next/link";
import { RegisterForm } from "@/features/auth/register-form";

export const RegisterFormView = () => {
    return (
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-6">
            <div className="flex flex-col gap-1.5 text-center">
                <h1 className="text-2xl font-bold font-montserrat tracking-tight text-gray-900">
                    Регистрация
                </h1>
                <p className="text-sm text-gray-500">
                    Создайте аккаунт для работы с платформой
                </p>
            </div>

            {/* Внедряем чистую фичу */}
            <RegisterForm />

            <div className="text-center text-sm text-gray-600 mt-2">
                Уже есть аккаунт?{" "}
                <Link href="/login" className="text-blue-600 hover:underline font-medium">
                    Войти
                </Link>
            </div>
        </div>
    );
};