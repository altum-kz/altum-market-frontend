import {Button} from "@/shared/ui";
import {Plus} from "lucide-react";

export function HeaderAddListing() {
    return (
        <Button type="button" className="bg-accent-cta h-10 px-6 cursor-pointer">
            <Plus className="size-6"/>
            <span className="font-medium text-white">Подать объявление</span>
        </Button>
    );
}