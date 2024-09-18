import {
  BookOpen,
  ChartLine,
  Chat,
  Gear,
  House,
  HouseLine,
  Laptop,
  NoteBlank,
  Package,
  Wallet,
} from "@phosphor-icons/react/dist/ssr";

import type { SidebarNavItem } from "~/types";

export const sidebarLinks: SidebarNavItem[] = [
  {
    title: "MENU",
    items: [
      {
        href: "/admin",
        icon: Laptop,
        title: "Admin Panel",
        authorizeOnly: "ADMIN",
      },
      { href: "/dashboard", icon: House, title: "Dashboard" },
      {
        href: "/dashboard/billing",
        icon: Wallet,
        title: "Billing",
        authorizeOnly: "USER",
      },
      { href: "/dashboard/charts", icon: ChartLine, title: "Charts" },
      {
        href: "/admin/orders",
        icon: Package,
        title: "Orders",
        badge: 2,
        authorizeOnly: "ADMIN",
      },
      {
        href: "/dashboard/posts",
        icon: NoteBlank,
        title: "User Posts",
        authorizeOnly: "USER",
        disabled: true,
      },
    ],
  },
  {
    title: "OPTIONS",
    items: [
      { href: "/dashboard/settings", icon: Gear, title: "Settings" },
      { href: "/", icon: HouseLine, title: "Homepage" },
      { href: "/docs", icon: BookOpen, title: "Documentation" },
      {
        href: "#",
        icon: Chat,
        title: "Support",
        authorizeOnly: "USER",
        disabled: true,
      },
    ],
  },
];
