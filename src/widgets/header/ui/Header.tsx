import Link from "next/link";
import {Avatar, AvatarFallback, AvatarImage, Button} from "@/shared/ui";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto flex items-center justify-between h-header-height px-4 md:px-8">

                <div className="flex flex-1 text-xl font-bold tracking-tight">
                    <Link href="/">
                        Altum <span className="text-brand">Market</span>
                    </Link>
                </div>

                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
                    <Link href="#" className="hover:text-brand transition-colors">Каталог</Link>
                    <Link href="#" className="hover:text-brand transition-colors">О нас</Link>
                    <Link href="#" className="hover:text-brand transition-colors">Помощь</Link>
                </nav>

                <div className="flex flex-1 justify-end items-center gap-4">
                    <Button asChild className="hidden sm:flex px-4 bg-brand hover:bg-brand/90 text-white">
                        <Link href="/create">Подать объявление</Link>
                    </Button>
                    <Avatar className="cursor-pointer hover:opacity-80 transition-opacity" size="lg">
                        <AvatarImage src="" alt="User Avatar" className="grayscale"/>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </header>
    );
}