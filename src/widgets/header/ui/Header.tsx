import Link from "next/link";
// Если у тебя нет компонента Button, пока замени его на обычный <button> или <Link className="...">
import { Button } from "@/shared/components/ui";

export function Header() {
    return (
        // Шапка липнет к верху экрана
        <header className="w-full bg-white sticky top-0 z-50 border-b border-slate-100 shadow-sm">

            {/* ИСПРАВЛЕНО: Тот самый контейнер на 1280px без лишних отступов на десктопе */}
            <div className="mx-auto max-w-7xl px-4 xl:px-0 w-full">

                <div className="flex h-16 items-center justify-between">
                    {/* Логотип */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-xl font-bold text-gray-900 tracking-normal">
                            Altum<span className="text-brand"> Market</span>
                        </Link>
                    </div>

                    {/* Навигация */}
                    <nav className="hidden md:flex space-x-8">
                        <Link href="/catalog" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                            Каталог
                        </Link>
                        <Link href="/about" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                            О нас
                        </Link>
                        <Link href="/support" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                            Помощь
                        </Link>
                    </nav>

                    {/* Личный кабинет */}
                    <div className="flex items-center space-x-4">
                        <Link href="/cabinet">
                            <Button variant="ghost" className="text-sm font-medium">
                                Личный кабинет
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}