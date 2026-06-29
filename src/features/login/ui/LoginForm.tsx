"use client";

import { useForm, SubmitHandler} from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Input,
    Button,
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    Field,
    FieldLabel,
    FieldError,
    CardFooter
} from "@/shared/ui";

import { loginFormSchema } from "@/features/login";
import { loginRequest } from "@/features/login";

type formData = z.infer<typeof loginFormSchema>

export function LoginForm() {
    const { register, handleSubmit, setError, formState: { errors } } = useForm<formData>({
        resolver: zodResolver(loginFormSchema)
    });

    const onSubmit: SubmitHandler<formData> = async (data: formData) => {
        await loginRequest(data);
        console.log("Авторизация прошла успешно: ", data);
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Вход</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <Field data-invalid={!!errors.email}>
                        <FieldLabel>Электронная почта</FieldLabel>
                        <Input { ...register("email") } placeholder="Введите вашу электронную почту" type="email"/>
                        { errors.email && <FieldError errors={[errors.email]}/> }
                    </Field>
                    <Field data-invalid={!!errors.raw_password}>
                        <FieldLabel>Пароль</FieldLabel>
                        <Input { ...register("raw_password") } placeholder="Введите ваш пароль" type="password"/>
                        { errors.raw_password && <FieldError errors={[errors.raw_password]}/> }
                    </Field>
                    <Button type="submit">Войти</Button>
                </form>
            </CardContent>
        </Card>
    );
}