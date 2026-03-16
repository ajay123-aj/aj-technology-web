import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products | Aj Technology",
  description: "Explore our AI-powered SaaS products.",
};

export default function ProductsLayout({
  children,
}: { children: React.ReactNode }) {
  return <>{children}</>;
}
