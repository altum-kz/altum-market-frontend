"use client";

import {AccordionContent, AccordionItem, AccordionTrigger} from "@/shared/ui/accordion";
import {Textarea} from "@/shared/ui/textarea";

interface DescriptionAccordionProps {
    value: string;
    onChange: (value: string) => void;
}

export function DescriptionAccordion({ value, onChange }: DescriptionAccordionProps) {
    return (
        <AccordionItem value="description" className="bg-white rounded-lg px-6 py-4">
            <AccordionTrigger className="text-base font-bold hover:no-underline cursor-pointer">
                Дополнительное описание
            </AccordionTrigger>
            <AccordionContent className="h-auto">
                <Textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Я продаю ..."
                    className="min-h-40 resize-none"
                />
            </AccordionContent>
        </AccordionItem>
    )
}