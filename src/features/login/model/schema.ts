import { z } from "zod";

export const loginFormSchema = z.object({
    email: z.email(),
    raw_password: z.string().min(8).max(64)
});