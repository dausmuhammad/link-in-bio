"use client";
import { Languages } from "lucide-react";
import { useLanguage } from "./language-provider";
export function LanguageSelector() {
  const { locale, changeLocale } = useLanguage();
  return (
    <label className="language-selector">
      <Languages size={17} aria-hidden="true" />
      <span className="sr-only">
        {locale === "id" ? "Pilih bahasa" : "Choose language"}
      </span>
      <select
        value={locale}
        onChange={(event) => changeLocale(event.target.value)}
      >
        <option value="id" lang="id">
          Indonesia
        </option>
        <option value="en" lang="en">
          English
        </option>
      </select>
    </label>
  );
}
