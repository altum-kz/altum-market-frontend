import Link from "next/link";

export function HeaderLogo() {
    return (
        <Link href="/" className="text-2xl tracking-tight font-russo-one">
            August <span className="text-brand">Market</span>
        </Link>
    );
}