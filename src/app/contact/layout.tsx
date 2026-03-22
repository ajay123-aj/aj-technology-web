import type { Metadata } from "next";

const contactDescription =
  "Get in touch with Aj Technology for demos, support, or partnerships. We're here to help your business scale with AI.";

export const metadata: Metadata = {
  title: "Contact",
  description: contactDescription,
  openGraph: {
    title: "Contact | Aj Technology",
    description: contactDescription,
    url: "/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Aj Technology",
    description: contactDescription,
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({
  children,
}: { children: React.ReactNode }) {
  return <>{children}</>;
}
