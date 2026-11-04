"use client";

import { useLanguage } from "@/components/language-provider";
export default function Loading() {
  const { t } = useLanguage();
  return (
    <main className="center-state" aria-busy="true">
      <div className="loading-orbit">✳</div>
      <p>{t("Making a little space\u2026")}</p>
    </main>
  );
}
