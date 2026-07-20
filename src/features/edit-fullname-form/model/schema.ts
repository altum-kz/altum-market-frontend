import {z} from "zod";

export const basicFullnameSchema = z.object({
    lastName: z.string().min(2, "Это поле обязательно"),
    firstName: z.string().min(2, "Это поле обязательно"),
    patronymic: z.string().optional(),
});
