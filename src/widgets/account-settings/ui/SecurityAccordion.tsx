"use client";

import { useState } from "react";
import { AccordionItem, AccordionTrigger, AccordionContent } from "@/shared/ui/accordion";
import { ChangeEmailForm } from "@/features/edit-email-form/ui/ChangeEmailForm";
import { ConfirmEmailChangeForm } from "@/features/confirm-email-change";
import {useRouter} from "next/navigation";

interface SecurityAccordionProps {
    email: string;
}

export function SecurityAccordion({ email }: SecurityAccordionProps) {
    const router = useRouter();

    const [pendingEmail, setPendingEmail] = useState(email);
    const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);

    const handleEmailChangeSuccess = (newEmail: string) => {
        setPendingEmail(newEmail);
        setIsOtpModalOpen(true);
    }

    const handleEmailChangeConfirmSuccess = () => {
        return router.replace("/dashboard");
    }

    return (
        <AccordionItem value="security" className="bg-white rounded-xl px-6 py-4 border-none">
            <AccordionTrigger className="text-base font-bold hover:no-underline cursor-pointer">
                Вход и безопасность
            </AccordionTrigger>
            <AccordionContent className="h-auto flex flex-col gap-2 divide-y divide-border">
                <ChangeEmailForm
                    onSuccess={handleEmailChangeSuccess}
                    defaultValues={{email}}
                />

                <ConfirmEmailChangeForm
                    email={pendingEmail}
                    open={isOtpModalOpen}
                    onOpenChange={setIsOtpModalOpen}
                    onSuccess={handleEmailChangeConfirmSuccess}
                />
            </AccordionContent>
        </AccordionItem>
    );
}