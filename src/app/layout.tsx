import type { Metadata } from "next";
import { Inter, Geist, Montserrat } from "next/font/google";
import "./globals.css";
import { headers } from "next/headers";
import { Header } from "@/widgets/header"
import { cn } from "@/shared/lib/utils";
import { AuthProvider } from "@/app/providers/AuthProvider";

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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const headersList = await headers();
    const authStatus = headersList.get("x-auth-status");
    const isAuthenticated = authStatus === "authenticated";

    return (
        <html lang="ru" className={cn(inter.variable, montserrat.variable)}>
            <body className="antialiased bg-gray-50 text-gray-900 font-sans min-h-screen flex flex-col">
                <AuthProvider isAuthenticated={isAuthenticated}>
                    <Header />
                    <main className="flex-1 flex flex-col">
                        {children}
                    </main>
                </AuthProvider>
        </body>
        </html>
    );
}
