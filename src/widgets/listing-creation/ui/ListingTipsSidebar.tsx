import { PencilRuler, Camera } from "lucide-react";
import { Card, CardContent } from "@/shared/ui";

export function ListingTipsSidebar() {
    return (
        <>
            <Card>
                <CardContent className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 font-bold">
                        <PencilRuler className="size-4 text-brand" />
                        Объявление
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Полностью заполненное объявление улучшает вашу конверсию и привлекает больше клиентов.
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 font-bold">
                        <Camera className="size-4 text-brand" />
                        Изображения
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Вы можете добавить минимум одно и максимум 10 изображений. Старайтесь выбирать качественные
                        изображения. Это привлекает больше покупателей. Первое изображение будет обложкой.
                    </p>
                </CardContent>
            </Card>
        </>
    );
}