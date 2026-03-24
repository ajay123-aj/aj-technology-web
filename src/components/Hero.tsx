"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import HeroBackground from "./HeroBackground";

interface HeroProps {
  title: string;
  subtitle?: string;
  showCta?: boolean;
}

export default function Hero({ title, subtitle, showCta = true }: HeroProps) {
  return (
    <section className="relative min-h-[65vh] sm:min-h-[70vh] flex items-center justify-center pt-20 pb-10 sm:pt-24 sm:pb-12 md:pt-28 md:pb-16 overflow-hidden hero-bg-animate">
      <HeroBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0e1a]/90 pointer-events-none" />
      <div className="container-narrow text-center relative z-10 px-4 sm:px-6">
        <motion.p
          initial={false}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs font-medium tracking-widest uppercase text-[#00E5FF]/90 mb-4 flex items-center justify-center gap-2 animate-badge-float"
        >
          <motion.span
            initial={false}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="origin-right w-8 h-px bg-gradient-to-r from-transparent to-[#00E5FF]/50 rounded-full inline-block"
          />
          AI-Powered SaaS
          <motion.span
            initial={false}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="origin-left w-8 h-px bg-gradient-to-l from-transparent to-[#00E5FF]/50 rounded-full inline-block"
          />
        </motion.p>
        <motion.h1
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="heading-1 mb-4 max-w-3xl mx-auto"
        >
          {title.includes(" ") && title.split(" ").length > 2 ? (
            <>
              {title.split(" ").slice(0, -2).join(" ")}{" "}
              <span className="gradient-text">
                {title.split(" ").slice(-2).join(" ")}
              </span>
            </>
          ) : (
            <span className="gradient-text">{title}</span>
          )}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
            className="body-text max-w-xl mx-auto mb-6 text-white/80"
          >
            {subtitle}
          </motion.p>
        )}
        {showCta && (
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link href="/contact" className="btn-primary animate-btn-glow">
                Get Started
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link href="/products" className="btn-secondary">
                View Products
              </Link>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
