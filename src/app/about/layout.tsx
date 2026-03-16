import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Aj Technology",
  description: "Learn about our mission, vision, and team.",
};

export default function AboutLayout({
  children,
}: { children: React.ReactNode }) {
  return <>{children}</>;
}
