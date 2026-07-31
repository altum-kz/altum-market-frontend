import { validateListing } from "./validation";
import { createListingRequest } from "../api/CreateListingRequest";
import { ApiError } from "@/shared/api";
import type { ListingAttributes } from "./types";
import type { components } from "@/shared/api";

type AttributeGroupFieldsResponse = components["schemas"]["AttributeGroupFieldsResponse"];

interface SubmitParams {
    staticFields: unknown;
    attributes: ListingAttributes;
    attributeGroups: AttributeGroupFieldsResponse[];
}

export async function submitListing(params: SubmitParams) {
    const validation = validateListing(params);
    if (!validation.success) return validation;

    try {
        await createListingRequest({ ...validation.data.static, attributes: validation.data.attributes });
        return { success: true as const };
    } catch (error) {
        const message = error instanceof ApiError ? error.detail : "Непредвиденная ошибка";
        return { success: false as const, errors: { root: message } };
    }
}