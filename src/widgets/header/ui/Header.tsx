"use client";

import { useRef } from "react";
import { HeaderLogo } from "../ui/HeaderLogo";
import { HeaderNav } from "../ui/HeaderNav";
import { HeaderCatalog } from "../ui/HeaderCatalog";
import { HeaderSearch } from "../ui/HeaderSearch";
import { HeaderAddListing } from "../ui/HeaderAddListing";

export function Header() {
    const headerRef = useRef<HTMLElement>(null);

    return (
        <header ref={headerRef} className="relative top-0 z-50 w-full bg-white">
            <div className="max-w-[1344px] mx-auto flex flex-col gap-4 px-8 py-4">
                <div className="flex items-center justify-between">
                    <HeaderLogo />
                    <HeaderNav />
                </div>

                <div className="flex items-center gap-4">
                    <HeaderCatalog headerRef={headerRef} />
                    <HeaderSearch />
                    <HeaderAddListing />
                </div>
            </div>
        </header>
    );
}