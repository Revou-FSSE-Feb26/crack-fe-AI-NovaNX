"use client";

import { useMemo, useSyncExternalStore } from "react";

import { GuestNav } from "@/components/layout/guest-nav";
import { UserNav } from "@/components/layout/user-nav";
import type { NavigationUser } from "@/types/user-nav";

type StoredUser = {
  name: string;
  email: string;
};

const getInitials = (name: string) => {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return initials || "U";
};

const subscribeToStorage = (onStoreChange: () => void) => {
  window.addEventListener("storage", onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
  };
};

const getUserSnapshot = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    return null;
  }

  return localStorage.getItem("currentUser");
};

const getServerSnapshot = () => null;

export function AppNav() {
  const userSnapshot = useSyncExternalStore(
    subscribeToStorage,
    getUserSnapshot,
    getServerSnapshot,
  );

  const user = useMemo<NavigationUser | null>(() => {
    if (!userSnapshot) {
      return null;
    }

    try {
      const parsedUser = JSON.parse(userSnapshot) as StoredUser;

      return {
        name: parsedUser.name,
        initials: getInitials(parsedUser.name),
      };
    } catch {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("currentUser");
      return null;
    }
  }, [userSnapshot]);

  return user ? <UserNav user={user} /> : <GuestNav />;
}
