import { components } from "@/shared/api";

export type TaxpayerResponse = components["schemas"]["TaxpayerResponse"];

export type VerifyTaxpayerParams = {
    tax_id: string;
    legal_form: components["schemas"]["LegalForm"];
};


