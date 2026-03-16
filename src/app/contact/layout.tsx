import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Aj Technology",
  description: "Get in touch for demos, support, or partnerships.",
};

export default function ContactLayout({
  children,
}: { children: React.ReactNode }) {
  return <>{children}</>;
}
