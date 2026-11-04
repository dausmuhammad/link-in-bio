"use client";
import { useLanguage } from "@/components/language-provider";
import { ArrowUpRight, Camera, Video, Orbit } from "lucide-react";
import { safeUrl } from "@/lib/demo";
export function PublicProfile({ profile, compact = false }) {
  const { t } = useLanguage();
  return (
    <section
      className={`profile-page theme-${profile.theme.toLowerCase().replaceAll(" ", "-")} ${compact ? "compact" : ""}`}
      style={{ "--profile-accent": profile.accent }}
    >
      <div className="profile-orb" />
      <div className="avatar">
        {profile.initials || profile.name.slice(0, 2).toUpperCase()}
      </div>
      <h2>{profile.name || t("Your name")}</h2>
      <p className="handle">@{profile.username}</p>
      <p className="profile-bio">{profile.bio}</p>
      <div className="socials">
        {Object.entries(profile.socials)
          .filter(([, url]) => safeUrl(url))
          .map(([name, url]) => (
            <a
              href={safeUrl(url)}
              key={name}
              aria-label={name}
              target="_blank"
              rel="noopener noreferrer"
            >
              {name === "Instagram" ? (
                <Camera size={21} />
              ) : (
                <Video size={21} />
              )}
            </a>
          ))}
      </div>
      <div className="profile-links">
        {profile.links
          .filter((l) => l.active && safeUrl(l.url))
          .map((l) => (
            <a
              key={l.id}
              href={safeUrl(l.url)}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                borderRadius:
                  profile.shape === "pill"
                    ? 40
                    : profile.shape === "square"
                      ? 4
                      : 14,
              }}
            >
              <span>{l.title}</span>
              <ArrowUpRight size={18} />
            </a>
          ))}
      </div>
      <div className="profile-footer">
        <Orbit size={16} /> {t("Made with LinkSpace")}
      </div>
    </section>
  );
}
