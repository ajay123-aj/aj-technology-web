"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useMemo, useState } from "react";

export interface CompanyGalleryItem {
  id: string;
  title: string;
  caption: string;
  category: string;
  imageUrl: string;
  featured?: boolean;
}

/** Replace with your own event photos under /public/gallery/ when ready. */
export const companyGalleryActivities: CompanyGalleryItem[] = [
  {
    id: "1",
    title: "Quarterly planning",
    caption: "Product and engineering aligning on the roadmap for our AI platform.",
    category: "All-hands",
    featured: true,
    imageUrl:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=85&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Hackathon weekend",
    caption: "48 hours of building prototypes and experimenting with new ideas.",
    category: "Innovation",
    imageUrl:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=85&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Design critique",
    caption: "Weekly UX reviews keep our SaaS experience sharp and accessible.",
    category: "Design",
    imageUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=85&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Team lunch",
    caption: "Breaking bread together between sprint reviews.",
    category: "Culture",
    imageUrl:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=85&auto=format&fit=crop",
  },
  {
    id: "5",
    title: "Customer workshop",
    caption: "Co-creating features with early adopters and partners.",
    category: "Community",
    imageUrl:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=85&auto=format&fit=crop",
  },
  {
    id: "6",
    title: "Office day",
    caption: "Hybrid-friendly space for deep work and spontaneous collaboration.",
    category: "Workspace",
    imageUrl:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=85&auto=format&fit=crop",
  },
  {
    id: "7",
    title: "Release celebration",
    caption: "Shipping a major update to our automation suite.",
    category: "Milestone",
    imageUrl:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=85&auto=format&fit=crop",
  },
  {
    id: "8",
    title: "Mentorship hour",
    caption: "Senior leads pairing with newer teammates on architecture and code quality.",
    category: "Growth",
    imageUrl:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=85&auto=format&fit=crop",
  },
  {
    id: "9",
    title: "Remote sync",
    caption: "Distributed crew staying connected across time zones.",
    category: "Remote",
    imageUrl:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=85&auto=format&fit=crop",
  },
  {
    id: "10",
    title: "Volunteer day",
    caption: "Giving back as a team—local outreach and STEM support.",
    category: "CSR",
    imageUrl:
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=85&auto=format&fit=crop",
  },
  {
    id: "11",
    title: "Tech talk",
    caption: "Internal lightning talks on ML, security, and developer experience.",
    category: "Learning",
    imageUrl:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=85&auto=format&fit=crop",
  },
  {
    id: "12",
    title: "Offsite retreat",
    caption: "Strategy, trust-building, and a bit of fun off the clock.",
    category: "Offsite",
    imageUrl:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=85&auto=format&fit=crop",
  },
];

function isRemoteUrl(src: string) {
  return src.startsWith("http://") || src.startsWith("https://");
}

/** Extra-small 5-column bento: hero 2×2, then dense single-column tiles. */
const BENTO_LG: string[] = [
  "lg:col-span-2 lg:row-span-2 lg:col-start-1 lg:row-start-1",
  "lg:col-span-1 lg:col-start-3 lg:row-start-1",
  "lg:col-span-1 lg:col-start-4 lg:row-start-1",
  "lg:col-span-1 lg:col-start-5 lg:row-start-1",
  "lg:col-span-1 lg:col-start-3 lg:row-start-2",
  "lg:col-span-1 lg:col-start-4 lg:row-start-2",
  "lg:col-span-1 lg:col-start-1 lg:row-start-3",
  "lg:col-span-1 lg:col-start-2 lg:row-start-3",
  "lg:col-span-1 lg:col-start-3 lg:row-start-3",
  "lg:col-span-1 lg:col-start-4 lg:row-start-3",
  "lg:col-span-1 lg:col-start-5 lg:row-start-3",
  "lg:col-span-1 lg:col-start-3 lg:row-start-4",
];

type TileKind = "hero" | "tall" | "wide" | "standard";

const TILE_KIND: TileKind[] = [
  "hero",
  "tall",
  "tall",
  "standard",
  "standard",
  "standard",
  "standard",
  "standard",
  "standard",
  "standard",
  "standard",
  "standard",
];

function aspectForKind(kind: TileKind): string {
  switch (kind) {
    case "hero":
      return "aspect-[5/4] lg:aspect-square";
    case "tall":
      return "aspect-square lg:aspect-square";
    case "wide":
      return "aspect-[5/4]";
    default:
      return "aspect-square";
  }
}

function radiusForIndex(i: number): string {
  const patterns = [
    "rounded-lg rounded-br-sm",
    "rounded-md rounded-tr-lg",
    "rounded-md rounded-bl-lg",
    "rounded-md",
    "rounded-lg rounded-tl-sm",
    "rounded-md rounded-br-lg",
    "rounded-md",
    "rounded-md",
    "rounded-lg",
    "rounded-md rounded-tl-lg",
    "rounded-md",
    "rounded-lg",
  ];
  return patterns[i % patterns.length];
}

const listVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

function GalleryTile({ item, index }: { item: CompanyGalleryItem; index: number }) {
  const alt = `${item.title} — ${item.category} at Aj Technology`;
  const [broken, setBroken] = useState(false);
  const onError = useCallback(() => setBroken(true), []);
  const reduceMotion = useReducedMotion();

  const kind = TILE_KIND[index] ?? "standard";
  const aspectClass = aspectForKind(kind);
  const bentoLg = BENTO_LG[index] ?? "";
  const radius = radiusForIndex(index);
  const num = String(index + 1).padStart(2, "0");
  const tilt = index % 2 === 0 ? 1.2 : -1.2;

  const sizes = useMemo(() => {
    if (kind === "hero") return "(max-width: 1024px) 100vw, 28vw";
    return "(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 160px";
  }, [kind]);

  const springIn = reduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 420, damping: 30, mass: 0.85 };

  return (
    <motion.li
      variants={{
        /* Never use opacity:0 here — it caused blank tiles if in-view detection lagged. */
        hidden: reduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 10, scale: 0.98 },
        show: { opacity: 1, y: 0, scale: 1, transition: springIn },
      }}
      className={`group/tile list-none min-h-0 min-w-0 ${
        item.featured ? "col-span-2 md:col-span-2" : "col-span-1"
      } ${bentoLg}`}
    >
      <motion.div
        className={`h-full bg-gradient-to-br from-[#7b61ff]/50 via-[#3b82f6]/22 to-[#00e5ff]/35 p-px shadow-md shadow-[#7b61ff]/15 ${radius}`}
        whileHover={
          reduceMotion
            ? {}
            : {
                y: -4,
                rotate: tilt * 0.75,
                scale: 1.03,
                boxShadow: "0 14px 28px -10px rgba(0, 229, 255, 0.22), 0 8px 16px -12px rgba(123, 97, 255, 0.3)",
              }
        }
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
      >
        <figure className={`relative flex h-full min-h-0 flex-col overflow-hidden bg-[#080c16] ${radius}`}>
          <span
            className="pointer-events-none absolute left-1.5 top-1.5 z-20 font-mono text-[8px] font-bold tabular-nums text-white/28 transition-colors duration-300 group-hover/tile:text-[#00e5ff]/70 sm:left-2 sm:top-2 sm:text-[9px]"
            aria-hidden
          >
            {num}
          </span>

          <div
            className={`relative z-0 w-full shrink-0 overflow-hidden ${aspectClass} ${radius}`}
            style={{
              background:
                "linear-gradient(160deg, rgba(123,97,255,0.1) 0%, rgba(15,20,35,0.92) 50%, rgba(0,229,255,0.05) 100%)",
            }}
          >
            {!broken ? (
              <Image
                src={item.imageUrl}
                alt={alt}
                fill
                unoptimized={isRemoteUrl(item.imageUrl)}
                className="object-cover transition-transform duration-500 ease-out group-hover/tile:scale-105"
                sizes={sizes}
                onError={onError}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center p-3 text-center">
                <p className="text-[10px] text-white/45">Unavailable</p>
              </div>
            )}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050810] via-[#0a0e1a]/5 to-transparent"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-[#7b61ff]/8 to-transparent opacity-70"
              aria-hidden
            />

            <figcaption className="absolute inset-x-0 bottom-0 z-10 p-1.5 sm:p-2">
              <span className="inline-flex items-center border-l border-[#00e5ff] bg-black/50 pl-1 pr-1 py-px text-[7px] font-bold uppercase tracking-[0.1em] text-[#00e5ff] backdrop-blur-sm sm:text-[8px]">
                {item.category}
              </span>
              <h3
                className={`mt-0.5 font-semibold leading-tight tracking-tight text-white drop-shadow ${
                  kind === "hero" ? "text-xs sm:text-sm lg:text-base" : "text-[10px] sm:text-xs"
                }`}
              >
                {item.title}
              </h3>
              <p
                className={`mt-px text-pretty text-white/60 ${
                  kind === "hero" ? "line-clamp-2 text-[8px] sm:text-[10px]" : "line-clamp-2 text-[7px] sm:text-[9px]"
                }`}
              >
                {item.caption}
              </p>
            </figcaption>
          </div>
        </figure>
      </motion.div>
    </motion.li>
  );
}

export default function CompanyActivityGallery() {
  return (
    <div className="relative mx-auto w-full max-w-4xl xl:max-w-5xl">
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-50 blur-lg sm:rounded-3xl"
        style={{
          background:
            "conic-gradient(from 120deg at 50% 50%, rgba(123,97,255,0.2), rgba(0,229,255,0.08), rgba(59,130,246,0.15), rgba(123,97,255,0.2))",
        }}
        aria-hidden
      />
      <div className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-[#060912]/75 p-1.5 shadow-lg shadow-black/35 backdrop-blur-sm sm:rounded-2xl sm:p-2 md:p-2.5">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#7b61ff]/15 blur-2xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-16 -left-12 h-36 w-36 rounded-full bg-[#00e5ff]/8 blur-2xl"
          aria-hidden
        />

        <motion.ul
          className="relative grid grid-cols-2 grid-flow-dense gap-1 sm:gap-1.5 md:grid-cols-2 lg:grid-cols-5 lg:gap-2 [&>li]:min-w-0"
          aria-label="Company and team activity gallery"
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-24px", amount: 0.08 }}
        >
          {companyGalleryActivities.map((item, i) => (
            <GalleryTile key={item.id} item={item} index={i} />
          ))}
        </motion.ul>
      </div>
    </div>
  );
}
