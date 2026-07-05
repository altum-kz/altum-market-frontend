"use client";

import Link from "next/link";
import {useSessionStore} from "@/entities/session/model/store";
import {UserMenu} from "@/entities/session/ui/UserMenu";

export function HeaderNav() {
    const session = useSessionStore((state) => state.session)
    return (
        <nav className="hidden md:flex items-center gap-4 text-sm font-medium text-gray-600">
            <Link href="#" className="hover:text-brand transition-colors">Поставщики</Link>
            <Link href="#" className="hover:text-brand transition-colors">О нас</Link>
            <Link href="#" className="hover:text-brand transition-colors">Поддержка</Link>

            { session.status === "resolved" && <UserMenu data={session.data} /> }

            { session.status !== "resolved" && (
                <Link href="/login" className="hover:opacity-75 transition-colors bg-gray-800 text-white py-2 px-4 rounded-lg">
                    Войти
                </Link>
            ) }
        </nav>
    );
}