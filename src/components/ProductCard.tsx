"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { IconCRM, IconInvoice, IconChat, IconWorkflow, IconAnalytics } from "./Icons";

const iconMap = {
  crm: IconCRM,
  invoice: IconInvoice,
  chat: IconChat,
  workflow: IconWorkflow,
  analytics: IconAnalytics,
} as const;

export type ProductIconType = keyof typeof iconMap;

interface ProductCardProps {
  title: string;
  description: string;
  href?: string;
  iconType?: ProductIconType;
  delay?: number;
}

export default function ProductCard({
  title,
  description,
  href = "/products",
  iconType = "crm",
  delay = 0,
}: ProductCardProps) {
  const Icon = iconMap[iconType] ?? IconCRM;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="glass-card p-4 sm:p-5 h-full flex flex-col"
    >
      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg flex items-center justify-center mb-3 sm:mb-4 bg-white/5 border border-white/10 [&_svg]:w-6 [&_svg]:h-6 sm:[&_svg]:w-7 sm:[&_svg]:h-7 [&_svg]:drop-shadow-[0_0_8px_currentColor] flex-shrink-0">
        <Icon />
      </div>
      <h3 className="heading-3 mb-2">{title}</h3>
      <p className="body-text text-sm flex-1 mb-4">{description}</p>
      <Link
        href={href}
        className="group text-sm font-semibold text-[#7b61ff] hover:text-[#00E5FF] transition-colors inline-flex items-center gap-1.5 w-fit"
      >
        Learn more
        <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
      </Link>
    </motion.div>
  );
}
