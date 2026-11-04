"use client";

import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
export default function Error({ reset }) {
  const { t } = useLanguage();
  return (
    <main className="center-state">
      <h1>{t("Something interrupted your space.")}</h1>
      <p>
        {t("Please try again. Your saved browser draft is kept separately.")}
      </p>
      <Button onClick={reset}>{t("Try again")}</Button>
    </main>
  );
}
