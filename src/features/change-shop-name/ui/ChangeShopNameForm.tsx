"use client";

import {z} from "zod";
import {changeShopNameSchema} from "@/features/change-shop-name/model/schema";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ChangeShopNameRequest} from "@/features/change-shop-name/model/types";
import {useEditMode} from "@/shared/lib";
import {useState} from "react";
import {changeShopNameRequest} from "@/features/change-shop-name/api/ChangeShopNameRequest";
import {Button, Field, FieldError, FieldLabel, Input} from "@/shared/ui";

interface ChangeShopNameFormProps {
    defaultValues?: ChangeShopNameRequest;
}

type formData = z.infer<typeof changeShopNameSchema>

export function ChangeShopNameForm({ defaultValues }: ChangeShopNameFormProps) {
    const { mode, startEdit, cancelEdit, finishEdit } = useEditMode();
    const [ data, setData ] = useState<ChangeShopNameRequest>(defaultValues ?? {shop_name: "Ваше название магазина"});

    const { register, handleSubmit, formState: { errors } } = useForm<formData>({
        resolver: zodResolver(changeShopNameSchema),
        defaultValues: data
    });

    const onSubmit: SubmitHandler<formData> = async (values) => {
        await changeShopNameRequest(values);
        setData(values);
        finishEdit();
    }

    if (mode === "view") {
        return (
            <div className="flex justify-between items-start py-2">
                <div className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground font-bold">Название магазина</span>
                    <span className="text-sm font-medium">{data.shop_name}</span>
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
            <Field data-invalid={!!errors.shop_name}>
                <FieldLabel>Название магазина</FieldLabel>
                <Input {...register("shop_name")} placeholder="Придумайте название для своего магазина" />
                {errors.shop_name && <FieldError errors={[errors.shop_name]} />}
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