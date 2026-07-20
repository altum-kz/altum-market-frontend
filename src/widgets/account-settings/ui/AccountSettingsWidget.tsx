import {MeResponse} from "@/entities/session";
import {Accordion} from "@/shared/ui/accordion";
import {BasicInfoAccordion} from "@/widgets/account-settings/ui/BasicInfoAccordion";
import {SecurityAccordion} from "@/widgets/account-settings/ui/SecurityAccordion";
import {CompanyAccordion} from "@/widgets/account-settings/ui/CompanyAccordion";
import {NotificationSettingsAccordion} from "@/widgets/account-settings/ui/NotificationSettingsAccordion";

interface AccountSettingsWidgetProps {
    data: Exclude<MeResponse, { role: "None" }>;
}

export function AccountSettingsWidget({ data }: AccountSettingsWidgetProps) {
    const isVendor = data.role === "vendor";

    return (
        <Accordion type="single" collapsible className="flex flex-col gap-4">
            <BasicInfoAccordion data={data} />

            { isVendor && <CompanyAccordion data={data} /> }

            <SecurityAccordion email={data.profile.email} passwordChangedAt={data.profile.password_changed_at}/>

            <NotificationSettingsAccordion />
        </Accordion>
    );
}