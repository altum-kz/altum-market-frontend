import { ReactNode } from "react";
import { Header } from "@/widgets/header";

interface BaseLayoutProps {
    children: Readonly<ReactNode>;
}

export function BaseLayout({ children }: BaseLayoutProps) {
    return (
        <div className="flex flex-col min-h-screen bg-[#f5f5f5]">
            <Header />
            <main className="flex flex-1 w-full max-w-[1344px] mx-auto px-4 md:px-8">
                {children}
            </main>
        </div>
    );
}
