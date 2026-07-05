"use client";

import { useState, useRef, useEffect, type RefObject } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/shared/ui";
import { useCategoryStore } from "@/entities/category";
import { CatalogMegaMenuContent } from "./CatalogMegaMenuContent";

interface HeaderCatalogProps {
    headerRef: RefObject<HTMLElement | null>;
}

export function HeaderCatalog({ headerRef }: HeaderCatalogProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [availableHeight, setAvailableHeight] = useState(0);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const recalcHeight = () => {
        const headerBottom = headerRef.current?.getBoundingClientRect().bottom ?? 0;
        setAvailableHeight(window.innerHeight - headerBottom - 32);
    };

    const handleToggle = () => {
        if (!isOpen) {
            useCategoryStore.getState().fetchTree();
            recalcHeight();
        }
        setIsOpen((prev) => !prev);
    };

    useEffect(() => {
        if (!isOpen) return;

        const handlePointerDown = (event: PointerEvent) => {
            const target = event.target as Node;
            if (menuRef.current?.contains(target) || buttonRef.current?.contains(target)) {
                return;
            }
            setIsOpen(false);
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsOpen(false);
        };

        window.addEventListener("pointerdown", handlePointerDown);
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("resize", recalcHeight);

        return () => {
            window.removeEventListener("pointerdown", handlePointerDown);
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("resize", recalcHeight);
        };
    }, [isOpen]);

    return (
        <>
            <Button
                ref={buttonRef}
                type="button"
                aria-haspopup="true"
                aria-expanded={isOpen}
                className="bg-brand h-10 px-6 cursor-pointer"
                onClick={handleToggle}
            >
                {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
                <span className="font-medium">Каталог</span>
            </Button>

            {isOpen && (
                <div className="absolute top-full left-0 w-full mt-4">
                    <div
                        ref={menuRef}
                        className="max-w-[1280px] mx-auto"
                        style={{ height: availableHeight }}
                    >
                        <CatalogMegaMenuContent onClose={() => setIsOpen(false)} />
                    </div>
                </div>
            )}
        </>
    );
}