import {z} from "zod";

export const changeShopNameSchema= z.object({
    shop_name: z.string().min(2, "Это поле обязательно"),
});
