import Link from "next/link";

interface CategoryCardProps {
    title: string;
    href: string;
}

export const CategoryCard = ({ title, href }: CategoryCardProps) => {
    return (
        <Link
            href={href}
            className="w-full h-[202px] bg-white rounded-2xl p-6 flex flex-col justify-between border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 group cursor-pointer">
            <h3 className="text-lg font-semibold text-slate-900 leading-snug">
                {title}
            </h3>

            <span className="text-sm font-medium text-emerald-600 flex items-center gap-1 self-end">
                Перейти
                <span className="transform group-hover:translate-x-1 transition-transform duration-200">→</span>
            </span>
        </Link>
    );
};