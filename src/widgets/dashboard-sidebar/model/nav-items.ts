import {
    Home,
    User,
    Store,
    ListChecks,
    Heart,
    Bell,
    BarChart3,
    Megaphone,
    Headphones,
    type LucideIcon,
} from "lucide-react";

export interface NavItem {
    label: string;
    href: string;
    icon: LucideIcon;
    roles?: ("customer" | "vendor")[];
}

export const NAV_ITEMS: NavItem[] = [
    { label: "Главная", href: "/dashboard", icon: Home },
    { label: "Аккаунт", href: "/dashboard/account", icon: User },
    { label: "Стать продавцом", href: "/onboarding/vendor", icon: Store, roles: ["customer"] },
    { label: "Мои объявления", href: "/dashboard/my-listings", icon: ListChecks, roles: ["vendor"] },
    { label: "Страница продавца", href: "/dashboard/shop", icon: Store, roles: ["vendor"] },
    { label: "Избранное", href: "/dashboard/favorites", icon: Heart },
    { label: "Уведомления", href: "/dashboard/notifications", icon: Bell },
    { label: "Аналитика", href: "/dashboard/analytics", icon: BarChart3, roles: ["vendor"] },
    { label: "Продвижение", href: "/dashboard/promotion", icon: Megaphone, roles: ["vendor"] },
    { label: "Поддержка", href: "/dashboard/support", icon: Headphones },
];