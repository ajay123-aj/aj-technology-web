"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { IconCode, IconBot, IconCloud, IconPlug, IconSparkles, IconShield, IconZap } from "./Icons";

const services = [
  { title: "Custom SaaS Development", description: "Tailored software for your workflows and scale.", Icon: IconCode },
  { title: "AI Automation", description: "Intelligent automation that saves time and reduces errors.", Icon: IconBot },
  { title: "Cloud Engineering", description: "Scalable, secure applications on modern cloud.", Icon: IconCloud },
  { title: "API Integrations", description: "Connect your tools and data seamlessly.", Icon: IconPlug },
];

const features = [
  { title: "AI Powered", description: "Cutting-edge AI for automation and insights.", Icon: IconSparkles },
  { title: "Secure & Scalable", description: "Enterprise-grade security and scale.", Icon: IconShield },
  { title: "Fast Integration", description: "Connect with your stack in minutes.", Icon: IconZap },
];

export default function HomeSections() {
  return (
    <>
      <section id="services" className="section-padding section-bg-animate bg-white/[0.02]">
        <div className="container-narrow">
          <motion.h2
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="section-title"
          >
            Services
            <motion.span
              className="section-title-accent block"
              initial={false}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ transformOrigin: "center" }}
            />
          </motion.h2>
          <motion.p
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="body-text text-center max-w-xl mx-auto mb-8"
          >
            End-to-end solutions to build and run your software.
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className="glass-card group-card p-4 sm:p-5"
              >
                <motion.div
                  className="mb-3 [&_svg]:w-8 [&_svg]:h-8 sm:[&_svg]:w-9 sm:[&_svg]:h-9 flex-shrink-0 card-icon-glow rounded-lg p-2 w-fit bg-white/5 border border-white/10"
                  whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1, transition: { duration: 0.4 } }}
                >
                  <s.Icon />
                </motion.div>
                <h3 className="heading-3 mb-1">{s.title}</h3>
                <p className="body-text text-sm">{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="section-padding section-bg-animate">
        <div className="container-narrow">
          <motion.h2
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="section-title"
          >
            Features
            <motion.span
              className="section-title-accent block"
              initial={false}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ transformOrigin: "center" }}
            />
          </motion.h2>
          <motion.p
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="body-text text-center max-w-xl mx-auto mb-8"
          >
            Built for reliability, security, and scale.
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className="glass-card group-card p-4 sm:p-5"
              >
                <motion.div
                  className="mb-3 [&_svg]:w-8 [&_svg]:h-8 sm:[&_svg]:w-9 sm:[&_svg]:h-9 flex-shrink-0 card-icon-glow rounded-lg p-2 w-fit bg-white/5 border border-white/10"
                  whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1, transition: { duration: 0.4 } }}
                >
                  <f.Icon />
                </motion.div>
                <h3 className="heading-3 mb-1">{f.title}</h3>
                <p className="body-text text-sm">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="cta" className="section-padding section-bg-animate bg-white/[0.02]">
        <div className="container-narrow">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.02, y: -4, transition: { type: "spring", stiffness: 300, damping: 22 } }}
            className="glass-card p-6 sm:p-8 md:p-10 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#7b61ff]/5 via-transparent to-[#00e5ff]/5 pointer-events-none" />
            <h2 className="heading-2 mb-3 relative">Ready to get started?</h2>
            <p className="body-text max-w-lg mx-auto mb-6 text-white/80 relative">
              Join businesses that use our AI-powered tools to scale faster.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link href="/contact" className="btn-primary relative inline-block">
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
