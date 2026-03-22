import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import JsonLd from "@/components/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ajtechhub.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Aj Technology | Modern AI SaaS Software",
    template: "%s | Aj Technology",
  },
  description:
    "AI-powered software and automation for modern businesses. Build intelligent tools, scale faster, and succeed with Aj Technology.",
  keywords: [
    "AI SaaS",
    "artificial intelligence",
    "business automation",
    "software development",
    "AI CRM",
    "email editor",
    "customer nurturing",
    "workflow automation",
  ],
  authors: [{ name: "Aj Technology", url: siteUrl }],
  creator: "Aj Technology",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Aj Technology",
    title: "Aj Technology | Modern AI SaaS Software",
    description:
      "AI-powered software and automation for modern businesses. Build intelligent tools, scale faster, and succeed.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aj Technology | Modern AI SaaS Software",
    description:
      "AI-powered software and automation for modern businesses. Build intelligent tools, scale faster, and succeed.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.png?v=2", type: "image/png", sizes: "32x32" },
      { url: "/favicon.png?v=2", type: "image/png", sizes: "any" },
    ],
    shortcut: "/favicon.png?v=2",
    apple: "/favicon.png?v=2",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased min-h-screen bg-[var(--background)] text-[var(--foreground)] overflow-x-hidden`}>
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
