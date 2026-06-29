"use client";

import { RegisterFlowWidget } from "@/widgets/register-flow";

export function RegisterPage() {
    return (
        <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-sm rounded-lg border bg-white p-8 shadow-sm">
                <RegisterFlowWidget/>
            </div>
        </div>
    );
}