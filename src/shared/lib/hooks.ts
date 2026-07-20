"use client";

import { useState } from "react";
import { useEffect, RefObject } from "react";

export function useHeaderHeight(ref: RefObject<HTMLElement | null>) {
    useEffect(() => {
        if (!ref.current) return;

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const height = entry.borderBoxSize?.[0]?.blockSize ?? entry.target.getBoundingClientRect().height;

                document.documentElement.style.setProperty(
                    "--header-height",
                    `${height}px`,
                );
            }
        });

        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [ref]);
}

export function useEditMode() {
    const [mode, setMode] = useState<"view" | "edit">("view");

    return {
        mode,
        startEdit: () => setMode("edit"),
        cancelEdit: () => setMode("view"),
        finishEdit: () => setMode("view"),
    };
}