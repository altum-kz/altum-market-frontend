"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerOnboardingFormShema } from "../model/schema";

import { customerOnboardingRequest } from "../api/CustomerOnboardingRequest";
import {Card, CardContent, CardHeader, CardTitle, Field, FieldLabel, FieldError, Input, CardFooter, Button, FieldGroup} from "@/shared/ui";

type formData = z.infer<typeof customerOnboardingFormShema>

export function CustomerOnboardingForm() {
    const { register, handleSubmit, setError, formState: { errors } } = useForm<formData>({
        resolver: zodResolver(customerOnboardingFormShema)
    });

    const router = useRouter();

    const onSubmit: SubmitHandler<formData> = async (data: formData) => {
        await customerOnboardingRequest(data);
        router.push("/dashboard");
        console.log("Покупатель создан: ", data);
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-xl font-bold">Заполните форму</CardTitle>
            </CardHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <CardContent>
                    <FieldGroup>
                        <Field data-invalid={!!errors.last_name}>
                            <FieldLabel>Фамилия</FieldLabel>
                            <Input { ...register("last_name") } placeholder="Введите Фамилию"/>
                            { errors.last_name && <FieldError errors={[errors.last_name]}/> }
                        </Field>
                        <Field data-invalid={!!errors.first_name}>
                            <FieldLabel>Имя</FieldLabel>
                            <Input { ...register("first_name") } placeholder="Введите Имя"/>
                            { errors.first_name && <FieldError errors={[errors.first_name]}/> }
                        </Field>
                    </FieldGroup>
                </CardContent>

                <CardFooter className="bg-transparent border-t-0">
                    <Field orientation="horizontal">
                        <Button className="flex-1 cursor-pointer" type="button" onClick={() => router.push("/onboarding")}>Назад</Button>
                        <Button className="flex-1 bg-brand cursor-pointer" type="submit">Сохранить</Button>
                    </Field>
                </CardFooter>
            </form>

        </Card>
    );
}