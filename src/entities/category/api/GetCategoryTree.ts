import {CategoryTree} from "../model/types";
import {apiRequest} from "@/shared/api";

export async function getCategoryTree(): Promise<CategoryTree> {
    return await apiRequest<CategoryTree>(
        "/api/v1/catalog/tree",
        {method: "GET"}
    );
}
