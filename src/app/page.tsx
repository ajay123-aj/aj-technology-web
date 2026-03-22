"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import HomeSections from "@/components/HomeSections";
import { motion } from "framer-motion";

type ProductIconType = "crm" | "invoice" | "chat" | "workflow" | "analytics";

const DEFAULT_PRODUCTS = [
  { title: "AJ Email Editor", description: "Easily create professional email templates with an intuitive drag-and-drop editor. Build beautiful, responsive emails in minutes.", iconType: "workflow" as const, href: "https://mail.ajtechhub.com/" },
  { title: "Customer Nurturing", description: "SMS, notifications, WhatsApp, and more—all with AI integration. Set up workflows and automation for end-to-end customer nurturing.", iconType: "chat" as const, href: "/products" },
];

export default function Home() {
  const [products, setProducts] = useState<Array<{ title: string; description: string; iconType: ProductIconType; href?: string }>>(DEFAULT_PRODUCTS);

  useEffect(() => {
    const tryFetch = (url: string) =>
      fetch(url)
        .then(async (res) => {
          const contentType = res.headers.get("content-type");
          if (!contentType?.includes("application/json")) return null;
          try {
            return await res.json();
          } catch {
            return null;
          }
        })
        .then((data) => {
          if (!data) return;
          const items = Array.isArray(data) ? data : data?.products ?? data?.items ?? data?.data;
          if (Array.isArray(items) && items.length >= 2) {
            const mapped = items.slice(0, 2).map((p: { title?: string; name?: string; description?: string; href?: string }, i: number) => ({
              title: p.title ?? p.name ?? "Product",
              description: p.description ?? "",
              iconType: (["crm", "invoice", "chat"] as const)[i % 3],
              href: p.href ?? (i === 0 ? "https://mail.ajtechhub.com/" : "/products"),
            }));
            setProducts(mapped);
          }
        })
        .catch(() => {});
    tryFetch("http://localhost:5173/api/products").catch(() => tryFetch("http://localhost:5173/").catch(() => {}));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-mesh bg-animated-orbs">
      <Navbar />
      <main>
        <Hero
          title="Modern AI SaaS for the Future"
          subtitle="We build intelligent software and automation tools that help businesses scale faster. Get started in minutes."
        />
        <section id="products" className="section-padding section-bg-animate">
          <div className="container-narrow">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="section-title"
            >
              Products
              <motion.span
                className="section-title-accent block"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: "center" }}
              />
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="body-text text-center max-w-xl mx-auto mb-8"
            >
              Intelligent tools designed to automate and scale your business.
            </motion.p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {products.map((p, i) => (
                <ProductCard
                  key={p.title}
                  title={p.title}
                  description={p.description}
                  iconType={p.iconType}
                  href={p.href}
                  delay={i * 0.08}
                />
              ))}
            </div>
          </div>
        </section>
        <HomeSections />
      </main>
      <Footer />
    </div>
  );
}
