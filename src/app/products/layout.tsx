import type { Metadata } from "next";

const productsDescription =
  "Explore our AI-powered SaaS products: AJ Email Editor for drag-and-drop email templates, Customer Nurturing for SMS, WhatsApp, and AI workflows, Aj Smart Biz for a fully managed business website live in one working day, and Aj Pilot for app deployment, server management and domains on your Ubuntu servers.";

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
