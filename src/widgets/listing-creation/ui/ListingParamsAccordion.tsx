"use client";

import {AccordionContent, AccordionItem, AccordionTrigger} from "@/shared/ui/accordion";
import {Field, FieldLabel, Input, Select, SelectTrigger, SelectValue, SelectContent, SelectItem} from "@/shared/ui";
import {PriceCurrency} from "@/features/create-listing/model/types";
import {ReferenceSelect} from "@/shared/ui/ReferenceSelect";

const CURRENCY_LABELS: Record<PriceCurrency, string> = {
    KZT: "KZT",
    RUB: "RUB",
    USD: "USD",
    EUR: "EUR",
};

interface ListingParams {
    title: string;
    price: number;
    currency: string;
    city_id: string;
}

interface ListingParamsAccordionProps {
    value: ListingParams;
    onChange: (value: ListingParams) => void;
}

export function ListingParamsAccordion({ value, onChange }: ListingParamsAccordionProps) {
    return (
        <AccordionItem value="listing-params" className="bg-white rounded-lg px-6 py-4">
            <AccordionTrigger className="text-base font-bold hover:no-underline cursor-pointer">
                Параметры объявления
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4">
                <Field>
                    <FieldLabel>Заголовок</FieldLabel>
                    <Input
                        value={value.title}
                        onChange={(e) => onChange({ ...value, title: e.target.value })}
                    />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                    <Field>
                        <FieldLabel>Цена</FieldLabel>
                        <Input
                            type="number"
                            value={value.price}
                            onChange={(e) => onChange({ ...value, price: Number(e.target.value) })}
                        />
                    </Field>

                    <Field>
                        <FieldLabel>Валюта</FieldLabel>
                        <Select
                            value={value.currency}
                            onValueChange={(currency) => onChange({ ...value, currency })}
                        >
                            <SelectTrigger className="w-full" size="2xl">
                                <SelectValue placeholder="Выберите валюту" />
                            </SelectTrigger>
                            <SelectContent className="px-2 py-2">
                                {(Object.keys(CURRENCY_LABELS) as PriceCurrency[])
                                    .map((currency) => (
                                    <SelectItem
                                        key={currency}
                                        value={currency}>
                                        {CURRENCY_LABELS[currency]}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </Field>

                    <Field>
                        <FieldLabel>Город</FieldLabel>
                        <ReferenceSelect
                            source="city" // Указываешь точный путь
                            value={value.city_id}
                            onChange={(cityId) => onChange({ ...value, city_id: cityId })}
                        />
                    </Field>
                </div>
            </AccordionContent>
        </AccordionItem>
    );
}