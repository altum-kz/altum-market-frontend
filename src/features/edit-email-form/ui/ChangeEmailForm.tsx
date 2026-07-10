"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { changeEmailSchema } from "../model/schema";
import {requestEmailChange} from "../api/ChangeEmailRequest";
import {useEditMode} from "@/shared/lib";
import {ChangeEmailRequest} from "../model/types";
import {Button, Field, FieldError, FieldLabel, Input} from "@/shared/ui";

interface ChangeEmailFormProps {
    onSuccess: (email: string) => void;
    defaultValues: ChangeEmailRequest;
}

type formData = z.infer<typeof changeEmailSchema>

export function ChangeEmailForm({ onSuccess, defaultValues }: ChangeEmailFormProps) {
    const { mode, startEdit, cancelEdit, finishEdit } = useEditMode();
    const [data, setData] = useState<ChangeEmailRequest>(defaultValues);

    const { register, handleSubmit, formState: { errors } } = useForm<formData>({
        resolver: zodResolver(changeEmailSchema),
        defaultValues: data,
    });

    const onSubmit: SubmitHandler<formData> = async (values) => {
        await requestEmailChange(values);
        setData(values);
        finishEdit();
        onSuccess(values.email);
    }

    if (mode === "view") {
        return (
            <div className="flex justify-between items-start py-2">
                <div className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground font-bold">Электронная почта</span>
                    <span className="text-sm font-medium">{data.email}</span>
                </div>
                <Button
                    type="button"
                    variant="link"
                    className="h-auto p-0 text-sm font-semibold text-brand hover:underline cursor-pointer"
                    onClick={startEdit}
                >
                    Редактировать
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col py-2 gap-4">
            { errors.root?.serverError && (
                <p className="text-sm text-destructive">{ errors.root.serverError.message }</p>
            ) }

            <Field data-invalid={!!errors.email}>
                <FieldLabel>Электронная почта</FieldLabel>
                <Input {...register("email")} placeholder="Введите электронную почту" />
                {errors.email && <FieldError errors={[errors.email]} />}
            </Field>

            <div className="flex gap-4">
                <Button type="button" variant="outline" className="flex-1" onClick={cancelEdit}>
                    Отменить
                </Button>
                <Button type="submit" className="flex-1 bg-brand">
                    Сохранить
                </Button>
            </div>
        </form>
    );
}