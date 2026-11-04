"use client";
import { useLanguage } from "./language-provider";
export function BuilderLoading() {
  const { t } = useLanguage();
  return <p className="dashboard-content">{t("Loading builder…")}</p>;
}
