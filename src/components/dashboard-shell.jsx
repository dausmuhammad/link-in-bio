"use client";

import { LanguageSelector } from "@/components/language-selector";
import { useLanguage } from "@/components/language-provider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  PanelsTopLeft,
  ArrowUpRight,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
} from "lucide-react";
import { Brand } from "./brand";
import { ThemeToggle } from "./theme-toggle";
export function DashboardShell({ children }) {
  const { t } = useLanguage();
  const path = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className={`dashboard-shell ${collapsed ? "collapsed" : ""}`}>
      <aside className="sidebar">
        <div className="sidebar-brand">
          <Brand />
          <button
            className="icon-button"
            aria-label={t("Collapse sidebar")}
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <PanelLeftOpen size={20} />
            ) : (
              <PanelLeftClose size={20} />
            )}
          </button>
        </div>
        <span className="sidebar-label">{t("YOUR WORKSPACE")}</span>
        <nav>
          {[
            ["/dashboard", "Overview", LayoutDashboard],
            ["/dashboard/builder", "Page builder", PanelsTopLeft],
          ].map(([href, label, Icon]) => (
            <Link
              href={href}
              key={href}
              className={path === href ? "active" : ""}
            >
              <Icon size={20} />
              <span>{t(label)}</span>
            </Link>
          ))}
          <Link href="/alexrivera" target="_blank">
            <ArrowUpRight size={20} />
            <span>{t("Example public page")}</span>
          </Link>
        </nav>
        <div className="sidebar-bottom">
          <div className="plan-card">
            <span className="eyebrow">{t("ROOM TO GROW")}</span>
            <h3>{t("Your next chapter")}</h3>
            <p>{t("Explore what\u2019s planned for Pro.")}</p>
            <Link href="/pricing">{t("Discover Pro \u2192")}</Link>
          </div>
          <Link href="/" className="exit-link">
            <LogOut size={18} />
            <span>{t("Leave demo")}</span>
          </Link>
        </div>
      </aside>
      <div className="workspace">
        <header className="workspace-header">
          <span>
            {t("Workspace")}{" "}
            <span className="muted">
              / {t(path.includes("builder") ? "Page builder" : "Overview")}
            </span>
          </span>
          <div className="nav-actions">
            <span className="demo-badge">{t("DEMO MODE")}</span>
            <LanguageSelector />
            <ThemeToggle />
            <span className="small-avatar">{t("AR")}</span>
          </div>
        </header>
        <div className="demo-banner">
          {t(
            "Development demo \xB7 No login required. Drafts stay in this browser. No live publishing or real analytics.",
          )}
        </div>
        {t(children)}
      </div>
    </div>
  );
}
