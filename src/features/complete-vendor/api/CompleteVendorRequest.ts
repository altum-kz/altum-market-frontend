import {CreateVendorRequest} from "../model/types";
import {apiRequest} from "@/shared/api";

export async function completeVendorRequest(request: CreateVendorRequest): Promise<void> {
    await apiRequest<void>("/vendor/", {
        method: "POST",
        body: request
    });
}