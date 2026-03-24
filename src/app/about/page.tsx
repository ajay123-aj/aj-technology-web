"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TeamCard from "@/components/TeamCard";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const team = [
  {
    name: "Arjun Patel",
    role: "CEO",
    description: "Leading vision and strategy for AI-powered SaaS and company growth.",
  },
  {
    name: "Neha Sharma",
    role: "CTO",
    description: "Architecture, cloud infrastructure, and scalable systems.",
  },
  {
    name: "Rahul Mehta",
    role: "Lead Developer",
    description: "Core platform development and technical leadership.",
  },
  {
    name: "Priya Nair",
    role: "Product Manager",
    description: "Product strategy and AI-powered SaaS roadmap.",
  },
  {
    name: "Vikram Singh",
    role: "UI/UX Designer",
    description: "User experience and modern interface design.",
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
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="section-title"
            >
              Company Story
              <motion.span
                className="section-title-accent block"
                initial={false}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{ transformOrigin: "center" }}
              />
            </motion.h2>
            <motion.div
              initial={false}
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
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="section-title"
            >
              Mission & Vision
              <motion.span
                className="section-title-accent block"
                initial={false}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{ transformOrigin: "center" }}
              />
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 max-w-4xl mx-auto">
              <motion.div
                initial={false}
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
                initial={false}
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
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="section-title"
            >
              Leadership Team
              <motion.span
                className="section-title-accent block"
                initial={false}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{ transformOrigin: "center" }}
              />
            </motion.h2>
            <p className="body-text text-center max-w-xl mx-auto mb-8">
              Meet the people building the future of AI-powered software.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
              {team.map((member, i) => (
                <TeamCard
                  key={member.name}
                  name={member.name}
                  role={member.role}
                  description={member.description}
                  delay={i * 0.08}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
