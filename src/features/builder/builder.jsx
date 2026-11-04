"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "motion/react";
import {
  GripVertical,
  Trash2,
  Plus,
  Save,
  Check,
  Smartphone,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PublicProfile } from "@/components/public-profile";
import {
  demoProfile,
  themes,
  reserved,
  safeUrl,
  draftSchema,
} from "@/lib/demo";
const key = "linkspace-demo-draft-v1";
function SortableLink({ link, update, remove }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: link.id });
  return (
    <div
      ref={setNodeRef}
      className="link-editor"
      style={{ transform: CSS.Transform.toString(transform), transition }}
    >
      <button
        className="icon-button drag-handle"
        aria-label={`Reorder ${link.title}`}
        {...attributes}
        {...listeners}
      >
        <GripVertical size={20} />
      </button>
      <div className="link-fields">
        <label>
          Link title
          <input
            value={link.title}
            maxLength={100}
            onChange={(e) => update({ title: e.target.value })}
          />
        </label>
        <label>
          Destination URL
          <input
            type="url"
            value={link.url}
            onChange={(e) => update({ url: e.target.value })}
            aria-invalid={!safeUrl(link.url)}
          />
        </label>
        {!safeUrl(link.url) && (
          <p className="field-error">
            Use a valid http:// or https:// address.
          </p>
        )}
      </div>
      <div className="link-controls">
        <label className="switch-label">
          <input
            type="checkbox"
            checked={link.active}
            onChange={(e) => update({ active: e.target.checked })}
          />
          Enabled
        </label>
        <button
          className="icon-button danger"
          aria-label={`Delete ${link.title}`}
          onClick={remove}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
export function Builder() {
  const search = useSearchParams();
  const [profile, setProfile] = useState(demoProfile);
  const [saved, setSaved] = useState(JSON.stringify(demoProfile));
  const [section, setSection] = useState("Profile");
  const [mobileTab, setMobileTab] = useState("Edit");
  const [notice, setNotice] = useState("");
  const [ready, setReady] = useState(false);
  const dirty = JSON.stringify(profile) !== saved;
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  useEffect(() => {
    let cancelled = false;
    Promise.resolve().then(() => {
      if (cancelled) return;
      try {
        const raw = localStorage.getItem(key);
        if (raw) {
          const p = draftSchema.parse(JSON.parse(raw));
          setProfile(p);
          setSaved(JSON.stringify(p));
        }
        const theme = search.get("theme");
        if (themes.includes(theme)) setProfile((p) => ({ ...p, theme }));
      } catch {
        setNotice(
          "Could not read your local draft. The example is loaded; save to replace it.",
        );
      }
      setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [search]);
  useEffect(() => {
    if (!dirty) return;
    const unload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    const click = (e) => {
      const a = e.target.closest("a[href]");
      if (
        a &&
        a.target !== "_blank" &&
        !a.getAttribute("href").startsWith("#") &&
        !window.confirm("You have unsaved demo changes. Leave this page?")
      ) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    window.addEventListener("beforeunload", unload);
    document.addEventListener("click", click, true);
    return () => {
      window.removeEventListener("beforeunload", unload);
      document.removeEventListener("click", click, true);
    };
  }, [dirty]);
  function patch(values) {
    setProfile((p) => ({ ...p, ...values }));
    setNotice("");
  }
  function save() {
    const username =
      /^[a-z0-9_]{3,30}$/.test(profile.username) &&
      !reserved.includes(profile.username);
    if (
      !username ||
      !profile.name.trim() ||
      profile.links.some((l) => !l.title.trim() || !safeUrl(l.url)) ||
      Object.values(profile.socials).some((u) => u && !safeUrl(u))
    ) {
      setNotice(
        "Check your name, username (3–30 lowercase letters, numbers or underscores), and link URLs. App route names are reserved.",
      );
      return;
    }
    try {
      localStorage.setItem(key, JSON.stringify(profile));
      setSaved(JSON.stringify(profile));
      setNotice(
        "Draft saved in this browser only. This does not publish a public page.",
      );
    } catch {
      setNotice(
        "Could not save. Browser storage is unavailable or full. Your edits are still here.",
      );
    }
  }
  if (!ready)
    return (
      <main className="dashboard-content" aria-busy="true">
        Loading your local draft…
      </main>
    );
  return (
    <main className="dashboard-content builder-content">
      <div className="page-heading">
        <div>
          <span className="eyebrow">A SPACE THAT FEELS LIKE YOU</span>
          <h1>Make it your own.</h1>
          <p>Your story, your links, your little corner of the internet.</p>
        </div>
        <div className="save-actions">
          <span className={dirty ? "unsaved" : "saved"}>
            {dirty ? "Unsaved changes" : "No unsaved changes"}
          </span>
          <Button onClick={save}>
            <Save size={17} />
            Save demo draft
          </Button>
        </div>
      </div>
      <div className="mobile-tabs">
        {["Edit", "Preview"].map((t) => (
          <button
            className={mobileTab === t ? "selected" : ""}
            key={t}
            onClick={() => setMobileTab(t)}
          >
            {t}
          </button>
        ))}
      </div>
      {notice && (
        <div className="notice" role="status">
          {notice}
        </div>
      )}
      <div className={`builder-grid showing-${mobileTab.toLowerCase()}`}>
        <section className="editor-panel">
          <div
            className="editor-tabs"
            role="tablist"
            aria-label="Builder sections"
          >
            {["Profile", "Links", "Socials", "Appearance", "Settings"].map(
              (s) => (
                <button
                  key={s}
                  role="tab"
                  aria-selected={section === s}
                  onClick={() => setSection(s)}
                >
                  {s}
                </button>
              ),
            )}
          </div>
          <motion.div
            key={section}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
            className="editor-section"
            role="tabpanel"
          >
            <div className="section-intro">
              <h2>
                {section === "Profile"
                  ? "A little introduction"
                  : section === "Links"
                    ? "Where should we go?"
                    : section === "Socials"
                      ? "Keep the conversation going"
                      : section === "Appearance"
                        ? "Find your signature look"
                        : "The little details"}
              </h2>
              <p>
                {section === "Profile"
                  ? "Give people a glimpse of the person behind the links."
                  : section === "Links"
                    ? "Drag to reorder, or use Space and arrow keys on the handle."
                    : section === "Appearance"
                      ? "Start with a theme. Make the details your own."
                      : "Every change appears in your preview instantly."}
              </p>
            </div>
            {section === "Profile" && (
              <>
                <div className="avatar-editor">
                  <div className="avatar">{profile.initials}</div>
                  <div>
                    <strong>Your profile avatar</strong>
                    <p>Initials preview · Image uploads arrive in Phase 2.</p>
                  </div>
                </div>
                <label>
                  Display name
                  <input
                    maxLength={60}
                    value={profile.name}
                    onChange={(e) =>
                      patch({
                        name: e.target.value,
                        initials: e.target.value.slice(0, 2).toUpperCase(),
                      })
                    }
                  />
                </label>
                <label>
                  Bio
                  <textarea
                    rows={4}
                    maxLength={200}
                    value={profile.bio}
                    onChange={(e) => patch({ bio: e.target.value })}
                  />
                  <span className="helper">
                    A few words go a long way. {profile.bio.length}/200
                  </span>
                </label>
                <label>
                  Username
                  <div className="input-prefix">
                    <span>linkspace /</span>
                    <input
                      value={profile.username}
                      maxLength={30}
                      onChange={(e) =>
                        patch({ username: e.target.value.toLowerCase() })
                      }
                    />
                  </div>
                  <span className="helper">
                    Availability will be checked against the database in Phase
                    2.
                  </span>
                </label>
              </>
            )}
            {section === "Links" && (
              <>
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={({ active, over }) => {
                    if (over && active.id !== over.id)
                      patch({
                        links: arrayMove(
                          profile.links,
                          profile.links.findIndex((l) => l.id === active.id),
                          profile.links.findIndex((l) => l.id === over.id),
                        ),
                      });
                  }}
                >
                  <SortableContext
                    items={profile.links.map((l) => l.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {profile.links.map((link) => (
                      <SortableLink
                        key={link.id}
                        link={link}
                        update={(data) =>
                          patch({
                            links: profile.links.map((l) =>
                              l.id === link.id ? { ...l, ...data } : l,
                            ),
                          })
                        }
                        remove={() =>
                          patch({
                            links: profile.links.filter(
                              (l) => l.id !== link.id,
                            ),
                          })
                        }
                      />
                    ))}
                  </SortableContext>
                </DndContext>
                {!profile.links.length && (
                  <div className="empty-state">
                    <h3>Your first link starts here.</h3>
                    <p>Add something you’d love people to discover.</p>
                  </div>
                )}
                <Button
                  variant="outline"
                  className="full-width"
                  onClick={() =>
                    patch({
                      links: [
                        ...profile.links,
                        {
                          id: crypto.randomUUID(),
                          title: "My new link",
                          url: "https://example.com",
                          active: true,
                        },
                      ],
                    })
                  }
                >
                  <Plus size={18} />
                  Add a link
                </Button>
              </>
            )}
            {section === "Socials" &&
              Object.entries(profile.socials).map(([name, url]) => (
                <label key={name}>
                  {name} URL
                  <input
                    type="url"
                    value={url}
                    placeholder="https://"
                    onChange={(e) =>
                      patch({
                        socials: { ...profile.socials, [name]: e.target.value },
                      })
                    }
                  />
                  <span className="helper">
                    Leave empty to hide this social profile.
                  </span>
                </label>
              ))}
            {section === "Appearance" && (
              <>
                <fieldset>
                  <legend>Choose your canvas</legend>
                  <div className="theme-picker">
                    {themes.map((theme) => (
                      <button
                        key={theme}
                        className={`theme-choice ${profile.theme === theme ? "chosen" : ""}`}
                        aria-pressed={profile.theme === theme}
                        onClick={() => patch({ theme })}
                      >
                        <span
                          className={`theme-chip theme-${theme.toLowerCase().replaceAll(" ", "-")}`}
                        >
                          {profile.theme === theme && <Check size={20} />}
                        </span>
                        {theme}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <fieldset>
                  <legend>Button shape</legend>
                  <div className="segmented">
                    {["rounded", "pill", "square"].map((shape) => (
                      <button
                        aria-pressed={profile.shape === shape}
                        className={profile.shape === shape ? "selected" : ""}
                        key={shape}
                        onClick={() => patch({ shape })}
                      >
                        {shape}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <label>
                  Accent color
                  <input
                    type="color"
                    value={profile.accent}
                    onChange={(e) => patch({ accent: e.target.value })}
                  />
                  <span className="helper">
                    Accent decorates the avatar. Theme text colors remain
                    readable.
                  </span>
                </label>
              </>
            )}
            {section === "Settings" && (
              <>
                <div className="settings-callout">
                  <h3>This is your development playground.</h3>
                  <p>
                    Drafts stay on this device. Authentication, username
                    registration, account settings, uploads, and public
                    publishing are not connected yet.
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Reset your editor to the example? Save afterward to replace your stored draft.",
                      )
                    ) {
                      patch(structuredClone(demoProfile));
                    }
                  }}
                >
                  Reset editor to example
                </Button>
                <p className="helper">
                  Reset requires saving to update browser storage. No account or
                  server data will be deleted.
                </p>
              </>
            )}
          </motion.div>
          <div className="editor-footer">
            <span className="status-dot" /> Local preview · Not published
          </div>
        </section>
        <aside className="preview-panel">
          <div className="preview-heading">
            <span>
              <Smartphone size={17} />
              Live preview
            </span>
            <a
              href="/alexrivera"
              target="_blank"
              rel="noreferrer"
              aria-label="Open fixed example public page"
            >
              <ExternalLink size={17} />
            </a>
          </div>
          <div className="phone">
            <div className="phone-camera" />
            <PublicProfile profile={profile} compact />
          </div>
          <p className="helper">
            Your changes, as they happen.
            <br />
            This preview does not publish your page.
          </p>
        </aside>
      </div>
    </main>
  );
}
