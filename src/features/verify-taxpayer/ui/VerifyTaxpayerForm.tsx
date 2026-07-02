import {z} from "zod";
import {verifyTaxpayerSchema} from "../model/schema";
import {useState} from "react";
import {TaxpayerResponse} from "../model/types";
import {Controller, SubmitHandler, useForm, useWatch} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {verifyTaxpayerRequest} from "../api/VerifyTaxpayerRequest";
import {
    Button,
    Card,
    CardContent, CardFooter,
    CardHeader,
    CardTitle,
    Field,
    FieldContent, FieldError,
    FieldLabel, FieldTitle, Input,
    RadioGroup, RadioGroupItem,
    Spinner
} from "@/shared/ui";

import {TaxpayerConfirmCard, TAX_ID_LABEL} from "../ui/TaxpayerConfirmCard";
import {useRouter} from "next/navigation";

interface VerifyTaxpayerFormProps {
    onVerified: (data: TaxpayerResponse) => void;
}

type formData = z.infer<typeof verifyTaxpayerSchema>

export function VerifyTaxpayerForm({ onVerified }: VerifyTaxpayerFormProps) {
    const [state, setState] = useState<"idle" | "loading" | "found">("idle");
    const [taxpayer, setTaxpayer] = useState<TaxpayerResponse | null>(null);

    const { register, control, handleSubmit, formState: { errors } } = useForm<formData>({
        resolver: zodResolver(verifyTaxpayerSchema),
        defaultValues: {
            legal_form: "IE",
            tax_id: "",
        }
    });

    const selectedOPF = useWatch({control, name: "legal_form"});
    const currentTaxType = TAX_ID_LABEL[selectedOPF]

    const router = useRouter();

    const onSubmit: SubmitHandler<formData> = async (data) => {
        setState("loading");
        try {
            const result = await verifyTaxpayerRequest(data);
            setTaxpayer(result);
            setState("found");
        } catch {
            setState("idle");
        }
    };

    if (state === "loading") {
        return (
            <Card className="w-full max-w-md mx-auto flex align-center justify-center bg-transparent p-0">
                <Button disabled>
                    <Spinner data-icon="inline-start"/>
                    Проверяем ...
                </Button>
            </Card>

        );
    }

    if (state === "found" && taxpayer) {
        return (
            <TaxpayerConfirmCard
                data={taxpayer}
                onBack={() => setState("idle")}
                onConfirm={() => onVerified(taxpayer)}
            />
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md mx-auto">

            <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-bold">Тип продавца</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <Controller
                        name="legal_form"
                        control={control}
                        render={({ field }) => (
                            <RadioGroup value={field.value} onValueChange={field.onChange} className="flex gap-4">
                                <FieldLabel htmlFor="IE" className="flex-1 cursor-pointer block w-full border border-neutral-200 rounded-xl transition-all duration-200 ease-out hover:border-neutral-300 hover:bg-neutral-50/50 active:scale-[0.99] has-[[data-state=checked]]:scale-[1.015] has-[[data-state=checked]]:border-[#076852]/40 has-[[data-state=checked]]:bg-[#076852]/[0.08] has-[[data-state=checked]]:shadow-[0_4px_20px_-4px_rgba(7,104,82,0.08)]">
                                    <Field orientation="horizontal">
                                        <FieldContent>
                                            <FieldTitle>Физическое лицо</FieldTitle>
                                        </FieldContent>
                                        <RadioGroupItem value="IE" id="IE" className="data-[state=checked]:border-[#076852] data-[state=checked]:bg-[#076852]"/>
                                    </Field>
                                </FieldLabel>
                                <FieldLabel htmlFor="LLP" className="flex-1 cursor-pointer block w-full border border-neutral-200 rounded-xl transition-all duration-200 ease-out hover:border-neutral-300 hover:bg-neutral-50/50 active:scale-[0.99] has-[[data-state=checked]]:scale-[1.015] has-[[data-state=checked]]:border-[#076852]/40 has-[[data-state=checked]]:bg-[#076852]/[0.08] has-[[data-state=checked]]:shadow-[0_4px_20px_-4px_rgba(7,104,82,0.08)]">
                                    <Field orientation="horizontal">
                                        <FieldContent>
                                            <FieldTitle>Юридическое лицо</FieldTitle>
                                        </FieldContent>
                                        <RadioGroupItem value="LLP" id="LLP" className="data-[state=checked]:border-[#076852] data-[state=checked]:bg-[#076852]"/>
                                    </Field>
                                </FieldLabel>
                            </RadioGroup>
                        )}
                    />

                    <Field data-invalid={!!errors.tax_id}>
                        <FieldLabel>{ currentTaxType }</FieldLabel>
                        <Input
                            { ...register("tax_id") }
                            placeholder={`Введите ваш ${currentTaxType}`}
                            type="text"
                            inputMode="numeric"
                            maxLength={12}
                        />
                        { errors.tax_id && <FieldError errors={[errors.tax_id]}/> }
                    </Field>
                </CardContent>

                <CardFooter className="w-full flex bg-transparent border-t-0 gap-4 pt-0">
                    <Button className="flex-1 cursor-pointer" type="button" variant="outline" onClick={() => router.push("/onboarding")}>Назад</Button>
                    <Button type="submit" className="flex-1 bg-brand cursor-pointer">Проверить</Button>
                </CardFooter>
            </Card>
        </form>
    );
}