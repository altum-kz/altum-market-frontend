import {TaxpayerResponse} from "@/features/verify-taxpayer";
import {z} from "zod";
import {completeVendorSchema} from "../model/schema";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {completeVendorRequest} from "../api/CompleteVendorRequest";
import {
    Button,
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    Field,
    FieldError,
    FieldLabel,
    Input
} from "@/shared/ui";
import {useRouter} from "next/navigation";

interface CompleteVendorFormProps {
    taxpayer: TaxpayerResponse;
    onSuccess: () => void;
}

type formData = z.infer<typeof completeVendorSchema>;

export function CompleteVendorForm({ taxpayer, onSuccess }: CompleteVendorFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<formData>({
        resolver: zodResolver(completeVendorSchema)
    });

    const router = useRouter();

    const onSubmit: SubmitHandler<formData> = async (data) => {
        try {
            await completeVendorRequest({
                legal_name: taxpayer.legal_name,
                tax_id: taxpayer.tax_id,
                legal_form: taxpayer.legal_form,
                ...data
            });
            onSuccess();
        } catch {
            console.error(errors);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Завершите регистрацию</CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col gap-4">
                    <Field>
                        <FieldLabel>Фамилия ответственного лица</FieldLabel>
                        <Input { ...register("contact_last_name") } placeholder="Введите фамилию"/>
                        { errors.contact_last_name && <FieldError errors={[errors.contact_last_name]}/> }
                    </Field>
                    <Field>
                        <FieldLabel>Имя ответственного лица</FieldLabel>
                        <Input { ...register("contact_first_name") } placeholder="Введите имя"/>
                        { errors.contact_first_name && <FieldError errors={[errors.contact_first_name]}/> }
                    </Field>
                    <Field>
                        <FieldLabel>Юридический адрес</FieldLabel>
                        <Input { ...register("legal_address") } placeholder="Введите юридический адрес"/>
                        { errors.legal_address && <FieldError errors={[errors.legal_address]}/> }
                    </Field>
                </CardContent>

                <CardFooter className="w-full flex bg-transparent border-t-0 gap-4 pt-0">
                    <Button className="flex-1 cursor-pointer" variant="outline" type="button" onClick={() => router.push("/onboarding")}>
                        Отменить
                    </Button>
                    <Button type="submit" className="flex-1 cursor-pointer bg-brand">
                        Сохранить
                    </Button>
                </CardFooter>
            </Card>
        </form>
    )
}