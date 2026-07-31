"use client";

import { components } from "@/shared/api";
import {
    Field,
    FieldLabel,
    Input,
    Select,
    SelectTrigger,
    SelectContent,
    SelectValue,
    SelectItem,
} from "@/shared/ui";
import {ReferenceSelect} from "@/shared/ui/ReferenceSelect";

type AttributeFieldResponse = components["schemas"]["AttributeFieldResponse"];

interface SubcategoryFormProps {
    fields: AttributeFieldResponse[];
    value: Record<string, unknown>;
    onChange: (value: Record<string, unknown>) => void;
    errors: Record<string, string>;
}

export function SubcategoryForm({
    fields,
    value,
    onChange,
    errors
}: SubcategoryFormProps) {
    function updateField(key: string, fieldValue: unknown) {
        onChange({
            ...value,
            [key]: fieldValue,
        });
    }

    return (
        <div className="flex flex-col gap-4">
            {fields.map((field) => (

                <Field key={field.key}>
                    <FieldLabel>{field.label}</FieldLabel>

                    {(() => {
                        switch (field.type) {
                            case "integer":
                            case "float":
                                return (
                                    <Input
                                        type="number"
                                        value={(value[field.key] as number | undefined) ?? ""}
                                        onChange={(e) =>
                                            updateField(
                                                field.key,
                                                e.target.value === ""
                                                    ? null
                                                    : Number(e.target.value)
                                            )
                                        }
                                    />
                                );

                            case "boolean":
                                return (
                                    <input
                                        type="checkbox"
                                        checked={Boolean(value[field.key])}
                                        onChange={(e) =>
                                            updateField(field.key, e.target.checked)
                                        }
                                    />
                                );

                            case "enumerate":
                                return (
                                    <Select
                                        value={(value[field.key] as string | undefined) ?? ""}
                                        onValueChange={(v) =>
                                            updateField(field.key, v)
                                        }
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Выберите значение" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            {field.options.map((option, index) => (
                                                <SelectItem
                                                    key={index}
                                                    value={String(option.key)}
                                                >
                                                    {String(option.label)}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                );

                            case "reference":
                                if (!field.source) {
                                    return <p className="text-sm text-destructive">Отсутствует источник данных (source)</p>;
                                }
                                return (
                                    <ReferenceSelect
                                        source={field.source}
                                        value={(value[field.key] as string | undefined) ?? ""}
                                        onChange={(v) => updateField(field.key, v)}
                                    />
                                );
                            case "string":
                            default:
                                return (
                                    <Input
                                        value={(value[field.key] as string | undefined) ?? ""}
                                        onChange={(e) =>
                                            updateField(field.key, e.target.value)
                                        }
                                    />
                                );
                        }
                    })()}
                    {errors[field.key] && (
                        <p className="text-sm text-destructive">{errors[field.key]}</p>
                    )}
                </Field>
            ))}
        </div>
    );
}