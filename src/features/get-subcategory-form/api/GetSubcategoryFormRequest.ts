import {AttributeResponse} from "@/features/get-subcategory-form/model/types";
import {apiRequest} from "@/shared/api";

export async function getSubcategoryFormRequest(subcategoryId: string): Promise<AttributeResponse> {
    return await apiRequest<AttributeResponse>(`/api/v1/catalog/${subcategoryId}/form`, {
        method: 'GET',
    });
}
