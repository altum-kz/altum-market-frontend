import React from "react";
import Link from "next/link";
import { LoginForm } from "@/features/auth/login-form";

export const LoginFormView = () => {
    return (
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-6">
            <div className="flex flex-col gap-1.5 text-center">
                <h1 className="text-2xl font-bold font-montserrat tracking-tight text-gray-900">
                    Вход
                </h1>
                <p className="text-sm text-gray-500">
                    Введите свои данные для доступа в систему
                </p>
            </div>

            {/* Внедряем фичу */}
            <LoginForm />

            <div className="text-center text-sm text-gray-600 mt-2">
                Нет аккаунта?{" "}
                <Link href="/register" className="text-blue-600 hover:underline font-medium">
                    Зарегистрироваться
                </Link>
            </div>
        </div>
    );
};