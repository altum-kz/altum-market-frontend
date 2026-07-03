import Link from "next/link";

export function HeaderNav() {
    return (
        <nav className="hidden md:flex items-center gap-4 text-sm font-medium text-gray-600">
            <Link href="#" className="hover:text-brand transition-colors">Поставщики</Link>
            <Link href="#" className="hover:text-brand transition-colors">О нас</Link>
            <Link href="#" className="hover:text-brand transition-colors">Поддержка</Link>
            <Link href="/login" className="hover:opacity-75 transition-colors bg-gray-800 text-white py-2 px-4 rounded-lg">Войти</Link>
        </nav>
    );
}