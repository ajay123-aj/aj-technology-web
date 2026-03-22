import type { Metadata } from "next";

const aboutDescription =
  "Learn about Aj Technology—our mission, vision, and leadership team building the future of AI-powered software.";

export const metadata: Metadata = {
  title: "About",
  description: aboutDescription,
  openGraph: {
    title: "About | Aj Technology",
    description: aboutDescription,
    url: "/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Aj Technology",
    description: aboutDescription,
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutLayout({
  children,
}: { children: React.ReactNode }) {
  return <>{children}</>;
}
