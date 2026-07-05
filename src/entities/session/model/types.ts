import { components } from "@/shared/api";

export type MeResponse =
    | components["schemas"]["CustomerMeResponse"]
    | components["schemas"]["VendorMeResponse"]
    | components["schemas"]["NoRoleMeResponse"];

export type SessionState =
    | { status: "loading" }
    | { status: "unauthenticated" }
    | { status: "resolved"; data: MeResponse };
