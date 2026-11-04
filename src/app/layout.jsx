import { LanguageProvider } from "@/components/language-provider";
import { getLocale, getTranslator } from "@/lib/i18n/server";
import localFont from "next/font/local";
import "./globals.css";
const geist = localFont({
  src: "../../node_modules/geist/dist/fonts/geist-sans/Geist-Variable.woff2",
  display: "swap",
});
export async function generateMetadata() {
  const t = await getTranslator();
  return {
    title: {
      default: `LinkSpace — ${t("A little space.")} ${t("All of you.")}`,
      template: "%s | LinkSpace",
    },
    description: t(
      "A thoughtful home for your links, ideas, and next big thing. LinkSpace development preview.",
    ),
  };
}
export default async function RootLayout({ children }) {
  const locale = await getLocale();
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={geist.className}>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{document.documentElement.dataset.theme=localStorage.getItem('linkspace-theme')||'light'}catch{}`,
          }}
        />
        <LanguageProvider initialLocale={locale}>{children}</LanguageProvider>
      </body>
    </html>
  );
}
