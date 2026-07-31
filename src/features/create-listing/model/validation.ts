import {components} from "@/shared/api";
import {ListingAttributes, ValidationResult} from "@/features/create-listing/model/types";
import {buildAttributeSchema, createListingSchema} from "@/features/create-listing/model/schema";

type AttributeGroupFieldsResponse = components["schemas"]["AttributeGroupFieldsResponse"];

interface ValidateParams {
    staticFields: unknown;
    attributes: ListingAttributes;
    attributeGroups: AttributeGroupFieldsResponse[];
}

export function validateListing({ staticFields, attributes, attributeGroups }: ValidateParams): ValidationResult {
    const staticResult = createListingSchema.safeParse(staticFields);
    const attributesResult = buildAttributeSchema(attributeGroups).safeParse(attributes);

    if (staticResult.success && attributesResult.success) {
        return { success: true, data: { static: staticResult.data, attributes: attributesResult.data } };
    }

    const errors: Record<string, string> = {};
    staticResult.success || staticResult.error.issues.forEach((i) => { errors[i.path.join(".")] = i.message; });
    attributesResult.success || attributesResult.error.issues.forEach((i) => { errors[i.path.join(".")] = i.message; });

    return { success: false, errors };
}