import {z} from "zod";
import {changePasswordSchema} from "@/features/change-password/model/schema";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {formatDateTime, useEditMode} from "@/shared/lib";
import {changePasswordRequest} from "@/features/change-password/api/ChangePasswordRequest";
import {ApiError} from "@/shared/api";
import {Button, Field, FieldError, FieldLabel, Input} from "@/shared/ui";

interface ChangePasswordFormProps {
    passwordChangedAt: string;
    onSuccess: () => void;
}

type formData = z.infer<typeof changePasswordSchema>

export function ChangePasswordForm({ passwordChangedAt, onSuccess }: ChangePasswordFormProps) {
    const { mode, startEdit, cancelEdit, finishEdit } = useEditMode();

    const { register, handleSubmit, setError, formState: { errors } } = useForm<formData>({
        resolver: zodResolver(changePasswordSchema)
    });

    const onSubmit: SubmitHandler<formData> = async (data) => {
        try {
            await changePasswordRequest(data);
            onSuccess();
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
        const passwordChangedPlaceholder = `Дата последнего изменения: ${formatDateTime(passwordChangedAt)}`;

        return (
            <div className="flex justify-between items-start py-2">
                <div className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground font-bold">Пароль</span>
                    <span className="text-sm font-medium">{passwordChangedPlaceholder}</span>
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

            <Field data-invalid={!!errors.raw_password}>
                <FieldLabel>Текущий пароль</FieldLabel>
                <Input {...register("raw_password")} placeholder="Введите текущий пароль" />
                {errors.raw_password && <FieldError errors={[errors.raw_password]} />}
            </Field>

            <Field data-invalid={!!errors.new_password}>
                <FieldLabel>Новый пароль</FieldLabel>
                <Input {...register("new_password")} placeholder="Введите новый пароль" />
                {errors.new_password && <FieldError errors={[errors.new_password]} />}
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