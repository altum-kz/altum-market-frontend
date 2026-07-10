import { z } from "zod";

export const genericOtpSchema = z.object({
    otp_code: z
        .string()
        .min(6)
        .max(6)
        .regex(/^\d+$/, "Код должен состоять только из цифр"),
});
