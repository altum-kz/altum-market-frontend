import { CatalogPreviewWidget } from "@/widgets/catalog/ui/CatalogPreviewWidget";
import {BannersWidget} from "@/widgets/banner";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <main className="max-w-7xl mx-auto px-4 xl:px-0 flex flex-col gap-12 w-full">
                <BannersWidget />
                <CatalogPreviewWidget />
            </main>
        </div>
    );
}