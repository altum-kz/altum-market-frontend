// src/widgets/banners/ui/BannersWidget.tsx
import React from "react";

export const BannersWidget = () => {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <div className="w-full aspect-[628/308] bg-white rounded-2xl flex items-center justify-center border border-slate-100 shadow-sm overflow-hidden">
                <span className="text-xl font-medium text-slate-400">Баннер №1</span>
            </div>

            <div className="w-full aspect-[628/308] bg-white rounded-2xl flex items-center justify-center border border-slate-100 shadow-sm overflow-hidden">
                <span className="text-xl font-medium text-slate-400">Баннер №2</span>
            </div>
        </section>
    );
};