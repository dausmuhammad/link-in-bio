import Link from "next/link";
import { Check } from "lucide-react";
import { Brand } from "@/components/brand";
import { Button } from "@/components/ui/button";
export default function Pricing() {
  return (
    <>
      <header className="marketing-nav wrap">
        <Brand />
        <Link href="/">← Back home</Link>
      </header>
      <main className="wrap section pricing">
        <span className="eyebrow">ROOM FOR EVERY CHAPTER</span>
        <h1>Start small. Dream big.</h1>
        <p>Proposed plans. No subscriptions or payments are active.</p>
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
              <span className="eyebrow">{name}</span>
              <h2>{name === "Free" ? "$0" : "Coming later"}</h2>
              <p>{tag}</p>
              <ul>
                {items.map((i) => (
                  <li key={i}>
                    <Check size={18} />
                    {i}
                  </li>
                ))}
              </ul>
              {name === "Free" ? (
                <Button asChild>
                  <Link href="/dashboard/builder">Explore free demo</Link>
                </Button>
              ) : (
                <Button disabled>Billing not available</Button>
              )}
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
