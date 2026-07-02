import {useEffect, useState} from "react";
import {TaxpayerResponse} from "@/features/verify-taxpayer";
import {VerifyTaxpayerForm} from "@/features/verify-taxpayer";
import {CompleteVendorForm} from "@/features/complete-vendor";
import {useRouter} from "next/navigation";

export function VendorOnboarding() {
    const [step, setStep] = useState<"verifying" | "completing" | "success">("verifying");
    const [taxpayer, setTaxpayer] = useState<TaxpayerResponse | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (step === "success") {
            router.push("/dashboard");
        }
    }, [step, router]);

    if (step === "verifying") {
        return (
            <VerifyTaxpayerForm
                onVerified={(data) => {
                    setTaxpayer(data);
                    setStep("completing");
                }}
            />
        );
    }

    if (step === "completing" && taxpayer) {
        return (
            <CompleteVendorForm
                taxpayer={taxpayer}
                onSuccess={() => setStep("success")}
            />
        );
    }

    return null;
}