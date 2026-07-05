import { components } from "@/shared/api";

export type SubcategoryResponse = components["schemas"]["SubcategoryResponse"];
export type CategoryResponse = components["schemas"]["CategoryResponse"];
export type RubricResponse = components["schemas"]["RubricResponse"];

export type CategoryTree = RubricResponse[];
