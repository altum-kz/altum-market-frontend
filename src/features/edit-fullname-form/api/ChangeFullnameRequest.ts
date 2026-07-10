import type { components } from "@/shared/api";
import { apiRequest } from "@/shared/api";
import { BasicFullnameInfo } from "../model/types";

type ChangeCustomerFullnameBody = components["schemas"]["ChangeCustomerFullname"]
type ChangeContactFullnameBody = components["schemas"]["ChangeContactFullnameRequest"]

export async function changeCustomerFullnameRequest(request: BasicFullnameInfo): Promise<void> {
    const body: ChangeCustomerFullnameBody = {
        last_name: request.lastName,
        first_name: request.firstName,
        patronymic: request.patronymic,
    }

    await apiRequest<void>("/api/v1/customer/me/change-fullname", {
        method: "PATCH",
        body: body,
    });
}

export async function changeContactFullnameRequest(request: BasicFullnameInfo): Promise<void> {
    const body: ChangeContactFullnameBody = {
        contact_last_name: request.lastName,
        contact_first_name: request.firstName,
        contact_patronymic: request.patronymic,
    }

    await apiRequest<void>("/vendor/contact-fullname", {
        method: "PATCH",
        body: body,
    });
}
