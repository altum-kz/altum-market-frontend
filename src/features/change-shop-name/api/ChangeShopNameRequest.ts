import { apiRequest } from "@/shared/api";
import { ChangeShopNameRequest} from "../model/types";

export async function changeShopNameRequest(request: ChangeShopNameRequest): Promise<void> {
    return await apiRequest<void>("/vendor/shop-name", {
        method: "PATCH",
        body: request,
    });
}
