import { z } from "zod";

export const registerFormShema = z.object({
    email: z.string("Некорректный email адрес"),
    raw_password: z.string("Пароль должен содержать минимум 8 и максимум 64 символа").min(8).max(64),
});

