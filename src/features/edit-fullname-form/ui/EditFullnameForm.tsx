"use client";

import { useForm, SubmitHandler } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { basicFullnameSchema } from "../model/schema";
import {BasicFullnameInfo} from "../model/types";
import {useEditMode} from "@/shared/lib";
import {useState} from "react";
import {
    changeContactFullnameRequest,
    changeCustomerFullnameRequest
} from "../api/ChangeFullnameRequest";
import {ApiError} from "@/shared/api";
import {Button, Field, FieldError, FieldLabel, Input} from "@/shared/ui";

interface EditFullnameFormProps {
    role: "customer" | "vendor";
    defaultValues: BasicFullnameInfo;
}

type formData = z.infer<typeof basicFullnameSchema>

export function EditFullnameForm({ role, defaultValues }: EditFullnameFormProps) {
    const { mode, startEdit, cancelEdit, finishEdit } = useEditMode();
    const [data, setData] = useState<BasicFullnameInfo>(defaultValues);

    const { register, handleSubmit, setError, formState: { errors } } = useForm<formData>({
        resolver: zodResolver(basicFullnameSchema),
        defaultValues,
    });

    const onSubmit: SubmitHandler<formData> = async (values) => {
        try {
            const save = role === "customer" ? changeCustomerFullnameRequest : changeContactFullnameRequest;
            await save(values);
            setData(values);
            finishEdit();
        } catch (error) {
            if (error instanceof ApiError) {
                setError("root.serverError", { type: "server", message: error.detail });
            } else {
                setError("root.serverError", { type: "deps", message: "Произошла непредвиденная ошибка" });
            }
        }
    };

    if (mode === "view") {
        const fullName = `${data.lastName} ${data.firstName} ${data.patronymic || ""}`.trim();

        return (
            <div className="flex justify-between items-start py-2">
                <div className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground font-bold">ФИО</span>
                    <span className="text-sm font-medium">{fullName || "Не указано"}</span>
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
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 py-2">
            { errors.root?.serverError && (
                <p className="text-sm text-destructive">{ errors.root.serverError.message }</p>
            ) }

            <Field data-invalid={!!errors.lastName}>
                <FieldLabel>Фамилия</FieldLabel>
                <Input {...register("lastName")} placeholder="Введите фамилию" />
                {errors.lastName && <FieldError errors={[errors.lastName]} />}
            </Field>

            <Field data-invalid={!!errors.firstName}>
                <FieldLabel>Имя</FieldLabel>
                <Input {...register("firstName")} placeholder="Введите имя" />
                {errors.firstName && <FieldError errors={[errors.firstName]} />}
            </Field>

            <Field data-invalid={!!errors.patronymic}>
                <FieldLabel>Отчество</FieldLabel>
                <Input {...register("patronymic")} placeholder="Введите отчество" />
                {errors.patronymic && <FieldError errors={[errors.patronymic]} />}
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
    )
}