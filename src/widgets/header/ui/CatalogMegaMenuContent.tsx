"use client";

import { useState } from "react";
import { useCategoryStore } from "@/entities/category";
import type { RubricResponse } from "@/entities/category";

interface CatalogMegaMenuContentProps {
    onClose: () => void;
}

export function CatalogMegaMenuContent({ onClose }: CatalogMegaMenuContentProps) {
    const tree = useCategoryStore((state) => state.tree);
    const isLoading = useCategoryStore((state) => state.isLoading);
    const error = useCategoryStore((state) => state.error);
    const [selectedRubricId, setSelectedRubricId] = useState<string | null>(null);

    const activeRubricId = selectedRubricId ?? tree[0]?.id ?? null;
    const activeRubric: RubricResponse | undefined = tree.find(
        (rubric) => rubric.id === activeRubricId
    );

    if (error) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center gap-4 rounded-2xl bg-white shadow-xl">
                <p className="text-muted-foreground">{error}</p>
                <button
                    type="button"
                    onClick={() => {
                        useCategoryStore.setState({ error: null });
                        void useCategoryStore.getState().fetchTree();
                    }}
                    className="text-sm font-medium text-brand"
                >
                    Повторить
                </button>
            </div>
        );
    }

    if (isLoading || tree.length === 0) {
        return (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground rounded-2xl bg-white shadow-xl">
                Загрузка каталога...
            </div>
        );
    }

    return (
        <div className="w-full h-full flex rounded-2xl bg-white shadow-xl overflow-hidden">
            <aside className="w-[416px] h-full shrink-0 border-r border-border">
                <div className="w-full h-full px-12 py-12 overflow-y-auto">
                    <nav className="flex flex-col gap-4">
                        {tree.map((rubric) => (
                            <button
                                key={rubric.id}
                                type="button"
                                onClick={() => setSelectedRubricId(rubric.id)}
                                className={`text-left font-medium ${
                                    rubric.id === activeRubricId ? "text-brand" : "text-foreground"
                                }`}
                            >
                                {rubric.name}
                            </button>
                        ))}
                    </nav>
                </div>
            </aside>

            <div className="flex-1 h-full">
                <div className="flex justify-between w-full h-full px-12 py-12 overflow-y-auto">
                    {activeRubric?.categories.map((category) => (
                        <div key={category.id} className="mb-8">
                            <h3 className="font-medium mb-4">{category.name}</h3>
                            <ul className="flex flex-col gap-2">
                                {category.subcategories.map((sub) => (
                                    <li key={sub.id}>

                                    <a  href="#"
                                        onClick={onClose}
                                        className="text-sm text-muted-foreground hover:text-brand"
                                        >
                                        {sub.name}
                                    </a>
                                    </li>
                                    ))}
                            </ul>
                        </div>
                        ))}
                </div>
            </div>
        </div>
    );
}