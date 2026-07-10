import {MeResponse} from "@/entities/session";
import {Accordion} from "@/shared/ui/accordion";
import {BasicInfoAccordion} from "@/widgets/account-settings/ui/BasicInfoAccordion";
import {SecurityAccordion} from "@/widgets/account-settings/ui/SecurityAccordion";

interface AccountSettingsWidgetProps {
    data: Exclude<MeResponse, { role: "None" }>;
}

export function AccountSettingsWidget({ data }: AccountSettingsWidgetProps) {
    return (
        <Accordion type="single" collapsible className="flex flex-col gap-4">
            <BasicInfoAccordion data={data} />
            <SecurityAccordion email={data.profile.email} passwordChangedAt={data.profile.password_changed_at}/>
        </Accordion>
    );
}