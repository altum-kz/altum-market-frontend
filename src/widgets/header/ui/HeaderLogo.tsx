import Link from "next/link";

export function HeaderLogo() {
    return (
        <Link href="/" className="text-2xl font-bold -tracking-tight font-montserrat">
            turanga<span className="text-brand">.</span>
        </Link>
    );
}