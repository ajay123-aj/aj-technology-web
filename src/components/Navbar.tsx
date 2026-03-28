"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-white/[0.08] backdrop-blur-2xl"
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Main navigation" className="relative flex items-center justify-between h-14 sm:h-16 md:h-[72px]">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="flex-shrink-0"
          >
            <Link
              href="/"
              className="text-lg sm:text-xl inline-flex items-center rounded-md focus-visible:outline-none transition-[filter] duration-300 hover:drop-shadow-[0_0_14px_rgba(123,97,255,0.35)]"
              onClick={() => setMobileOpen(false)}
            >
              <span className="navbar-brand">Aj Technology</span>
            </Link>
          </motion.div>

          {/* Desktop: center nav links */}
          <ul className="hidden md:flex items-center justify-center gap-6 lg:gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`nav-link py-2 ${isActive ? "active" : ""}`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop: CTA */}
          <div className="hidden md:flex flex-shrink-0 items-center">
            <Link
              href="/contact"
              className="btn-primary text-sm px-4 py-2.5 sm:px-5 min-h-[40px] inline-flex items-center justify-center"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile: hamburger - min touch target 44px */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="md:hidden flex items-center justify-center w-11 h-11 -mr-2 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-colors touch-manipulation"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden border-t border-white/10 bg-white/[0.06] backdrop-blur-xl overflow-hidden"
          >
            <ul className="px-4 py-4 space-y-1">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.25 }}
                  >
                    <Link
                      href={link.href}
                      className={`block py-3.5 px-3 rounded-lg text-base transition-colors min-h-[44px] flex items-center ${isActive ? "text-white font-medium bg-white/10" : "text-white/80 hover:text-white hover:bg-white/5"}`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                );
              })}
              <motion.li
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="pt-3 mt-2 border-t border-white/10"
              >
                <Link
                  href="/contact"
                  className="flex items-center justify-center w-full min-h-[48px] py-3 rounded-xl btn-primary text-center"
                  onClick={() => setMobileOpen(false)}
                >
                  Get Started
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
