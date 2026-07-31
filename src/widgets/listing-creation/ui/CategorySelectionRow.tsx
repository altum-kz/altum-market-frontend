"use client";

import { useEffect, useState } from "react";
import { useCategoryStore } from "@/entities/category";
import { Field, FieldLabel, Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from "@/shared/ui";

interface CategorySelectionRowProps {
    onSelectedCategory: (categoryId: string) => void;
    onSelectedSubcategory: (subcategoryId: string) => void;
}

export function CategorySelectionRow({ onSelectedSubcategory, onSelectedCategory }: CategorySelectionRowProps) {
    const tree = useCategoryStore((state) => state.tree);
    const isLoading = useCategoryStore((state) => state.isLoading);
    const fetchTree = useCategoryStore((state) => state.fetchTree);

    const [rubricId, setRubricId] = useState<string>("");
    const [categoryId, setCategoryId] = useState<string>("");
    const [subcategoryId, setSubcategoryId] = useState<string>("");

    useEffect(() => {
        fetchTree();
    }, [fetchTree]);

    const rubrics = tree || [];

    const categories = rubrics.find(
        (r) => r.id === rubricId
    )?.categories || [];

    const subcategories = categories.find(
        (c) => c.id === categoryId
    )?.subcategories || [];

    const handleRubricChange = (id: string) => {
        setRubricId(id);
        setCategoryId("");
        setSubcategoryId("");
    };

    const handleCategoryChange = (id: string) => {
        setCategoryId(id);
        setSubcategoryId("");
        onSelectedCategory(id);
    };

    const handleSubcategoryChange = (id: string) => {
        setSubcategoryId(id);
        onSelectedSubcategory(id);
    };

    if (isLoading || rubrics.length === 0) {
        return (
            <div className="grid grid-cols-3 gap-4 opacity-60 pointer-events-none">
                <Field><FieldLabel>Рубрика</FieldLabel><Select disabled><SelectTrigger className="w-full" size="2xl"><SelectValue placeholder="Загрузка каталога..." /></SelectTrigger></Select></Field>
                <Field><FieldLabel>Категория</FieldLabel><Select disabled><SelectTrigger className="w-full" size="2xl"><SelectValue placeholder="Выберите рубрику" /></SelectTrigger></Select></Field>
                <Field><FieldLabel>Подкатегория</FieldLabel><Select disabled><SelectTrigger className="w-full" size="2xl"><SelectValue placeholder="Выберите категорию" /></SelectTrigger></Select></Field>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-3 gap-4">
            <Field>
                <FieldLabel>Рубрика</FieldLabel>
                <Select value={rubricId} onValueChange={handleRubricChange}>
                    <SelectTrigger className="w-full" size="2xl">
                        <SelectValue placeholder="Выберите рубрику" />
                    </SelectTrigger>
                    <SelectContent position="popper" className="w-[var(--radix-select-trigger-width)]">
                        {rubrics.map((rubric) => (
                            <SelectItem key={rubric.id} value={rubric.id}>
                                {rubric.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </Field>

            <Field>
                <FieldLabel>Категория</FieldLabel>
                <Select value={categoryId} onValueChange={handleCategoryChange} disabled={!rubricId}>
                    <SelectTrigger className="w-full" size="2xl">
                        <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent position="popper" className="w-[var(--radix-select-trigger-width)]">
                        {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                                {category.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </Field>

            <Field>
                <FieldLabel>Подкатегория</FieldLabel>
                <Select value={subcategoryId} onValueChange={handleSubcategoryChange} disabled={!categoryId}>
                    <SelectTrigger className="w-full" size="2xl">
                        <SelectValue placeholder="Выберите подкатегорию" />
                    </SelectTrigger>
                    <SelectContent position="popper" className="w-[var(--radix-select-trigger-width)]">
                        {subcategories.map((sub) => (
                            <SelectItem key={sub.id} value={sub.id}>
                                {sub.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </Field>
        </div>
    );
}
