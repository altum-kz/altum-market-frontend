import type { Metadata } from "next";
import { LoginPage } from "@/views/login";

export const metadata: Metadata = {
    title: "Вход | Altum Market",
    description: "Авторизация в B2B маркетплейсе",
};

export default function Page() {
    return <LoginPage />;
}