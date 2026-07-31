import {CreateListingRequest} from "@/features/create-listing/model/types";
import {apiRequest} from "@/shared/api";

export async function createListingRequest(request: CreateListingRequest) {
    return await apiRequest("/listing/", {
        method: "POST",
        body: request,
    });
}
