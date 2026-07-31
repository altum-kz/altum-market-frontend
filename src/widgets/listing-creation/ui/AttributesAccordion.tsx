"use client";

import { SubcategoryForm } from "@/features/get-subcategory-form/ui/SubcategoryForm";
import { getSubcategoryFormRequest } from "@/features/get-subcategory-form/api/GetSubcategoryFormRequest";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/ui/accordion";
import { useEffect, useState } from "react";
import { components } from "@/shared/api";
import { cn } from "@/shared/lib/utils";

type AttributeGroupFieldsResponse = components["schemas"]["AttributeGroupFieldsResponse"];

interface ListingAccordionGroupsProps {
    subcategoryId: string;
    value: Record<string, unknown>;
    onChange: (value: Record<string, unknown>) => void;
    onGroupsLoaded: (groups: AttributeGroupFieldsResponse[]) => void;
    errors: Record<string, string>;
    openGroupKeys: string[];
    onOpenGroupKeysChange: (keys: string[]) => void;
}

export function ListingAccordionGroups({
    subcategoryId,
    value,
    onChange,
    onGroupsLoaded,
    errors,
    openGroupKeys,
    onOpenGroupKeysChange,
}: ListingAccordionGroupsProps) {
    const [groups, setGroups] = useState<AttributeGroupFieldsResponse[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        async function loadGroups() {
            setIsLoading(true);
            try {
                const response = await getSubcategoryFormRequest(subcategoryId);
                setGroups(response.groups);
                onGroupsLoaded(response.groups);
            } finally {
                setIsLoading(false);
            }
        }
        loadGroups();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [subcategoryId]);

    if (isLoading) {
        return <p className="text-sm text-muted-foreground">Загрузка полей...</p>;
    }

    return (
        <Accordion type="multiple" value={openGroupKeys} onValueChange={onOpenGroupKeysChange} className="flex gap-4">
            {groups.map((group) => {
                const hasError = group.fields.some((f) => errors[f.key]);

                return (
                    <AccordionItem
                        key={group.key}
                        value={group.key}
                        className={cn(
                            "bg-white rounded-lg px-6 py-4",
                            hasError && "ring-1 ring-destructive"
                        )}
                    >
                        <AccordionTrigger className="text-base font-bold hover:no-underline cursor-pointer">
                            {group.label}
                        </AccordionTrigger>
                        <AccordionContent className="h-auto flex flex-col gap-4">
                            <SubcategoryForm
                                fields={group.fields}
                                value={value}
                                onChange={onChange}
                                errors={errors}
                            />
                        </AccordionContent>
                    </AccordionItem>
                );
            })}
        </Accordion>
    );
}