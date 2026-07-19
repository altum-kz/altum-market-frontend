"use client";

import {MeResponse} from "@/entities/session";
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/shared/ui/accordion";
import {ChangeShopNameForm} from "@/features/change-shop-name/ui/ChangeShopNameForm";

interface CompanyAccordionProps {
    data: Extract<MeResponse, { role: "vendor" }>;
}

export function CompanyAccordion({ data }: CompanyAccordionProps) {
    return (
        <AccordionItem value="company-info" className="bg-white rounded-lg px-6 py-4">
            <AccordionTrigger className="text-base font-bold hover:no-underline cursor-pointer">
                 О компании
            </AccordionTrigger>
            <AccordionContent className="h-auto flex flex-col gap-2 divide-y divide-border">
                <div className="py-2 flex justify-between gap-1">
                    <dl className="flex flex-col gap-1">
                        <dt className="text-sm text-muted-foreground font-bold">Полное наименование организации</dt>
                        <dd className="text-sm font-medium">
                            { data.profile.legal_name }
                        </dd>
                    </dl>
                </div>

                <div className="py-2 flex justify-between gap-1">
                    <dl className="flex flex-col gap-1">
                        <dt className="text-sm text-muted-foreground font-bold">Организационно правовая форма</dt>
                        <dd className="text-sm font-medium">
                            { data.profile.legal_form }
                        </dd>
                    </dl>
                </div>

                <div className="py-2 flex justify-between gap-1">
                    <dl className="flex flex-col gap-1">
                        <dt className="text-sm text-muted-foreground font-bold">ИН</dt>
                        <dd className="text-sm font-medium">
                            { data.profile.tax_id }
                        </dd>
                    </dl>
                </div>

                <div className="py-2 flex justify-between gap-1">
                    <dl className="flex flex-col gap-1">
                        <dt className="text-sm text-muted-foreground font-bold">Юридический адрес</dt>
                        <dd className="text-sm font-medium">
                            { data.profile.legal_address }
                        </dd>
                    </dl>
                </div>

                <ChangeShopNameForm defaultValues={{shop_name: data.profile.shop_name ?? "Ваше название магазина"}} />
            </AccordionContent>
        </AccordionItem>
    )
}