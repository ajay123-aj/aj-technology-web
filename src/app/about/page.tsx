"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TeamCard from "@/components/TeamCard";
import CompanyActivityGallery from "@/components/CompanyActivityGallery";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

/** Leadership photos: CEO uses local `/team/`; others may use Unsplash until you add files. Update `social` with real URLs. */
const team = [
  {
    name: "Ajay Mithapara",
    role: "CEO",
    description: "Leading vision and strategy for AI-powered SaaS and company growth.",
    imageUrl: "/team/ajay-mithapara.png",
    social: {
      linkedinUrl: "https://www.linkedin.com/in/ajaymithapara",
      twitterUrl: "https://x.com/ajtechnology",
      email: "ajay.mithapara@ajtechnology.com",
    },
  },
  {
    name: "Neha Sharma",
    role: "CTO",
    description: "Architecture, cloud infrastructure, and scalable systems.",
    imageUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=85&auto=format&fit=crop",
    social: {
      linkedinUrl: "https://www.linkedin.com/in/neha-sharma",
      twitterUrl: "https://x.com/ajtechnology",
      email: "neha.sharma@ajtechnology.com",
    },
  },
  {
    name: "Rahul Mehta",
    role: "Lead Developer",
    description: "Core platform development and technical leadership.",
    imageUrl:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=85&auto=format&fit=crop",
    social: {
      linkedinUrl: "https://www.linkedin.com/in/rahul-mehta",
      email: "rahul.mehta@ajtechnology.com",
    },
  },
  {
    name: "Priya Nair",
    role: "Product Manager",
    description: "Product strategy and AI-powered SaaS roadmap.",
    imageUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=85&auto=format&fit=crop",
    social: {
      linkedinUrl: "https://www.linkedin.com/in/priya-nair",
      twitterUrl: "https://x.com/ajtechnology",
      email: "priya.nair@ajtechnology.com",
    },
  },
  {
    name: "Vikram Singh",
    role: "UI/UX Designer",
    description: "User experience and modern interface design.",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=85&auto=format&fit=crop",
    social: {
      linkedinUrl: "https://www.linkedin.com/in/vikram-singh",
      twitterUrl: "https://x.com/ajtechnology",
      email: "vikram.singh@ajtechnology.com",
    },
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-mesh bg-animated-orbs">
      <Navbar />
      <main>
        <Hero
          title="About Our Company"
          subtitle="We build innovative AI-powered software that helps businesses automate and scale."
          showCta={false}
        />

        <section className="section-padding section-bg-animate bg-white/[0.02]">
          <div className="container-narrow">
            <motion.h2
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="section-title"
            >
              Company Story
              <motion.span
                className="section-title-accent block"
                initial={{ scaleX: 1 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{ transformOrigin: "center" }}
              />
            </motion.h2>
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-6 md:p-8 max-w-4xl mx-auto"
            >
              <p className="body-text mb-4">
                We were founded to help businesses adopt AI and automation. Our focus is on
                SaaS product development and intelligent automation tools that simplify
                operations and accelerate growth.
              </p>
              <p className="body-text">
                Our mission is to build powerful, scalable digital solutions that empower
                teams to work smarter. From startups to enterprises, we deliver software
                that combines cutting-edge AI with practical design.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="section-padding section-bg-animate">
          <div className="container-narrow">
            <motion.h2
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="section-title"
            >
              Mission & Vision
              <motion.span
                className="section-title-accent block"
                initial={{ scaleX: 1 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{ transformOrigin: "center" }}
              />
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="glass-card p-6"
              >
                <h3 className="heading-3 mb-2 text-[#00E5FF]">Mission</h3>
                <p className="body-text">
                  To empower businesses with intelligent software that simplifies
                  operations and accelerates growth.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -4 }}
                className="glass-card p-6"
              >
                <h3 className="heading-3 mb-2 text-[#7b61ff]">Vision</h3>
                <p className="body-text">
                  To become a global leader in AI-driven SaaS and digital automation.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="section-padding section-bg-animate bg-white/[0.02]">
          <div className="container-narrow">
            <motion.h2
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="section-title"
            >
              Leadership Team
              <motion.span
                className="section-title-accent block"
                initial={{ scaleX: 1 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{ transformOrigin: "center" }}
              />
            </motion.h2>
            <p className="body-text text-center max-w-lg mx-auto mb-8 text-sm">
              Meet the people behind our AI-powered software—hover a portrait for social links, or use Connect on
              smaller screens.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-5 lg:gap-6 max-w-6xl mx-auto">
              {team.map((member, i) => (
                <TeamCard
                  key={member.name}
                  name={member.name}
                  role={member.role}
                  description={member.description}
                  imageUrl={member.imageUrl}
                  social={member.social}
                  delay={i * 0.06}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding section-bg-animate">
          <div className="container-narrow max-w-7xl">
            <motion.h2
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="section-title"
            >
              Life at Aj Technology
              <motion.span
                className="section-title-accent block"
                initial={{ scaleX: 1 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{ transformOrigin: "center" }}
              />
            </motion.h2>
            <p className="body-text text-center max-w-2xl mx-auto mb-8 text-sm md:text-base">
              Workshops, milestones, offsites, and day-to-day collaboration across the company.
            </p>
            <CompanyActivityGallery />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
