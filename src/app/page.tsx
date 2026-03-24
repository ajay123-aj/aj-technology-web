"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import HomeSections from "@/components/HomeSections";
import { motion } from "framer-motion";

const PRODUCTS = [
  { title: "AJ Email Editor", description: "Easily create professional email templates with an intuitive drag-and-drop editor. Build beautiful, responsive emails in minutes.", iconType: "workflow" as const, href: "https://mail.ajtechhub.com/" },
  { title: "Customer Nurturing", description: "SMS, notifications, WhatsApp, and more—all with AI integration. Set up workflows and automation for end-to-end customer nurturing.", iconType: "chat" as const, href: "https://nurturing.ajtechhub.com/" },
];

export default function Home() {
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
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="section-title"
            >
              Products
              <motion.span
                className="section-title-accent block"
                initial={false}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: "center" }}
              />
            </motion.h2>
            <motion.p
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="body-text text-center max-w-xl mx-auto mb-8"
            >
              Intelligent tools designed to automate and scale your business.
            </motion.p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {PRODUCTS.map((p, i) => (
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
