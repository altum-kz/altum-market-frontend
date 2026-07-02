import {TaxpayerResponse, VerifyTaxpayerParams} from "../model/types";
import {apiRequest} from "@/shared/api";

export async function verifyTaxpayerRequest(params: VerifyTaxpayerParams): Promise<TaxpayerResponse> {
    return await apiRequest<TaxpayerResponse>(
        `/vendor/taxpayer/${params.tax_id}?legal_form=${params.legal_form}`,
    );
}