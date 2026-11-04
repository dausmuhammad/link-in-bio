"use client";
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
  const path = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className={`dashboard-shell ${collapsed ? "collapsed" : ""}`}>
      <aside className="sidebar">
        <div className="sidebar-brand">
          <Brand />
          <button
            className="icon-button"
            aria-label="Collapse sidebar"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <PanelLeftOpen size={20} />
            ) : (
              <PanelLeftClose size={20} />
            )}
          </button>
        </div>
        <span className="sidebar-label">YOUR WORKSPACE</span>
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
              <span>{label}</span>
            </Link>
          ))}
          <Link href="/alexrivera" target="_blank">
            <ArrowUpRight size={20} />
            <span>Example public page</span>
          </Link>
        </nav>
        <div className="sidebar-bottom">
          <div className="plan-card">
            <span className="eyebrow">ROOM TO GROW</span>
            <h3>Your next chapter</h3>
            <p>Explore what’s planned for Pro.</p>
            <Link href="/pricing">Discover Pro →</Link>
          </div>
          <Link href="/" className="exit-link">
            <LogOut size={18} />
            <span>Leave demo</span>
          </Link>
        </div>
      </aside>
      <div className="workspace">
        <header className="workspace-header">
          <span>
            Workspace{" "}
            <span className="muted">
              / {path.includes("builder") ? "Page builder" : "Overview"}
            </span>
          </span>
          <div className="nav-actions">
            <span className="demo-badge">DEMO MODE</span>
            <ThemeToggle />
            <span className="small-avatar">AR</span>
          </div>
        </header>
        <div className="demo-banner">
          Development demo · No login required. Drafts stay in this browser. No
          live publishing or real analytics.
        </div>
        {children}
      </div>
    </div>
  );
}
