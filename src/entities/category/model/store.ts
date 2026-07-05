import { create } from "zustand";
import {CategoryTree} from "@/entities/category/model/types";
import {getCategoryTree} from "@/entities/category/api/GetCategoryTree";

interface CategoryState {
    tree: CategoryTree;
    isLoaded: boolean;
    isLoading: boolean;
    fetchTree: () => Promise<void>;
}

export const useCategoryStore = create<CategoryState>((set, get) => ({
    tree: [],
    isLoaded: false,
    isLoading: false,
    fetchTree: async () => {
        if (get().isLoaded || get().isLoading) return;
        set({ isLoading: true });
        try {
            const tree = await getCategoryTree();
            set({ tree, isLoaded: true });
        } finally {
            set({ isLoading: false });
        }
    },
}));
