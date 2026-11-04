import { z } from "zod";
export const demoProfile = {
  username: "alexrivera",
  name: "Alex Rivera",
  bio: "Designer, maker & curious human. Creating useful things for the internet.",
  initials: "AR",
  theme: "Violet Glow",
  shape: "rounded",
  accent: "#6356d9",
  socials: {
    Instagram: "https://instagram.com",
    YouTube: "https://youtube.com",
  },
  links: [
    {
      id: "portfolio",
      title: "Explore my portfolio",
      url: "https://example.com/portfolio",
      active: true,
    },
    {
      id: "newsletter",
      title: "The Sunday Edit — my newsletter",
      url: "https://example.com/newsletter",
      active: true,
    },
    {
      id: "collaborate",
      title: "Let’s make something together",
      url: "https://example.com/contact",
      active: true,
    },
  ],
};
export const themes = [
  "Minimal White",
  "Midnight Dark",
  "Violet Glow",
  "Ocean Blue",
  "Sunset Gradient",
  "Soft Pastel",
];
export const reserved = [
  "login",
  "signup",
  "dashboard",
  "pricing",
  "api",
  "settings",
  "admin",
  "auth",
];
export function safeUrl(value) {
  try {
    const u = new URL(value);
    return ["http:", "https:"].includes(u.protocol) ? u.href : null;
  } catch {
    return null;
  }
}

export const draftSchema = z.object({
  username: z.string().max(30),
  name: z.string().max(60),
  bio: z.string().max(200),
  initials: z.string().max(2),
  theme: z.enum(themes),
  shape: z.enum(["rounded", "pill", "square"]),
  accent: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  socials: z.object({
    Instagram: z.string().max(2048),
    YouTube: z.string().max(2048),
  }),
  links: z
    .array(
      z.object({
        id: z.string().min(1),
        title: z.string().max(100),
        url: z.string().max(2048),
        active: z.boolean(),
      }),
    )
    .refine((links) => new Set(links.map((l) => l.id)).size === links.length),
});
