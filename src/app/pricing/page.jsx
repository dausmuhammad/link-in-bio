import { LanguageSelector } from "@/components/language-selector";
import { getTranslator } from "@/lib/i18n/server";
import Link from "next/link";
import { Check } from "lucide-react";
import { Brand } from "@/components/brand";
import { Button } from "@/components/ui/button";
export default async function Pricing() {
  const t = await getTranslator();
  return (
    <>
      <header className="marketing-nav wrap">
        <Brand />
        <LanguageSelector />
        <Link href="/">{t("\u2190 Back home")}</Link>
      </header>
      <main className="wrap section pricing">
        <span className="eyebrow">{t("ROOM FOR EVERY CHAPTER")}</span>
        <h1>{t("Start small. Dream big.")}</h1>
        <p>{t("Proposed plans. No subscriptions or payments are active.")}</p>
        <div className="pricing-grid">
          {[
            [
              "Free",
              "Your first little corner.",
              [
                "One personal profile",
                "Essential link management",
                "Six signature themes",
              ],
            ],
            [
              "Pro",
              "For your next big thing.",
              [
                "Advanced analytics — planned",
                "More customization — planned",
                "Priority support — planned",
              ],
            ],
          ].map(([name, tag, items]) => (
            <section className="card" key={name}>
              <span className="eyebrow">{t(name)}</span>
              <h2>{t(name === "Free" ? "$0" : "Coming later")}</h2>
              <p>{t(tag)}</p>
              <ul>
                {items.map((i) => (
                  <li key={i}>
                    <Check size={18} />
                    {t(i)}
                  </li>
                ))}
              </ul>
              {name === "Free" ? (
                <Button asChild>
                  <Link href="/dashboard/builder">
                    {t("Explore free demo")}
                  </Link>
                </Button>
              ) : (
                <Button disabled>{t("Billing not available")}</Button>
              )}
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
