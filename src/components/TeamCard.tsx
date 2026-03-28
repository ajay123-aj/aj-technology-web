"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { motion } from "framer-motion";

export interface TeamMemberSocial {
  linkedinUrl?: string;
  twitterUrl?: string;
  email?: string;
}

interface TeamCardProps {
  name: string;
  role: string;
  description: string;
  imageUrl?: string;
  social?: TeamMemberSocial;
  delay?: number;
}

function mailtoHref(email: string): string {
  const t = email.trim();
  if (!t) return "#";
  return t.startsWith("mailto:") ? t : `mailto:${t}`;
}

function isRealUrl(href: string | undefined): href is string {
  return Boolean(href && href !== "#");
}

const iconBtn =
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.08] text-white/90 transition-all duration-200 hover:border-[#00e5ff]/50 hover:bg-[#7b61ff]/25 hover:text-[#00e5ff] hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0e1a]";

function SocialIconLinks({
  name,
  social,
  className = "",
}: {
  name: string;
  social: TeamMemberSocial;
  className?: string;
}) {
  const items: { key: string; href: string; label: string; children: ReactNode }[] = [];

  if (isRealUrl(social.linkedinUrl)) {
    items.push({
      key: "in",
      href: social.linkedinUrl!,
      label: `${name} on LinkedIn`,
      children: (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    });
  }

  if (isRealUrl(social.twitterUrl)) {
    items.push({
      key: "x",
      href: social.twitterUrl!,
      label: `${name} on X`,
      children: (
        <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    });
  }

  if (social.email?.trim()) {
    const href = mailtoHref(social.email);
    if (href !== "#") {
      items.push({
        key: "mail",
        href,
        label: `Email ${name}`,
        children: (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        ),
      });
    }
  }

  if (items.length === 0) return null;

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {items.map((item) => (
        <a
          key={item.key}
          href={item.href}
          target={item.key === "mail" ? undefined : "_blank"}
          rel={item.key === "mail" ? undefined : "noopener noreferrer"}
          aria-label={item.label}
          className={iconBtn}
        >
          {item.children}
        </a>
      ))}
    </div>
  );
}

export default function TeamCard({
  name,
  role,
  description,
  imageUrl,
  social = {},
  delay = 0,
}: TeamCardProps) {
  const hasSocial =
    isRealUrl(social.linkedinUrl) || isRealUrl(social.twitterUrl) || Boolean(social.email?.trim());

  const imageNameBarFade = hasSocial ? "md:group-hover/card:opacity-0 md:group-focus-within/card:opacity-0" : "";

  return (
    <motion.article
      initial={{ opacity: 1, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-24px" }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="group/card mx-auto w-full max-w-[280px] sm:max-w-[40%] md:max-w-[25%] lg:max-w-[25%]"
    >
      <div className="rounded-xl p-[1px] bg-gradient-to-br from-[#7b61ff]/70 via-[#3b82f6]/45 to-[#00e5ff]/60 shadow-md shadow-[#7b61ff]/10 transition-shadow duration-300 group-hover/card:shadow-[#7b61ff]/20">
        <div className="overflow-hidden rounded-[11px] border border-white/[0.06] bg-[#0c1020]/95 backdrop-blur-sm">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-br from-white/[0.06] to-white/[0.02]">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={`Portrait of ${name}`}
                fill
                unoptimized={/^https?:\/\//.test(imageUrl)}
                className="object-cover object-top transition-transform duration-500 group-hover/card:scale-[1.03] md:group-hover/card:scale-105"
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 180px"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#7b61ff]/20 via-[#3b82f6]/12 to-[#00e5ff]/15">
                <span className="text-2xl font-bold text-white/35">
                  {name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </span>
              </div>
            )}

            {/* Desktop: name on photo (hides on hover when social overlay exists) */}
            <div
              className={`pointer-events-none absolute inset-x-0 bottom-0 hidden bg-gradient-to-t from-[#0a0e1a] via-[#0a0e1a]/80 to-transparent px-2.5 pb-2 pt-10 transition-opacity duration-300 md:block ${imageNameBarFade}`}
            >
              <h3 className="text-sm font-bold leading-tight text-white">{name}</h3>
              <p className="text-[11px] font-semibold text-[#00e5ff] mt-0.5">{role}</p>
            </div>

            {/* Desktop: hover / focus overlay — social + short bio */}
            {hasSocial && (
              <div
                className="absolute inset-0 z-10 hidden flex-col items-center justify-center gap-2 px-2.5 py-3 text-center opacity-0 pointer-events-none transition-all duration-300 translate-y-1 bg-gradient-to-b from-[#0a0e1a]/93 via-[#0a0e1a]/90 to-[#0a0e1a]/96 backdrop-blur-[6px] md:flex md:group-hover/card:pointer-events-auto md:group-hover/card:opacity-100 md:group-hover/card:translate-y-0 md:group-focus-within/card:pointer-events-auto md:group-focus-within/card:opacity-100 md:group-focus-within/card:translate-y-0"
              >
                <h3 className="text-sm font-bold text-white leading-tight">{name}</h3>
                <p className="text-[11px] font-semibold text-[#00e5ff]">{role}</p>
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/45">Connect</p>
                <SocialIconLinks name={name} social={social} className="justify-center" />
                <p className="max-w-[12rem] text-[10px] leading-snug text-white/60 line-clamp-3">{description}</p>
              </div>
            )}
          </div>

          <div className="space-y-2 px-2.5 py-2.5">
            <div className="md:hidden">
              <h3 className="text-sm font-bold text-white leading-tight">{name}</h3>
              <p className="text-[11px] font-semibold text-[#00e5ff]">{role}</p>
            </div>
            <p className="text-[11px] leading-relaxed text-white/65 line-clamp-2 md:line-clamp-3">{description}</p>
            {hasSocial && (
              <div className="border-t border-white/[0.06] pt-2 md:hidden">
                <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-wider text-white/40">Connect</p>
                <SocialIconLinks name={name} social={social} />
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
