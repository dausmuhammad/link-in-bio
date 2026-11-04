import { LanguageSelector } from "@/components/language-selector";
import { getTranslator } from "@/lib/i18n/server";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  MousePointer2,
  Palette,
  BarChart3,
  Check,
  Globe2,
} from "lucide-react";
import { Brand } from "@/components/brand";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { PublicProfile } from "@/components/public-profile";
import { demoProfile, themes } from "@/lib/demo";
export default async function Home() {
  const t = await getTranslator();
  return (
    <>
      <header className="marketing-nav wrap">
        <Brand />
        <nav>
          <Link href="#features">{t("Features")}</Link>
          <Link href="#templates">{t("Templates")}</Link>
          <Link href="/pricing">{t("Pricing")}</Link>
        </nav>
        <div className="nav-actions">
          <LanguageSelector />
          <ThemeToggle />
          <Link href="/login" className="login-link">
            {t("Log in")}
          </Link>
          <Button asChild>
            <Link href="/signup">
              {t("Get started")} <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </header>
      <main>
        <section className="hero wrap">
          <div>
            <span className="eyebrow">
              <span className="status-dot" />{" "}
              {t("YOUR NEXT CHAPTER STARTS HERE")}
            </span>
            <h1>
              {t("A little space.")}
              <br />
              <span>{t("All of you.")}</span>
            </h1>
            <p>
              {t(
                "Your work, your passions, your next big thing. Bring it all together in one beautiful link that feels like you.",
              )}
            </p>
            <div className="hero-actions">
              <Button asChild>
                <Link href="/dashboard/builder">
                  {t("Make your space")} <ArrowRight size={18} />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/alexrivera">{t("Explore a demo")}</Link>
              </Button>
            </div>
            <p className="helper">
              <Check size={16} />{" "}
              {t("Free to explore. No credit card. Just possibilities.")}
            </p>
            <div className="creator-proof">
              <div className="mini-avatars">
                <span>{t("JL")}</span>
                <span>{t("MK")}</span>
                <span>{t("AN")}</span>
                <span>{t("SR")}</span>
              </div>
              <span>
                {t("Built for people who")}
                <br />
                <strong>{t("make things happen.")}</strong>
              </span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-label">
              <Sparkles size={18} /> {t("Your personality. Front and center.")}
            </div>
            <div className="phone">
              <div className="phone-camera" />
              <PublicProfile profile={demoProfile} compact />
            </div>
            <div className="floating-note">
              <span className="note-icon">
                <Globe2 />
              </span>
              <div>
                <strong>{t("One link. Endless possibilities.")}</strong>
                <p>{t("linkspace / alexrivera")}</p>
              </div>
            </div>
            <span className="visual-caption">
              {t("A live example, made for inspiration")}
            </span>
          </div>
        </section>
        <section className="audience-strip">
          <span>{t("YOUR WORLD, CONNECTED.")}</span>
          <strong>{t("Creators")}</strong>
          <span>✧</span>
          <strong>{t("Freelancers")}</strong>
          <span>✧</span>
          <strong>{t("Small businesses")}</strong>
          <span>✧</span>
          <strong>{t("Big dreamers")}</strong>
        </section>
        <section id="features" className="wrap section">
          <span className="eyebrow">{t("LESS FRICTION. MORE YOU.")}</span>
          <h2>{t("Everything you need to stand out.")}</h2>
          <p className="section-description">
            {t(
              "A simple toolkit for turning a first impression into a lasting connection.",
            )}
          </p>
          <div className="feature-grid">
            {[
              [
                MousePointer2,
                "Make it yours, in minutes",
                "Add your links, tell your story, and see every change as you make it.",
              ],
              [
                Palette,
                "A canvas for your personality",
                "Thoughtful themes, expressive colors, and details that feel like you.",
              ],
              [
                BarChart3,
                "Know what connects",
                "Analytics are coming in Phase 3. This preview never invents your audience.",
              ],
            ].map(([Icon, title, description]) => (
              <article className="card feature" key={title}>
                <span className="feature-icon">
                  <Icon />
                </span>
                <h3>{t(title)}</h3>
                <p>{t(description)}</p>
              </article>
            ))}
          </div>
        </section>
        <section id="templates" className="section template-section">
          <div className="wrap">
            <div className="section-heading">
              <div>
                <span className="eyebrow">
                  {t("A HEAD START, BEAUTIFULLY MADE")}
                </span>
                <h2>{t("Find your kind of space.")}</h2>
              </div>
              <Button variant="outline" asChild>
                <Link href="/dashboard/builder">
                  {t("Try the builder")} <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
            <div className="template-grid">
              {themes.map((theme, i) => (
                <Link
                  href={`/dashboard/builder?theme=${encodeURIComponent(theme)}`}
                  className="template-card"
                  key={theme}
                >
                  <div
                    className={`template-swatch theme-${theme.toLowerCase().replaceAll(" ", "-")}`}
                  >
                    <div className="swatch-avatar">
                      {t(["✳", "✦", "◎", "✧", "☀", "❋"][i])}
                    </div>
                    <span />
                    <span />
                    <span />
                  </div>
                  <h3>{t(theme)}</h3>
                  <p>
                    {t("Start with this look")} <ArrowRight size={14} />
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section className="wrap section">
          <span className="eyebrow">
            {t("FROM IDEA TO \u201CTHAT\u2019S SO YOU\u201D")}
          </span>
          <h2>{t("Three steps. A whole new space.")}</h2>
          <div className="feature-grid">
            {[
              [
                "01",
                "Claim your corner",
                "Choose a username that people will remember.",
              ],
              [
                "02",
                "Bring your world together",
                "Add links, a bio, and your favorite colors.",
              ],
              [
                "03",
                "Share when you’re ready",
                "Public publishing arrives with the full-stack MVP.",
              ],
            ].map(([n, labelText, p]) => (
              <article className="step" key={n}>
                <span>{t(n)}</span>
                <h3>{t(labelText)}</h3>
                <p>{t(p)}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="wrap cta">
          <Sparkles />
          <h2>{t("Good things deserve a little space.")}</h2>
          <p>
            {t(
              "Explore the Free builder. Pro and paid billing are planned, not active.",
            )}
          </p>
          <Button asChild>
            <Link href="/dashboard/builder">
              {t("Create something that\u2019s you")} <ArrowRight size={18} />
            </Link>
          </Button>
          <Link href="/pricing" className="text-link">
            {t("Compare plans")}
          </Link>
        </section>
        <section className="wrap section faq">
          <h2>{t("A few things you might be wondering.")}</h2>
          {[
            [
              "Is LinkSpace ready for production?",
              "This is Phase 1: a functional UI demo. Authentication, database persistence, uploads, and public publishing will be implemented in Phase 2.",
            ],
            [
              "Can I customize my page?",
              "Yes. Explore six themes, edit your profile, add and reorder links, and save a draft in this browser.",
            ],
            [
              "Do I need a paid plan?",
              "No. The demo is free to explore. Payments and subscriptions are not active.",
            ],
          ].map(([q, a]) => (
            <details key={q}>
              <summary>{t(q)}</summary>
              <p>{t(a)}</p>
            </details>
          ))}
        </section>
      </main>
      <footer className="wrap footer">
        <Brand />
        <p>{t("Made for your corner of the internet.")}</p>
        <span>{t("Development preview \xB7 Phase 1")}</span>
      </footer>
    </>
  );
}
