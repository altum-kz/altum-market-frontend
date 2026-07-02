import { z } from "zod";

const legalForms = ["IE", "LLP"] as const;

export const verifyTaxpayerSchema = z.object({
    tax_id: z
        .string()
        .min(12, "Поле должно содержать не менее 12 символов")
        .max(12, "Поле должно содержать не более 12 символов"),
    legal_form: z.enum(legalForms, {error: "Выберите форму"}),
});
