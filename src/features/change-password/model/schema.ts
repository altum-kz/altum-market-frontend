import { z } from "zod";

export const changePasswordSchema = z.object({
    raw_password: z.string(),
    new_password: z.string().min(8, "Пароль должен быть не менее 8 символов"),
});
