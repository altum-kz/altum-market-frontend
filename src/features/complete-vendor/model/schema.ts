import {z} from "zod";

export const completeVendorSchema = z.object({
    contact_last_name: z.string().min(2),
    contact_first_name: z.string().min(2),
    legal_address: z.string(),
});

