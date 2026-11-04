"use client";

import { LanguageSelector } from "@/components/language-selector";
import { useLanguage } from "@/components/language-provider";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { Brand } from "./brand";
const schema = z.object({
  email: z.email("Enter a valid email address."),
});
export function AuthForm({ signup = false }) {
  const { t } = useLanguage();
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });
  return (
    <main className="auth-page">
      <div className="auth-story">
        <Brand />
        <div>
          <span className="eyebrow">{t("YOUR WORLD, IN ONE PLACE")}</span>
          <h1>
            {t("Make room for")}
            <br />
            {t("what makes you,")} <em>{t("you.")}</em>
          </h1>
          <p>{t("A thoughtful home for everything you create.")}</p>
          <span className="story-orbit">✳</span>
        </div>
        <p>{t("Development preview \xB7 Phase 1")}</p>
      </div>
      <div className="auth-form-wrap">
        <div className="auth-language">
          <LanguageSelector />
        </div>
        <Link href="/" className="text-link">
          {t("\u2190 Back to LinkSpace")}
        </Link>
        <div className="auth-form">
          <span className="feature-icon">
            <Mail />
          </span>
          <h1>
            {t(signup ? "Your space starts here." : "Welcome to your space.")}
          </h1>
          <p>
            {t(
              signup
                ? "One little link. A world of possibilities."
                : "Pick up where your next idea begins.",
            )}
          </p>
          <div className="notice">
            {t(
              "Demo only. Email sign-in and registration are not connected. No email will be sent.",
            )}
          </div>
          <form
            onSubmit={handleSubmit(() =>
              setMessage(
                "Email format validated. Authentication will be available in Phase 2; no account or session was created.",
              ),
            )}
            noValidate
          >
            <label>
              {t("Email address")}
              <input
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                {...register("email")}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
            </label>
            {errors.email && (
              <p id="email-error" className="field-error">
                {t(errors.email.message)}
              </p>
            )}
            <Button
              className="full-width"
              disabled={isSubmitting}
              type="submit"
            >
              {t(isSubmitting ? "Checking…" : "Check email format")}
              <ArrowRight size={17} />
            </Button>
          </form>
          {message && (
            <p className="notice" role="status">
              {t(message)}
            </p>
          )}
          <div className="auth-divider">{t("or take a look around")}</div>
          <Button variant="outline" asChild className="full-width">
            <Link href="/dashboard">{t("Explore the demo workspace")}</Link>
          </Button>
          <p className="auth-switch">
            {t(signup ? "Already have a space?" : "New around here?")}{" "}
            <Link href={signup ? "/login" : "/signup"}>
              {t(signup ? "Sign in" : "Get started")}
            </Link>
          </p>
          <p className="helper">
            {t(
              "Planned authentication: passwordless email with secure database sessions. No passwords collected in this demo.",
            )}
          </p>
        </div>
      </div>
    </main>
  );
}
