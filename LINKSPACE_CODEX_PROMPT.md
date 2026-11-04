# CODEX MASTER PROMPT — LINKSPACE LINK-IN-BIO MICRO SAAS

You are a senior full-stack Next.js engineer, PostgreSQL database architect, product designer, and SaaS security engineer.

Build **LinkSpace**, an original, premium, mobile-first Link-in-Bio Builder Micro SaaS for creators, freelancers, affiliates, and small businesses. Deliver a polished product, not a static mockup. Work incrementally, verify each phase, and stop for approval before advancing.

## 1. Mandatory stack

- Next.js App Router, React, JavaScript only.
- All React components and routes must use `.jsx`; non-React modules/configuration use `.js`. **Never create `.ts` or `.tsx` source files.** Use `jsconfig.json`, not `tsconfig.json`.
- Tailwind CSS, shadcn/ui, Lucide React, Motion for subtle animation.
- PostgreSQL with Prisma ORM; select mutually compatible stable versions and verify setup for the installed Next.js and Node versions.
- Auth.js / NextAuth with Prisma adapter and **database-backed sessions** where supported by the chosen provider. Prefer email/passwordless or OAuth for initial production auth; if using credentials, explicitly implement secure password verification, rate limiting, and a session strategy compatible with the provider rather than assuming database sessions work automatically.
- React Hook Form + Zod for forms, dnd-kit for link ordering, Recharts for analytics.
- Next.js Server Components for read-heavy views, Server Actions for authenticated mutations where appropriate, Route Handlers for public redirects/events/webhooks.
- Use `next/font` for Geist or Inter. Use Next.js Image optimization for uploaded images when appropriate.
- No separate Spring Boot or Express backend; the entire application is implemented in Next.js.

## 2. Product definition

LinkSpace enables a user to register, claim a unique username, create a public page at `/[username]`, upload an avatar, write a bio, manage and reorder links, add social profiles, customize a theme, preview the page live, publish changes, and view analytics. Monetization is planned via Free and Pro tiers.

Prioritize a complete, reliable single-profile-per-account MVP. Model future multi-profile, custom domains, and subscriptions cleanly, but do not prematurely implement them.

## 3. Visual design — extremely important

Design language: **Premium Modern Creator SaaS** — clean, polished, expressive but restrained. Original visual identity, not a clone of Linktree or Beacons.

- Primary indigo/violet with restrained cyan accents; neutral white/light surfaces and deep slate dark surfaces.
- Subtle gradients, refined borders, soft shadows, spacious composition, 12–20px card radii, consistent 8px spacing rhythm.
- Avoid giant empty hero sections, neon overload, excessive glassmorphism, distracting animation, or cramped enterprise tables.
- Beautiful states for hover, active, focus, loading, empty, success, and error.
- WCAG AA contrast where practical; visible keyboard focus, semantic labels, accessible dialogs, reduced-motion support.
- Light and dark themes with a consistent design token system.

### Typography specification

Use Geist or Inter. Define reusable tokens and apply them consistently:

| Element | Desktop | Mobile |
|---|---|---|
| Page title | 28–32px | 24–28px |
| Section title | 20–24px | 18–22px |
| Card title | 16–18px | 16–18px |
| Body text | 14–16px | 14–16px |
| Navigation/buttons | 14–15px | 14–16px |
| Input text | 16px | 16px |
| Helper text | 13–14px | 13–14px |

Use comfortable line-height (~1.5 for body), sensible font weights, readable max-widths, and text wrapping for long URLs. Avoid text below 12px and avoid using tiny text for critical information. Do not scale every heading excessively.

### Responsive specification

Test 375, 390, 768, 1024, and 1440px widths.

- Desktop: collapsible sidebar, topbar, content grid; builder editor beside a sticky phone preview.
- Tablet: adaptive navigation and grids; preview must not cause horizontal overflow.
- Mobile: one-column layout, drawer or bottom navigation where suitable, builder **Edit / Preview** tabs, bottom-safe-area padding, 44px minimum touch targets, no horizontal scroll, responsive dialogs/sheets.
- Public link pages must be especially fast and mobile-first.

## 4. Pages and functional modules

### Marketing

Landing page with navigation, compelling hero, realistic product preview, features, template gallery, how it works, pricing teaser, FAQ, and CTA. Provide an original visual treatment.

### Authentication

Sign up, sign in, sign out, forgot/reset password if password auth is selected, and protected dashboard routes. Include real validation, loading/error states, and secure sessions. Never treat mock authentication as production-ready.

### Dashboard

Overview cards for page views, link clicks, CTR, active links, top links, and recent activity. Provide 7/30/90-day filters and sensible empty states. Never label fabricated analytics as real.

### Link management

Create, edit, delete, enable/disable, reorder links with dnd-kit, title, URL, optional thumbnail/icon. Validate allowed URL schemes (`https:` and `http:` only as appropriate), reject `javascript:` and dangerous schemes, and ensure all mutations belong to the authenticated owner. Persist ordering transactionally.

### Visual builder

Sections: Profile, Links, Socials, Appearance, Settings. Avatar, display name, bio, social URLs, link cards, button shapes, font and color settings. Changes immediately update a local preview; saving persists them. Distinguish unsaved edits from published state. Prevent accidental loss of unsaved changes.

### Theme presets

Minimal White, Midnight Dark, Violet Glow, Ocean Blue, Sunset Gradient, Soft Pastel. Apply accessible foreground/background combinations. Persist user choice.

### Public profile

Dynamic `/<username>` route with avatar, bio, social icons, links, SEO metadata, 404 for unavailable profiles, and a lightweight mobile-first page. Reserve protected routes such as `/login`, `/dashboard`, `/pricing`, `/api`, and `/settings` so usernames cannot shadow app routes.

### Analytics

Track page views and link clicks server-side with basic abuse mitigation, privacy-conscious data collection, and documented limitations. Public link clicks should go through a safe server redirect endpoint that verifies link ownership/publication status, records the event without blocking navigation, and redirects only to validated destinations. Use database aggregates for charts; avoid storing unnecessary personal information. Provide clear definitions of views, clicks, and CTR.

### Settings

Profile settings, username changes with uniqueness validation, account preferences, and destructive-action confirmation. Account deletion must be authorized and remove or anonymize dependent data according to documented retention rules.

### Pricing/subscription preparation

Free and Pro pricing UI, plan comparison, and a feature entitlement layer. Do **not** claim payments work until a real payment provider, verified webhooks, and subscription persistence are implemented. Custom domains and billing are future phases.

## 5. PostgreSQL and Prisma design

Create a clean Prisma schema and migrations for at least:

- User: id, email unique, name, avatar, timestamps.
- Auth.js required models (Account, Session, VerificationToken) according to selected auth strategy.
- Profile: id, userId unique for MVP, username unique case-insensitively (use a normalized username field or PostgreSQL functional index), displayName, bio, avatarUrl, publishedAt, timestamps.
- Link: id, profileId, title, destinationUrl, position, isActive, thumbnailUrl, timestamps.
- SocialLink: id, profileId, platform, destinationUrl, position.
- Theme: id, profileId unique, preset, validated style settings JSON, timestamps.
- PageViewEvent and LinkClickEvent: event ids, profile/link relations, timestamps, minimal attribution fields where justified.
- Subscription/entitlements: optional future-ready model; no fake active billing.

Add appropriate indexes, foreign keys, cascading rules, and uniqueness constraints. Use migrations, not `db push` as the production migration strategy. Provide a seed script for demo/development only. Keep Prisma client initialization safe for Next.js dev hot reload. All database access and authorization happen on the server. Do not expose database credentials to the browser.

## 6. Security and reliability

- Server-side ownership checks on every protected read/write, including Server Actions.
- Validate inputs using Zod at server boundaries; sanitize/escape user content through safe React rendering. No untrusted HTML injection.
- Protect against open redirects, unsafe link protocols, malicious uploads, oversized files, and username route collisions.
- Store uploads in object storage in production; do not rely on local filesystem persistence in serverless hosting. Validate MIME, size, and access policies.
- Use environment variables for DATABASE_URL, auth secret, OAuth/email settings, storage settings, and app base URL. Provide `.env.example`; never commit secrets.
- Apply rate limiting to sensitive endpoints (auth, click tracking, public mutations where applicable).
- Use transactions for multi-row operations; document event analytics accuracy and possible duplicate visits.
- Handle database/network failures gracefully; never silently pretend persistence succeeded.
- Add structured logging without secrets or unnecessary personal data.

## 7. Architecture and folders

Propose a structure similar to:

```text
src/
  app/
    (marketing)/
    (auth)/
    (dashboard)/
    [username]/
    api/
  components/
    ui/
    layout/
    dashboard/
    builder/
    public-profile/
  features/
    auth/
    profile/
    links/
    themes/
    analytics/
    billing/
  lib/
    prisma.js
    validations/
    permissions/
    utils.js
  styles/
prisma/
  schema.prisma
  migrations/
  seed.js
```

Adjust to actual repository conventions. Separate presentation, domain logic, data access, validation, and authorization. Prefer simple modular architecture, not microservices. Avoid giant page components and duplicated UI logic.

## 8. Development phases and acceptance criteria

### Phase 1 — Foundation and polished UI

Set up project, JavaScript-only configuration, Tailwind, shadcn/ui, design tokens, fonts, responsive layouts, landing, auth screens, dashboard, builder, preview, public profile UI, loading/empty/error states. For interactions that need backend, use clearly marked development demo mode rather than misleading fake success. Ensure responsive and visually coherent pages.

### Phase 2 — Real full-stack MVP

Set up PostgreSQL + Prisma migrations, Auth.js, authorization, profile and username management, real link CRUD and ordering, theme persistence, public publishing, upload storage integration, server-side validation. Replace demo data with real persistence. Add smoke tests for registration/sign-in, CRUD, ownership isolation, public profile, and mobile builder.

### Phase 3 — Analytics and product growth

Implement event tracking, analytics aggregates, time filters, charts, plan entitlement model, pricing UI, and operational visibility. Keep billing integration as an explicit separate task until provider and requirements are chosen.

### Phase 4 — Production hardening

Security and accessibility audit, performance optimization, SEO metadata and sitemap, tests, backup and migration plan, deployment documentation, environment configuration, and basic monitoring.

For every phase:
1. Inspect existing repo and dependencies before editing.
2. Present concise plan and files to modify.
3. Implement only that phase; do not silently skip dependencies.
4. Run lint, build, and relevant tests; fix errors introduced.
5. Check responsive behavior at required breakpoints where tooling permits.
6. Report completed features, changed files, verification results, limitations, and next steps.
7. **Stop and wait for my approval before starting the next phase.**

## 9. Immediate instruction

Begin by inspecting the repository. If empty, scaffold a JavaScript-only Next.js App Router project with Tailwind CSS and shadcn/ui. Explain your design system and folder structure briefly, then implement **Phase 1 only**. Make the UI feel like a real premium SaaS, with readable typography and a particularly strong mobile builder experience. Do not create TypeScript files or a separate backend.
