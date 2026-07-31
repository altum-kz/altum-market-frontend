"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/shared/api";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectValue,
    SelectItem,
} from "@/shared/ui";

interface ReferenceOption {
    id: string; // Или key, зависит от того, что отдает твой бэкенд
    name: string; // Или label/title
}

interface ReferenceSelectProps {
    source: string;
    value: string;
    onChange: (value: string) => void;
}

export function ReferenceSelect({ source, value, onChange }: ReferenceSelectProps) {
    const [options, setOptions] = useState<ReferenceOption[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function fetchReference() {
            setIsLoading(true);
            setError(null);
            try {
                // Путь строится динамически из source
                const data = await apiRequest<ReferenceOption[]>(`/api/v1/reference/${source}/`);
                if (isMounted) {
                    setOptions(data);
                }
            } catch (err) {
                if (isMounted) setError("Ошибка загрузки");
            } finally {
                if (isMounted) setIsLoading(false);
            }
        }

        fetchReference();

        return () => {
            isMounted = false; // Предотвращаем обновление стейта, если компонент размонтировался
        };
    }, [source]);

    return (
        <Select value={value} onValueChange={onChange} disabled={isLoading || !!error}>
            <SelectTrigger className="w-full">
                <SelectValue
                    placeholder={
                        isLoading ? "Загрузка..." :
                            error ? error :
                                "Выберите значение"
                    }
                />
            </SelectTrigger>

            <SelectContent>
                {options.map((option) => (
                    <SelectItem key={option.id} value={String(option.id)}>
                        {option.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}