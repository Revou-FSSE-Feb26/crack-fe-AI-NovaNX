
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useSyncExternalStore } from "react";
import { Moon, ShoppingCart, Sun } from "lucide-react";

import bellIcon from "@/assets/icons/BookListCategory/Icon-2.svg";
import nexReadLogo from "@/assets/icons/BookListCategory/source/image.png";
import { HeaderSearch } from "@/components/layout/header-search";
import { Button, buttonVariants } from "@/components/ui/button";
import type { UserNavProps } from "@/types/user-nav";
import { cn } from "@/lib/utils";

const defaultUser = {
  name: "John Doe",
  initials: "JD",
};

const themeChangeEvent = "nexread-theme-change";

const subscribeToTheme = (onStoreChange: () => void) => {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(themeChangeEvent, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(themeChangeEvent, onStoreChange);
  };
};

const getThemeSnapshot = () => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }

  return document.documentElement.classList.contains("dark") ? "dark" : "light";
};

const getServerThemeSnapshot = () => "dark";

export const UserNav = ({
  className,
  cartCount = 3,
  searchPlaceholder = "Search book, author, ISBN...",
  user = defaultUser,
}: UserNavProps) => {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );
  const isDarkTheme = theme === "dark";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkTheme);
  }, [isDarkTheme]);

  const toggleTheme = () => {
    const nextTheme = isDarkTheme ? "light" : "dark";

    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    localStorage.setItem("theme", nextTheme);
    window.dispatchEvent(new Event(themeChangeEvent));
  };

  return (
    <div
      className={cn(
        "relative flex h-[95.4px] min-h-[80px] w-full items-center gap-7 overflow-hidden rounded-[32px] border-[0.9px] border-solid border-palette-indigo-300-20 bg-gray-200 px-[16.9px] text-left font-outfit text-sm text-palette-slate-400 shadow-[0px_25px_50px_-12px_rgba(0,_0,_0,_0.18)] backdrop-blur-2xl before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(105deg,rgba(255,_255,_255,_0.08),rgba(255,_255,_255,_0.02)_42%,rgba(124,_92,_255,_0.08)_100%)] before:content-[''] xl:gap-10",
        className,
      )}
    >
      <Link
        href="/"
        aria-label="NexRead home"
        className="relative z-10 h-[69.6px] w-[180.3px] shrink-0"
      >
        <Image
          src={nexReadLogo}
          alt="nexread logo"
          width={180}
          height={70}
          priority
          className="h-full w-full rounded-[26.4px] object-cover shadow-[0px_10px_15px_-3px_rgba(0,_184,_219,_0.2),_0px_4px_6px_-4px_rgba(0,_184,_219,_0.2)]"
        />
      </Link>

      <HeaderSearch placeholder={searchPlaceholder} />

      <div className="relative z-10 flex h-14 shrink-0 items-center justify-end gap-3 text-center text-[10px] text-[#101632]">
        <Link
          href="/cart"
          aria-label={`Open cart with ${cartCount} items`}
          className={cn(
            buttonVariants({ variant: "outline", size: "icon" }),
            "relative box-border h-14 w-14 rounded-num-30504000 border-[0.9px] border-solid border-palette-indigo-300-20 bg-white/10 shadow-[inset_0_0_0_1px_rgba(255,_255,_255,_0.04)] backdrop-blur-xl hover:border-palette-cyan-300 hover:bg-white/15",
          )}
        >
          <ShoppingCart
            className="h-6 w-6 shrink-0 text-palette-slate-50"
            aria-hidden="true"
          />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-num-30504000 bg-skyblue leading-[15px] font-extrabold shadow-[0px_10px_15px_-3px_rgba(0,_211,_243,_0.3),_0px_4px_6px_-4px_rgba(0,_211,_243,_0.3)]">
              {cartCount}
            </span>
          )}
        </Link>

        <Link
          href="/profile"
          aria-label="Open notifications"
          className={cn(
            buttonVariants({ variant: "outline", size: "icon" }),
            "box-border h-14 w-14 rounded-num-30504000 border-[0.9px] border-solid border-palette-indigo-300-20 bg-white/10 shadow-[inset_0_0_0_1px_rgba(255,_255,_255,_0.04)] backdrop-blur-xl hover:border-palette-cyan-300 hover:bg-white/15",
          )}
        >
          <Image src={bellIcon} alt="" className="size-6" aria-hidden="true" />
        </Link>

        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label={`Switch to ${isDarkTheme ? "light" : "dark"} theme`}
          onClick={toggleTheme}
          className="box-border h-14 w-14 rounded-num-30504000 border-[0.9px] border-solid border-palette-indigo-300-20 bg-white/10 text-palette-slate-50 shadow-[inset_0_0_0_1px_rgba(255,_255,_255,_0.04)] backdrop-blur-xl hover:border-palette-cyan-300 hover:bg-white/15 hover:text-palette-cyan-300 focus-visible:border-palette-cyan-300 focus-visible:text-palette-cyan-300 focus-visible:ring-palette-cyan-300/30 active:border-palette-cyan-300 active:text-palette-cyan-300"
        >
          {isDarkTheme ? (
            <Sun className="size-6" aria-hidden="true" />
          ) : (
            <Moon className="size-6" aria-hidden="true" />
          )}
        </Button>

        <Link
          href="/profile"
          aria-label="Open profile"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "box-border h-14 min-w-[170px] justify-start gap-3 rounded-num-30504000 border-[0.9px] border-solid border-palette-indigo-300-20 bg-white/10 py-1.5 pr-5 pl-1.5 text-xs text-palette-slate-50 shadow-[inset_0_0_0_1px_rgba(255,_255,_255,_0.04)] backdrop-blur-xl hover:border-palette-cyan-300 hover:bg-white/15",
          )}
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-num-30504000 [background:linear-gradient(135deg,_#4ddeff,_#55d6ff_7.14%,_#5bcdff_14.29%,_#61c5ff_21.43%,_#65bcff_28.57%,_#69b3ff_35.71%,_#6dabff_42.86%,_#70a2ff_50%,_#7399ff_57.14%,_#758fff_64.29%,_#7786ff_71.43%,_#797cff_78.57%,_#7a72ff_85.71%,_#7b67ff_92.86%,_#7c5cff)] text-sm font-extrabold leading-4">
            {user.initials}
          </span>
          <span className="flex flex-col items-center text-[17px] text-palette-slate-50">
            <b className="relative leading-5">{user.name}</b>
          </span>
        </Link>
      </div>
    </div>
  );
};
