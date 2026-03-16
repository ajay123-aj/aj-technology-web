"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import HomeSections from "@/components/HomeSections";
import { motion } from "framer-motion";

export default function Home() {
  const products = [
    { title: "AI CRM", description: "Smart CRM that tracks customers, automates pipelines, and delivers AI-driven insights.", iconType: "crm" as const },
    { title: "AutoInvoice", description: "Automated invoicing, payment tracking, and financial reporting in one platform.", iconType: "invoice" as const },
    { title: "AI Chat Support", description: "AI-powered chatbot that automates customer support for your website and business.", iconType: "chat" as const },
  ];

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
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="section-title"
            >
              Products
              <motion.span
                className="section-title-accent block"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
              {products.map((p, i) => (
                <ProductCard
                  key={p.title}
                  title={p.title}
                  description={p.description}
                  iconType={p.iconType}
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
