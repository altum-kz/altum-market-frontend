import {z} from "zod";
import {genericOtpSchema} from "../model/schema";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ApiError} from "@/shared/api";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/shared/ui/dialog";
import {Field} from "@/shared/ui/field";
import {InputOTP, InputOTPGroup, InputOTPSlot} from "@/shared/ui/input-otp";
import {REGEXP_ONLY_DIGITS} from "input-otp";
import {Button} from "@/shared/ui/button";

type formData = z.infer<typeof genericOtpSchema>

interface OtpFormProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description: string;
    onSubmitCode: (code: string) => Promise<void>;
}

export function OtpForm({ open, onOpenChange, title, description, onSubmitCode }: OtpFormProps) {
    const { control, handleSubmit, setError, reset } = useForm<formData>({
        resolver: zodResolver(genericOtpSchema)
    });

    const onSubmit: SubmitHandler<formData> = async (data) => {
        try {
            await onSubmitCode(data.otp_code);
            reset();
        } catch (error) {
            if (error instanceof ApiError) {
                setError("otp_code", { type: "server", message: error.detail });
            } else {
                setError("otp_code", { type: "deps", message: "Произошла непредвиденная ошибка" });
            }
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">{ title }</DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground">{ description }</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <Field>
                        <Controller
                            name="otp_code"
                            control={control}
                            render={({ field }) => (
                                <div className="flex justify-center w-full">
                                    <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} { ...field }>
                                        <InputOTPGroup className="gap-2">
                                            {[0, 1, 2, 3, 4, 5].map(i => <InputOTPSlot key={i} index={i} />)}
                                        </InputOTPGroup>
                                    </InputOTP>
                                </div>
                            )}
                        />
                    </Field>
                    <Button type="submit" className="bg-brand">
                        Подтвердить
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}