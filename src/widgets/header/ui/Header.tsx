import {HeaderLogo} from "../ui/HeaderLogo";
import {HeaderNav} from "../ui/HeaderNav";
import {HeaderCatalog} from "../ui/HeaderCatalog";
import {HeaderSearch} from "../ui/HeaderSearch";
import {HeaderAddListing} from "../ui/HeaderAddListing";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full bg-white">
            <div className="max-w-7xl mx-auto flex flex-col gap-4 px-4 md:px-8 py-4">

                <div className="flex items-center justify-between">
                    <HeaderLogo/>

                    <HeaderNav />
                </div>

                <div className="flex items-center gap-4">
                    <HeaderCatalog />

                    <HeaderSearch />

                    <HeaderAddListing />
                </div>

            </div>
        </header>
    );
}