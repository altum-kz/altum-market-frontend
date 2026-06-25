import { CategoryCard } from "@/entities/category";

// Статический массив рубрик строго по макету
const CATEGORIES = [
    { title: "Техника", href: "/catalog/equipment" },
    { title: "Запчасти", href: "/catalog/parts" },
    { title: "Животноводство", href: "/catalog/livestock" },
    { title: "Растениеводство", href: "/catalog/plants" },
    { title: "Услуги", href: "/catalog/services" },
    { title: "Недвижимость", href: "/catalog/land" },
];

export const CatalogPreviewWidget = () => {
    return (
        <section className="w-full">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Каталог
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                {CATEGORIES.map((category) => (
                    <CategoryCard
                        key={category.href}
                        title={category.title}
                        href={category.href}
                    />
                ))}
            </div>
        </section>
    );
};