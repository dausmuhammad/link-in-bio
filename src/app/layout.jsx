import localFont from "next/font/local";
import "./globals.css";
const geist = localFont({
  src: "../../node_modules/geist/dist/fonts/geist-sans/Geist-Variable.woff2",
  display: "swap",
});
export const metadata = {
  title: {
    default: "LinkSpace — A little space. All of you.",
    template: "%s | LinkSpace",
  },
  description:
    "A thoughtful home for your links, ideas, and next big thing. LinkSpace development preview.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={geist.className}>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{document.documentElement.dataset.theme=localStorage.getItem('linkspace-theme')||'light'}catch{}`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
