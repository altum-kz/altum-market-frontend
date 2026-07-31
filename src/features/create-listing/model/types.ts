import {components} from "@/shared/api";

export type PriceCurrency = components["schemas"]["PriceCurrency"];
export type ListingImage = components["schemas"]["ListingImage"];
export type CreateListingRequest = components["schemas"]["CreateListingRequest"];
export type ListingAttributes = Record<string, unknown>;

export type CreateListingStaticFields = Omit<
    components["schemas"]["CreateListingRequest"],
    "attributes"
>;

export type ValidationResult =
    | { success: true; data: { static: CreateListingStaticFields; attributes: ListingAttributes } }
    | { success: false; errors: Record<string, string> };