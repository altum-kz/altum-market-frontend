import {Menu} from "lucide-react";
import {Button} from "@/shared/ui";

export function HeaderCatalog() {
    return (
        <Button type="button" className="bg-brand h-10 px-6 cursor-pointer">
            <Menu className="size-6"/>
            <span className="font-medium">Каталог</span>
        </Button>
    );
}