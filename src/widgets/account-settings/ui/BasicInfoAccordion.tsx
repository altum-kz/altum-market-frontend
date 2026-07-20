import {MeResponse} from "@/entities/session";
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/shared/ui/accordion";
import {EditFullnameForm} from "@/features/edit-fullname-form";

interface BasicInfoAccordionProps {
    data: Exclude<MeResponse, { role: "None" }>;
}

export function BasicInfoAccordion({ data }: BasicInfoAccordionProps) {
    const defaultValues = data.role === "customer"
        ? {
            lastName: data.profile.last_name,
            firstName: data.profile.first_name,
            patronymic: data.profile.patronymic ?? undefined,
        }
        : {
            lastName: data.profile.contact_last_name,
            firstName: data.profile.contact_first_name,
            patronymic: data.profile.contact_patronymic ?? undefined,
        };

    return (
        <AccordionItem value="basic-info" className="bg-white rounded-lg px-6 py-4">
            <AccordionTrigger className="text-base font-bold hover:no-underline cursor-pointer">
                Основная информация
            </AccordionTrigger>
            <AccordionContent className="h-auto flex flex-col gap-2 divide-y divide-border">
                <div className="py-2 flex justify-between gap-1">
                    <dl className="flex flex-col gap-1">
                        <dt className="text-sm text-muted-foreground font-bold">Статус</dt>
                        <dd className="text-sm font-medium">
                            {data.role === "customer" ? "Покупатель" : "Продавец"}
                        </dd>
                    </dl>
                </div>

                <EditFullnameForm role={data.role} defaultValues={defaultValues} />
            </AccordionContent>
        </AccordionItem>
    );
}