import Link from "next/link";
import {Button} from "@/components/ui/button";

export function Header() {
    return (
        <header className="w-full bg-white sticky top-0 z-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">

                    <div className="flex-shrink-0">
                        <Link href="/" className="text-xl font-montserrat font-bold text-gray-900 tracking-normal">
                            Altum<span className="text-brand"> Market</span>
                        </Link>
                    </div>

                    <nav className="hidden md:flex space-x-8">
                        <Link href="/catalog" className="text-sm font-regular text-gray-500 hover:text-gray-900">
                            Каталог
                        </Link>
                        <Link href="/about" className="text-sm font-regular text-gray-500 hover:text-gray-900">
                            О нас
                        </Link>
                        <Link href="/support" className="text-sm font-regular text-gray-500 hover:text-gray-900">
                            Помощь
                        </Link>
                    </nav>

                    <div className="flex items-center space-x-4">
                        <Link href="/cabinet">
                            {/* variant="ghost" — значит кнопка без фона, просто текст, который подсвечивается при наведении */}
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