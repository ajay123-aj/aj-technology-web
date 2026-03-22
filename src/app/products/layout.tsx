import type { Metadata } from "next";

const productsDescription =
  "Explore our AI-powered SaaS products: AJ Email Editor for drag-and-drop email templates, Customer Nurturing for SMS, WhatsApp, and AI workflows.";

export const metadata: Metadata = {
  title: "Products",
  description: productsDescription,
  openGraph: {
    title: "Products | Aj Technology",
    description: productsDescription,
    url: "/products",
  },
  twitter: {
    card: "summary_large_image",
    title: "Products | Aj Technology",
    description: productsDescription,
  },
  alternates: {
    canonical: "/products",
  },
};

export default function ProductsLayout({
  children,
}: { children: React.ReactNode }) {
  return <>{children}</>;
}
