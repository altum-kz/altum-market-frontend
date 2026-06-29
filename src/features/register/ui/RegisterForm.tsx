"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { registerFormShema } from "@/features/register";
import { registerRequest } from "@/features/register";
import { Input } from "@/shared/ui";
import { Button } from "@/shared/ui";
import {ApiError} from "@/shared/api";

type formData = z.infer<typeof registerFormShema>

export function RegisterForm({ onSuccess }: { onSuccess: (accountId: string) => void}) {
    const { register, handleSubmit, setError, formState: { errors } } = useForm<formData>({
        resolver: zodResolver(registerFormShema)
    });

    const onSubmit: SubmitHandler<formData> = async (data: formData) => {
        console.log("Данные валидны и готовы к отправке:", data);
        try {
            const accountId = await registerRequest(data);
            onSuccess(accountId)
            console.log("Регистрация прошла успешно!");
        } catch (error) {
            if (error instanceof ApiError) {
                if (error.status === 409) {
                    setError("email", {type: "server", message: error.detail})
                } else {
                    setError("root.serverError", {type: "server", message: error.detail});
                }
            } else {
                setError("root.serverError", {type: "deps", message: "Произошла непредвиденная ошибка"});
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-sm">
            <div>
                <h2 className="text-gray-800 font-bold text-2xl">Регистрация</h2>
            </div>
            { errors.root?.serverError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-500 text-sm">{ errors.root.serverError.message }</p>
                </div>
            )}
            <div>
                <Input { ...register("email") } placeholder="Введите электронную почту"/>
                { errors.email && <p className="text-red-500 text-sm">{ errors.email.message }</p> }
            </div>
            <div>
                <Input { ...register("raw_password")} placeholder="Введите пароль" type="password"/>
                { errors.raw_password && <p className="text-red-500 text-sm">{ errors.raw_password.message }</p> }
            </div>

            <Button type="submit">Зарегистрироваться</Button>
        </form>
    )
}