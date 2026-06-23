import type { Metadata } from "next";
import {Inter, Geist, Montserrat} from "next/font/google";
import "./globals.css";

import {Header} from "@/widgets/header"
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
    subsets: ["latin", "cyrillic"],
    display: "swap",
    variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Altum Market",
  description: "B2B Marketplace",
};

const montserrat = Montserrat({
    subsets: ["latin", "cyrillic"],
    variable: "--font-montserrat",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru" className={cn(inter.variable, montserrat.variable)}>
            <body className="antialiased bg-gray-50 text-gray-900 font-sans">
                <Header />

                <div className="flex-1">
                    {children}
                </div>
        </body>
        </html>
    );
}
