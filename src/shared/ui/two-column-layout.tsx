import { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

interface TwoColumnLayoutProps {
    main: ReactNode;
    aside: ReactNode;
    asideWidth?: string; // напр. "w-80"
    className?: string;
}

export function TwoColumnLayout({ main, aside, asideWidth = "w-80", className }: TwoColumnLayoutProps) {
    return (
        <div className={cn("flex gap-4 w-full items-start", className)}>
            <div className="flex-1 flex flex-col gap-4">{main}</div>
            <aside className={cn(asideWidth, "shrink-0 flex flex-col gap-4")}>{aside}</aside>
        </div>
    );
}