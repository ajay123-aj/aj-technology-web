"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="border-t border-white/10 bg-white/[0.06] backdrop-blur-xl py-8 sm:py-10"
    >
      <div className="container-narrow">
        <div className="flex flex-col gap-6 sm:gap-8 md:flex-row md:items-center md:justify-between">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <Link href="/" className="text-lg font-bold text-white hover:text-[#00E5FF] transition-colors">
              Aj Technology
            </Link>
            <p className="text-sm text-white/60 mt-1.5 max-w-xs leading-relaxed">
              Modern AI SaaS software for businesses. Build, scale, and succeed.
            </p>
          </motion.div>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-4 sm:gap-6">
            {links.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                whileHover={{ y: -2 }}
              >
                <Link
                  href={link.href}
                  className="text-sm text-white/70 hover:text-[#00E5FF] transition-colors duration-300 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-gradient-to-r after:from-[#7b61ff] after:to-[#00E5FF] after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-6 pt-6 border-t border-white/10"
        >
          <p className="text-sm text-white/50" suppressHydrationWarning>
            © {new Date().getFullYear()} Aj Technology. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
