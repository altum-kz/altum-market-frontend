"use client";

import { useEffect, useRef, useState } from "react";
import { ImagePlus, X, Loader2 } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { uploadMedia } from "../api/UploadMediaRequest";
import type { MediaItem } from "../model/types";
import type { components } from "@/shared/api";

type ConfirmUploadResponse = components["schemas"]["ConfirmUploadResponse"];

interface UploadMediaFormProps {
    value: ConfirmUploadResponse[];
    onChange: (media: ConfirmUploadResponse[]) => void;
    maxFiles?: number;
}

export function UploadMediaForm({ onChange, maxFiles = 10 }: UploadMediaFormProps) {
    const [items, setItems] = useState<MediaItem[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Синхронизация наружу происходит ПОСЛЕ рендера, а не во время вычисления состояния
    useEffect(() => {
        const confirmed = items
            .filter((item) => item.status === "done" && item.confirmed)
            .map((item) => item.confirmed!);
        onChange(confirmed);
    }, [items, onChange]);

    const handleFiles = (fileList: FileList | null) => {
        if (!fileList || fileList.length === 0) return;

        const availableSlots = maxFiles - items.length;
        const incoming = Array.from(fileList).slice(0, availableSlots);
        if (incoming.length === 0) return;

        const newItems: MediaItem[] = incoming.map((file) => ({
            id: crypto.randomUUID(),
            file,
            previewUrl: URL.createObjectURL(file),
            status: "uploading",
        }));

        setItems((prev) => [...prev, ...newItems]);

        newItems.forEach((item) => {
            uploadMedia(item.file)
                .then((confirmed) => {
                    setItems((prev) =>
                        prev.map((i) =>
                            i.id === item.id ? { ...i, status: "done" as const, confirmed } : i
                        )
                    );
                })
                .catch(() => {
                    setItems((prev) =>
                        prev.map((i) => (i.id === item.id ? { ...i, status: "error" as const } : i))
                    );
                });
        });
    };

    const handleRemove = (id: string) => {
        setItems((prev) => {
            const target = prev.find((i) => i.id === id);
            if (target) URL.revokeObjectURL(target.previewUrl);
            return prev.filter((i) => i.id !== id);
        });
    };

    const canAddMore = items.length < maxFiles;

    return (
        <div className="flex flex-col gap-4">
            {canAddMore && (
                <div
                    onClick={() => inputRef.current?.click()}
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFiles(e.dataTransfer.files); }}
                    className={cn(
                        "flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-16 cursor-pointer transition-colors",
                        isDragging ? "border-brand bg-brand/[0.04]" : "border-border hover:border-neutral-300"
                    )}
                >
                    <ImagePlus className="size-8 text-muted-foreground" />
                    <span className="text-sm font-bold">Добавить фото</span>
                    <span className="text-sm text-muted-foreground">Загрузите или перетащите сюда</span>
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        multiple
                        className="hidden"
                        onChange={(e) => { handleFiles(e.target.files); e.target.value = ""; }}
                    />
                </div>
            )}

            {items.length > 0 && (
                <div className="grid grid-cols-4 gap-4">
                    {items.map((item) => (
                        <div key={item.id} className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                            {/* eslint-disable-next-line @next/next/no-img-element -- blob preview, next/image optimization irrelevant for local object URLs */}
                            <img src={item.previewUrl} alt="" className="w-full h-full object-cover" />

                            {item.status === "uploading" && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                    <Loader2 className="size-6 text-white animate-spin" />
                                </div>
                            )}

                            {item.status === "error" && (
                                <div className="absolute inset-0 flex items-center justify-center bg-destructive/80">
                                    <span className="text-xs font-medium text-white">Ошибка</span>
                                </div>
                            )}

                            <button
                                type="button"
                                onClick={() => handleRemove(item.id)}
                                className="absolute top-1 right-1 flex size-6 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 cursor-pointer"
                            >
                                <X className="size-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}