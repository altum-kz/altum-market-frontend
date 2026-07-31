import {z} from "zod";
import {CreateListingRequest, ListingImage} from "@/features/create-listing/model/types";
import {components} from "@/shared/api";

type AttributeGroupFieldsResponse = components["schemas"]["AttributeGroupFieldsResponse"];

export const listingImageSchema = z.object({
    media_id: z.uuid(),
    media_type: z.string(),
    media_size: z.number(),
}) satisfies z.ZodType<ListingImage>;

export const createListingSchema = z.object({
    category_id: z.uuid(),
    subcategory_id: z.uuid(),
    title: z.string(),
    price: z.number(),
    currency: z.enum(["KZT", "RUB", "USD", "EUR"]),
    city_id: z.uuid(),
    description: z.string().nullable(),
    gallery: z.array(listingImageSchema).min(1).max(10)
}) satisfies z.ZodType<CreateListingRequest>;

export function buildAttributeSchema(groups: AttributeGroupFieldsResponse[]) {
    const shape: Record<string, z.ZodTypeAny> = {};

    for (const group of groups) {
        for (const field of group.fields) {
            let fieldSchema: z.ZodTypeAny =
                field.type === "integer" || field.type === "float"
                ? z.number({ error: "Это поле обязательно" })
                : z.string().min(1, "Это поле обязательно");

            if (!field.required) fieldSchema = fieldSchema.optional().nullable();
            shape[field.key] = fieldSchema;
        }
    }

    return z.object(shape);
}