"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";

import {
    Card,
    CardContent,
    CardDescription, CardFooter,
    CardHeader,
    CardTitle,
    Field,
    FieldContent,
    FieldDescription,
    FieldLabel,
    FieldTitle,
    RadioGroup,
    RadioGroupItem,
    Button
} from "@/shared/ui";

export function RoleSelectorWidget() {
    const [ selectedRole, setSelectedRole ] = useState<"customer" | "vendor" | null>(null);
    const router = useRouter();

    const handleSelectedRole = () => {
        if (selectedRole === "customer") router.push("/onboarding/customer");
        if (selectedRole === "vendor") router.push("/onboarding/vendor");
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="font-bold text-lg">Деятельность</CardTitle>
                <CardDescription>Укажите как вы будете работать с системой</CardDescription>
            </CardHeader>

            <CardContent>
                <RadioGroup value={selectedRole ?? ""} onValueChange={(value) => setSelectedRole(value as "customer" | "vendor")}>
                    <FieldLabel htmlFor="role-customer" className="cursor-pointer block w-full border border-neutral-200 rounded-xl transition-all duration-200 ease-out hover:border-neutral-300 hover:bg-neutral-50/50 active:scale-[0.99] has-[[data-state=checked]]:scale-[1.015] has-[[data-state=checked]]:border-[#076852]/40 has-[[data-state=checked]]:bg-[#076852]/[0.08] has-[[data-state=checked]]:shadow-[0_4px_20px_-4px_rgba(7,104,82,0.08)]">
                        <Field orientation="horizontal">
                            <FieldContent>
                                <FieldTitle>Покупатель</FieldTitle>
                                <FieldDescription>Ищу технику под личные нужды</FieldDescription>
                            </FieldContent>
                            <RadioGroupItem value="customer" id="role-customer" className="data-[state=checked]:border-[#076852] data-[state=checked]:bg-[#076852]"/>
                        </Field>
                    </FieldLabel>

                    <FieldLabel htmlFor="role-vendor" className="cursor-pointer block w-full border border-neutral-200 rounded-xl transition-all duration-200 ease-out hover:border-neutral-300 hover:bg-neutral-50/50 active:scale-[0.99] has-[[data-state=checked]]:scale-[1.015] has-[[data-state=checked]]:border-[#076852]/40 has-[[data-state=checked]]:bg-[#076852]/[0.08] has-[[data-state=checked]]:shadow-[0_4px_20px_-4px_rgba(7,104,82,0.08)]">
                        <Field orientation="horizontal" className="items-center justify-between w-full">
                            <FieldContent>
                                <FieldTitle>Продавец</FieldTitle>
                                <FieldDescription>Продаю продукцию и услуги</FieldDescription>
                            </FieldContent>
                            <RadioGroupItem value="vendor" id="role-vendor" className="data-[state=checked]:border-[#076852] data-[state=checked]:bg-[#076852]"/>
                        </Field>
                    </FieldLabel>

                </RadioGroup>
            </CardContent>

            <CardFooter className="bg-transparent border-t-0">
                <Button className="w-full" disabled={!selectedRole} onClick={handleSelectedRole}>
                    Продолжить
                </Button>
            </CardFooter>
        </Card>
    );
}