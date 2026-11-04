"use client";

import { useLanguage } from "@/components/language-provider";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function NotFound() {
  const { t } = useLanguage();
  return (
    <main className="center-state">
      <span className="eyebrow">{t("404 \xB7 A LITTLE LOST?")}</span>
      <h1>{t("This space isn\u2019t available.")}</h1>
      <p>{t("The page may not exist or hasn\u2019t been published yet.")}</p>
      <Button asChild>
        <Link href="/">{t("Back to LinkSpace")}</Link>
      </Button>
    </main>
  );
}
