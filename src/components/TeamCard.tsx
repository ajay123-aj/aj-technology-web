"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface TeamCardProps {
  name: string;
  role: string;
  description: string;
  imageUrl?: string;
  linkedinUrl?: string;
  delay?: number;
}

export default function TeamCard({
  name,
  role,
  description,
  imageUrl,
  linkedinUrl = "#",
  delay = 0,
}: TeamCardProps) {
  return (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="glass-card p-4 sm:p-5 h-full flex flex-col"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/10 flex items-center justify-center text-base sm:text-lg font-bold text-[#7b61ff] flex-shrink-0 overflow-hidden border border-white/10">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              width={56}
              height={56}
              className="w-full h-full object-cover"
            />
          ) : (
            name.slice(0, 2).toUpperCase()
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="heading-3">{name}</h3>
          <p className="text-sm font-medium text-[#00E5FF] mt-0.5">{role}</p>
        </div>
      </div>
      <p className="body-text text-sm flex-1 mb-4">{description}</p>
      <motion.a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-[#00E5FF] transition-colors w-fit rounded-lg p-2 -m-2 hover:bg-white/5"
        aria-label="LinkedIn"
        whileHover={{ x: 2 }}
        transition={{ duration: 0.2 }}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
        LinkedIn
      </motion.a>
    </motion.div>
  );
}
