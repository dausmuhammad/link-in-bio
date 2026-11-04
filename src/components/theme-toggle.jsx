"use client";

import { useLanguage } from "@/components/language-provider";
import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
function subscribe(cb) {
  window.addEventListener("themechange", cb);
  return () => window.removeEventListener("themechange", cb);
}
export function ThemeToggle() {
  const { t } = useLanguage();
  const dark = useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.theme === "dark",
    () => false,
  );
  function toggle() {
    const value = dark ? "light" : "dark";
    document.documentElement.dataset.theme = value;
    try {
      localStorage.setItem("linkspace-theme", value);
    } catch {
      /* Theme still applies for this page when storage is unavailable. */
    }
    window.dispatchEvent(new Event("themechange"));
  }
  return (
    <button
      className="icon-button"
      aria-label={t("Toggle color theme")}
      onClick={toggle}
    >
      {dark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
