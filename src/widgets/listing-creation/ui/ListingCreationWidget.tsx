"use client";

import { useState } from "react";
import { Accordion } from "@/shared/ui/accordion";
import { Button } from "@/shared/ui";
import { TwoColumnLayout } from "@/shared/ui/two-column-layout";
import { UploadMediaAccordion } from "./UploadMediaAccordion";
import { CategorySelectionRow } from "./CategorySelectionRow";
import { ListingTipsSidebar } from "./ListingTipsSidebar";
import { DescriptionAccordion } from "./DescriptionAccordion";
import { ListingParamsAccordion } from "./ListingParamsAccordion";
import { ListingAccordionGroups } from "./AttributesAccordion";
import type { components } from "@/shared/api";
import {submitListing} from "@/features/create-listing/model/submitListing";

type ConfirmUploadResponse = components["schemas"]["ConfirmUploadResponse"];
type AttributeGroupFieldsResponse = components["schemas"]["AttributeGroupFieldsResponse"];

interface ListingParams {
    title: string;
    price: number;
    currency: string;
    city_id: string;
}

export function ListingCreationWidget() {
    const [categoryId, setCategoryId] = useState<string>("");
    const [subcategoryId, setSubcategoryId] = useState<string>("");
    const [gallery, setGallery] = useState<ConfirmUploadResponse[]>([]);
    const [description, setDescription] = useState("");
    const [attributes, setAttributes] = useState<Record<string, unknown>>({});
    const [groups, setGroups] = useState<AttributeGroupFieldsResponse[]>([]);

    const [params, setParams] = useState<ListingParams>({
        title: "",
        price: 0,
        currency: "KZT",
        city_id: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [openGroupKeys, setOpenGroupKeys] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handlePublish = async () => {
        const staticFields = {
            category_id: categoryId,
            subcategory_id: subcategoryId,
            title: params.title,
            price: params.price,
            currency: params.currency,
            city_id: params.city_id,
            description: description || null,
            gallery: gallery.map((item) => ({
                media_id: item.media_id,
                media_type: item.media_type,
                media_size: item.media_size,
            })),
        };

        setIsSubmitting(true);
        const result = await submitListing({ staticFields, attributes, attributeGroups: groups });
        console.log("submitListing result:", result); // ВРЕМЕННО
        setIsSubmitting(false);

        if (!result.success) {
            setErrors(result.errors);
            setOpenGroupKeys(
                groups.filter((g) => g.fields.some((f) => result.errors[f.key])).map((g) => g.key)
            );
            return;
        }

        setErrors({});
        // TODO: редирект на "Мои объявления"
    };

    return (
        <div className="flex flex-col gap-4 w-full">
            <h1 className="text-2xl font-bold">Новое объявление</h1>

            <CategorySelectionRow
                onSelectedCategory={setCategoryId}
                onSelectedSubcategory={setSubcategoryId}
            />

            {errors.root && (
                <p className="text-sm text-destructive">{errors.root}</p>
            )}

            <TwoColumnLayout
                main={
                    <>
                        {subcategoryId && (
                            <Accordion type="multiple" className="flex flex-col gap-4">
                                <ListingParamsAccordion value={params} onChange={setParams} />

                                <ListingAccordionGroups
                                    subcategoryId={subcategoryId}
                                    value={attributes}
                                    onChange={setAttributes}
                                    onGroupsLoaded={setGroups}
                                    errors={errors}
                                    openGroupKeys={openGroupKeys}
                                    onOpenGroupKeysChange={setOpenGroupKeys}
                                />

                                <UploadMediaAccordion
                                    value={gallery}
                                    onChange={setGallery}
                                />
                                <DescriptionAccordion value={description} onChange={setDescription} />
                            </Accordion>
                        )}

                            <Button
                                type="button"
                                className="bg-accent-cta h-12 w-full"
                                onClick={handlePublish}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Публикация..." : "Опубликовать"}
                            </Button>
                    </>
                }
                aside={<ListingTipsSidebar />}
            />
        </div>
    );
}