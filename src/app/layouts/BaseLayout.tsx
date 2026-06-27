import { ReactNode } from "react";
import Link from "next/link";

interface BaseLayoutProps {
    children: Readonly<ReactNode>;
}

export function BaseLayout({ children }: BaseLayoutProps) {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <header className="w-full bg-white border-b border-gray-100 h-16">
                <div className="w-full max-w-7xl h-full mx-auto flex items-center justify-between px-4 md:px-8">

                    <div className="text-xl font-bold tracking-tight">
                        <Link href="/">Altum <span className="font-montserrat text-green-600">Market</span></Link>
                    </div>

                    {/* Навигация */}
                    <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
                        <Link href="/catalog" className="hover:text-green-600 transition-colors">
                            Каталог
                        </Link>
                        <Link href="/about" className="hover:text-green-600 transition-colors">
                            О нас
                        </Link>
                        <Link href="/support" className="hover:text-green-600 transition-colors">
                            Поддержка
                        </Link>
                    </nav>

                    {/* Правый блок */}
                    <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
                        <Link href="/cabinet" className="hover:text-black transition-colors">
                            Личный кабинет
                        </Link>

                        <Link
                            href="/new-listing"
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors shadow-sm"
                        >
                            Подать объявление
                        </Link>
                    </div>

                </div>
            </header>

            {/* КОНТЕНТНАЯ ЗОНА: Ограничена так же, как и шапка */}
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8">
                {children}
            </main>
        </div>
    );
}
