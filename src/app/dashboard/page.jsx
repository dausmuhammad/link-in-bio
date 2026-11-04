"use client";

import { useLanguage } from "@/components/language-provider";
import Link from "next/link";
import { useState } from "react";
import {
  Eye,
  MousePointer2,
  TrendingUp,
  Link2,
  ArrowRight,
  Sprout,
  ChartNoAxesCombined,
} from "lucide-react";
import { Button } from "@/components/ui/button";
export default function Dashboard() {
  const { t } = useLanguage();
  const [days, setDays] = useState("30");
  return (
    <main className="dashboard-content">
      <div className="page-heading">
        <div>
          <span className="eyebrow">{t("YOUR CREATIVE CORNER")}</span>
          <h1>
            {t("A fresh start, Alex")} <span className="wave">✦</span>
          </h1>
          <p>
            {t("Big ideas start with a small space. Let\u2019s make yours.")}
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/builder">
            {t("Edit your page")} <ArrowRight size={17} />
          </Link>
        </Button>
      </div>
      <section className="welcome-card">
        <div>
          <span className="eyebrow">{t("MAKE YOURSELF AT HOME")}</span>
          <h2>{t("Your story deserves to be seen.")}</h2>
          <p>
            {t(
              "Bring your links together and shape a page that feels like you.",
            )}
          </p>
          <Button variant="outline" asChild>
            <Link href="/dashboard/builder">
              {t("Open page builder")} <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
        <div className="welcome-art">
          <Sprout size={72} />
          <span>{t("Let good things grow.")}</span>
        </div>
      </section>
      <div className="section-heading">
        <h2>{t("Your space at a glance")}</h2>
        <label className="filter">
          {t("Period")}{" "}
          <select
            aria-label={t("Analytics period")}
            value={days}
            onChange={(e) => setDays(e.target.value)}
          >
            {[7, 30, 90].map((d) => (
              <option value={d} key={d}>
                {t("Last {count} days", { count: d })}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="stats-grid">
        {[
          [Eye, "Page views"],
          [MousePointer2, "Link clicks"],
          [TrendingUp, "Click-through rate"],
          [Link2, "Active links"],
        ].map(([Icon, label]) => (
          <article className="card stat" key={label}>
            <div>
              <span>{t(label)}</span>
              <Icon size={19} />
            </div>
            <strong>—</strong>
            <p>{t("Live data not connected")}</p>
          </article>
        ))}
      </div>
      <div className="overview-grid">
        <section className="card">
          <div className="section-heading">
            <h3>{t("Audience activity")}</h3>
            <span className="helper">
              {t("Last {count} days", { count: days })}
            </span>
          </div>
          <div className="empty-state">
            <ChartNoAxesCombined size={38} />
            <h3>{t("Your next connection starts here.")}</h3>
            <p>
              {t(
                "Real page views and clicks will appear once tracking is connected in Phase 3.",
              )}
            </p>
          </div>
        </section>
        <section className="card">
          <h3>{t("Your launch checklist")}</h3>
          {[
            "Add a little about yourself",
            "Bring your favorite links",
            "Find your signature look",
          ].map((s, i) => (
            <Link className="checklist" href="/dashboard/builder" key={s}>
              <span>{i + 1}</span>
              {t(s)}
              <ArrowRight size={16} />
            </Link>
          ))}
          <p className="helper">
            {t("Publishing becomes available in Phase 2.")}
          </p>
        </section>
      </div>
      <div className="overview-grid">
        <section className="card">
          <h3>{t("Top links")}</h3>
          <p className="empty-copy">
            {t(
              "No tracked clicks yet. Your most visited links will appear here.",
            )}
          </p>
        </section>
        <section className="card">
          <h3>{t("Recent activity")}</h3>
          <p className="empty-copy">
            {t("No live activity yet. Demo edits are not analytics events.")}
          </p>
        </section>
      </div>
    </main>
  );
}
