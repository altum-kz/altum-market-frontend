import { z } from "zod"

export const customerOnboardingFormShema = z.object({
    last_name: z.string().min(2, "Это поле обязательно"),
    first_name: z.string().min(2, "Это поле обязательно"),
});

