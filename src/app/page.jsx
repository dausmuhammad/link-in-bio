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
export default function Home() {
  return (
    <>
      <header className="marketing-nav wrap">
        <Brand />
        <nav>
          <Link href="#features">Features</Link>
          <Link href="#templates">Templates</Link>
          <Link href="/pricing">Pricing</Link>
        </nav>
        <div className="nav-actions">
          <ThemeToggle />
          <Link href="/login" className="login-link">
            Log in
          </Link>
          <Button asChild>
            <Link href="/signup">
              Get started <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </header>
      <main>
        <section className="hero wrap">
          <div>
            <span className="eyebrow">
              <span className="status-dot" /> YOUR NEXT CHAPTER STARTS HERE
            </span>
            <h1>
              A little space.
              <br />
              <span>All of you.</span>
            </h1>
            <p>
              Your work, your passions, your next big thing. Bring it all
              together in one beautiful link that feels like you.
            </p>
            <div className="hero-actions">
              <Button asChild>
                <Link href="/dashboard/builder">
                  Make your space <ArrowRight size={18} />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/alexrivera">Explore a demo</Link>
              </Button>
            </div>
            <p className="helper">
              <Check size={16} /> Free to explore. No credit card. Just
              possibilities.
            </p>
            <div className="creator-proof">
              <div className="mini-avatars">
                <span>JL</span>
                <span>MK</span>
                <span>AN</span>
                <span>SR</span>
              </div>
              <span>
                Built for people who
                <br />
                <strong>make things happen.</strong>
              </span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-label">
              <Sparkles size={18} /> Your personality. Front and center.
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
                <strong>One link. Endless possibilities.</strong>
                <p>linkspace / alexrivera</p>
              </div>
            </div>
            <span className="visual-caption">
              A live example, made for inspiration
            </span>
          </div>
        </section>
        <section className="audience-strip">
          <span>YOUR WORLD, CONNECTED.</span>
          <strong>Creators</strong>
          <span>✧</span>
          <strong>Freelancers</strong>
          <span>✧</span>
          <strong>Small businesses</strong>
          <span>✧</span>
          <strong>Big dreamers</strong>
        </section>
        <section id="features" className="wrap section">
          <span className="eyebrow">LESS FRICTION. MORE YOU.</span>
          <h2>Everything you need to stand out.</h2>
          <p className="section-description">
            A simple toolkit for turning a first impression into a lasting
            connection.
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
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>
        <section id="templates" className="section template-section">
          <div className="wrap">
            <div className="section-heading">
              <div>
                <span className="eyebrow">A HEAD START, BEAUTIFULLY MADE</span>
                <h2>Find your kind of space.</h2>
              </div>
              <Button variant="outline" asChild>
                <Link href="/dashboard/builder">
                  Try the builder <ArrowRight size={16} />
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
                      {["✳", "✦", "◎", "✧", "☀", "❋"][i]}
                    </div>
                    <span />
                    <span />
                    <span />
                  </div>
                  <h3>{theme}</h3>
                  <p>
                    Start with this look <ArrowRight size={14} />
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section className="wrap section">
          <span className="eyebrow">FROM IDEA TO “THAT’S SO YOU”</span>
          <h2>Three steps. A whole new space.</h2>
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
            ].map(([n, t, p]) => (
              <article className="step" key={n}>
                <span>{n}</span>
                <h3>{t}</h3>
                <p>{p}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="wrap cta">
          <Sparkles />
          <h2>Good things deserve a little space.</h2>
          <p>
            Explore the Free builder. Pro and paid billing are planned, not
            active.
          </p>
          <Button asChild>
            <Link href="/dashboard/builder">
              Create something that’s you <ArrowRight size={18} />
            </Link>
          </Button>
          <Link href="/pricing" className="text-link">
            Compare plans
          </Link>
        </section>
        <section className="wrap section faq">
          <h2>A few things you might be wondering.</h2>
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
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </section>
      </main>
      <footer className="wrap footer">
        <Brand />
        <p>Made for your corner of the internet.</p>
        <span>Development preview · Phase 1</span>
      </footer>
    </>
  );
}
