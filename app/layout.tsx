import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./lib/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Initialise le thème avant le premier paint pour éviter tout flash
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`;
// Initialise la langue sauvegardée
const localeScript = `try{var l=localStorage.getItem("locale");if(l){document.documentElement.lang=l;if(l==="ar")document.documentElement.dir="rtl"}}catch(e){}`;

export const metadata: Metadata = {
  title: {
    default: "Library — Visual Web Builder",
    template: "%s | Library",
  },
  description:
    "Design visually like Figma, export clean production-ready fullstack source code. Reinventing no-code for engineers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-pt-20`}
    >
      <body className="min-h-full flex flex-col">
        <script dangerouslySetInnerHTML={{ __html: themeScript + localeScript }} />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
