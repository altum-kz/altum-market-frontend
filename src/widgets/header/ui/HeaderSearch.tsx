import {Search} from "lucide-react";
import {Input} from "@/shared/ui";

export function HeaderSearch() {
    return (
        <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input placeholder="Поиск" className="h-10 pl-9" />
        </div>
    );
}