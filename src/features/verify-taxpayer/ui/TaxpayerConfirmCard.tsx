import {TaxpayerResponse} from "../model/types";
import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/shared/ui";

export const TAX_ID_LABEL: Record<TaxpayerResponse["legal_form"], string> = {
    IE: "ИИН",
    LLP: "БИН",
    JSC: "БИН",
    FARM: "ИИН",
};

export const LEGAL_FORM_LABEL: Record<TaxpayerResponse["legal_form"], string> = {
    IE: "Физическое лицо",
    LLP: "Юридическое лицо",
    JSC: "Юридическое лицо",
    FARM: "Физическое лицо",
};

interface TaxpayerConfirmCardProps {
    data: TaxpayerResponse;
    onBack: () => void;
    onConfirm: () => void;
}

export function TaxpayerConfirmCard({ data, onBack, onConfirm }: TaxpayerConfirmCardProps) {
    const rows = [
        { label: "Компания", value: data.legal_name},
        { label: TAX_ID_LABEL[data.legal_form], value: data.tax_id },
        { label: "ОПФ", value: LEGAL_FORM_LABEL[data.legal_form] },
    ]

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-xl font-bold">Мы нашли вашу компанию</CardTitle>
                <CardDescription>Убедитесь, что данные соответствуют вашей организации</CardDescription>
            </CardHeader>

            <CardContent>
                <dl className="flex flex-col divide-y divide-border gap-2">
                    {rows.map((row) => (
                        <div key={row.label} className="py-2 first:pt-0 last:pb-0 flex flex-col gap-1">
                            <dt className="text-sm text-muted-foreground font-bold">{row.label}</dt>
                            <dd className="text-sm font-medium">{row.value}</dd>
                        </div>
                    ))}
                </dl>
            </CardContent>

            <CardFooter className="flex gap-4 bg-transparent border-t-0">
                <Button variant="outline" onClick={onBack} className="flex-1 cursor-pointer">
                    Назад
                </Button>
                <Button onClick={onConfirm} className="flex-1 bg-brand cursor-pointer">
                    Это моя компания
                </Button>
            </CardFooter>
        </Card>
    )
}