import { LoginFormView } from "@/widgets/auth/login";

export function LoginPage() {
    return (
        <main className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center p-4 bg-gray-50">
            <LoginFormView />
        </main>
    );
}