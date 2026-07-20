import {AccordionContent, AccordionItem, AccordionTrigger} from "@/shared/ui/accordion";

export function NotificationSettingsAccordion() {
    return (
        <AccordionItem value="notification-settings" className="bg-white rounded-lg px-6 py-4">
            <AccordionTrigger className="text-base font-bold hover:no-underline cursor-pointer">
                Настройки уведомлений
            </AccordionTrigger>
            <AccordionContent className="h-auto flex flex-col gap-2 divide-y divide-border">
                <h3>В разработке</h3>
            </AccordionContent>
        </AccordionItem>
    )
}