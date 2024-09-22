"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { motion, stagger, useAnimate } from "framer-motion";
import {
  BellIcon,
  Building2,
  ChevronRightIcon,
  LayoutGridIcon,
  SettingsIcon,
  TrashIcon,
  UserCircleIcon,
} from "lucide-react";

import { cn } from "~/utils/tailwindcss";

function useMenuAnimation(isOpen: boolean) {
  const [scope, animate] = useAnimate();

  const staggerMenuItems = stagger(0.1, { startDelay: 0.15 });

  useEffect(() => {
    animate("#menu-icon", { rotate: isOpen ? 180 : 0 }, { duration: 0.2 });

    animate(
      "ul",
      {
        clipPath: isOpen
          ? "inset(0% 0% 0% 0% round 12px)"
          : "inset(10% 50% 90% 50% round 12px)",
      },
      {
        type: "spring",
        bounce: 0,
        duration: 0.5,
      }
    );

    animate(
      "li",
      isOpen
        ? { opacity: 1, scale: 1, filter: "blur(0px)" }
        : { opacity: 0, scale: 0.3, filter: "blur(20px)" },
      {
        duration: 0.2,
        delay: isOpen ? staggerMenuItems : 0,
      }
    );
  }, [isOpen, animate, staggerMenuItems]);

  return scope;
}

type DropdownMenuProps = {
  containerClassName?: string;
  itemClassName?: string;
};

export default function DropdownMenu({
  containerClassName,
  itemClassName,
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const scope = useMenuAnimation(isOpen);

  const items = [
    { icon: <UserCircleIcon size={16} />, name: "Profile" },
    { icon: <LayoutGridIcon size={16} />, name: "Your applications" },
    { icon: <Building2 size={16} />, name: "Teams" },
    { icon: <BellIcon size={16} />, name: "Notifications" },
    {
      icon: <TrashIcon size={16} />,
      name: "Remove account",
      customStyle:
        "!text-red-500 hover:bg-red-500/10 focus-visible:text-red-500 focus-visible:bg-red-500/10 focus-visible:border-red-500/10",
    },
  ];

  return (
    <nav
      className={cn(
        "max-w-[200px] w-full mx-auto space-y-2",
        containerClassName
      )}
      ref={scope}
    >
      <motion.button
        whileTap={{ scale: 0.97 }}
        className="bg-neutral-900 border border-neutral-800 w-[200px] flex items-center justify-between p-2.5 rounded-xl"
        onClick={() => setIsOpen((prevState) => !prevState)}
      >
        <span className="text-sm font-medium text-neutral-300">Settings</span>
        <div style={{ transformOrigin: "50% 55%" }}>
          <SettingsIcon size={14} className="text-neutral-400" id="menu-icon" />
        </div>
      </motion.button>
      <ul
        className={cn(
          "absolute z-[1] max-w-[200px] w-full space-y-3 p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl",
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
        style={{
          clipPath: "inset(10% 50% 90% 50% round 12px)",
        }}
      >
        {items.map(({ icon, name, customStyle }) => (
          <li key={name}>
            <Link
              href="" // Where you will be sent
              className={cn(
                "group flex items-center gap-2 rounded-md border border-transparent text-neutral-400 hover:text-neutral-300 focus-visible:text-neutral-300 focus-visible:border-neutral-800 focus-visible:outline-none",
                itemClassName,
                customStyle
              )}
            >
              <span>{icon}</span>
              <span className="flex items-center gap-1 text-sm font-medium">
                {name}
                <ChevronRightIcon
                  size={12}
                  className="-translate-x-1 scale-0 opacity-0 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 transition-all"
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
