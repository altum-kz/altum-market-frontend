import {ConfirmUploadResponse} from "@/features/upload-media/model/types";
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/shared/ui/accordion";
import {UploadMediaForm} from "@/features/upload-media";

interface UploadMediaAccordionProps {
    value: ConfirmUploadResponse[];
    onChange: (media: ConfirmUploadResponse[]) => void;
}

export function UploadMediaAccordion({ value, onChange }: UploadMediaAccordionProps) {
    return (
        <AccordionItem value="images" className="bg-white rounded-lg px-6 py-4">
            <AccordionTrigger className="text-base font-bold hover:no-underline cursor-pointer">
                Изображения
            </AccordionTrigger>
            <AccordionContent className="h-auto">
                <UploadMediaForm value={value} onChange={onChange} />
            </AccordionContent>
        </AccordionItem>
    )
}