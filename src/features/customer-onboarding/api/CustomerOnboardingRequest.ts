import {apiRequest} from "@/shared/api";
import type { CreateCustomerRequest } from "../model/types";

export async function customerOnboardingRequest(request: CreateCustomerRequest): Promise<void> {
    await apiRequest<void>("/api/v1/customer/", {
        method: "POST",
        body: request
    });
}