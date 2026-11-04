"use client";
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { createTranslator, normalizeLocale } from "@/lib/i18n/messages";
const LanguageContext = createContext({
  locale: "id",
  t: createTranslator("id"),
  changeLocale: () => {},
});
export function LanguageProvider({ initialLocale = "id", children }) {
  const [locale, setLocale] = useState(initialLocale);
  const router = useRouter();
  const t = useMemo(() => createTranslator(locale), [locale]);
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  function changeLocale(value) {
    const next = normalizeLocale(value);
    document.cookie = `linkspace-locale=${next}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
    setLocale(next);
    router.refresh();
  }
  return (
    <LanguageContext.Provider value={{ locale, t, changeLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}
export function useLanguage() {
  return useContext(LanguageContext);
}
