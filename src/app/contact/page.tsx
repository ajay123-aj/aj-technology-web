"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import {
  validateContactInput,
  type ContactFieldErrors,
} from "@/lib/contactValidation";

const inputBase =
  "w-full px-4 py-3 rounded-xl border bg-white/5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent disabled:opacity-50";
const inputOk = "border-white/10";
const inputErr = "border-red-400/60";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});

  function clearFieldError(field: keyof ContactFieldErrors) {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitted(false);
    setFieldErrors({});
    const form = e.currentTarget;
    const fd = new FormData(form);

    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const subject = String(fd.get("subject") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();

    const contactCheck = validateContactInput({ email, phone });
    if (!contactCheck.ok) {
      setFieldErrors(contactCheck.errors);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/aj-web/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          subject,
          message,
          pageUrl: typeof window !== "undefined" ? window.location.href : "",
          extra: {},
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        message?: string;
        errors?: ContactFieldErrors;
      };

      if (!res.ok) {
        const apiErrors = data.errors;
        if (apiErrors && typeof apiErrors === "object") {
          setFieldErrors({
            ...(typeof apiErrors.email === "string" ? { email: apiErrors.email } : {}),
            ...(typeof apiErrors.phone === "string" ? { phone: apiErrors.phone } : {}),
          });
        }
        setError(
          typeof data.error === "string"
            ? data.error
            : typeof data.message === "string"
              ? data.message
              : `Request failed (${res.status})`
        );
        return;
      }

      setSubmitted(true);
      form.reset();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-mesh bg-animated-orbs">
      <Navbar />
      <main>
        <Hero
          title="Contact Us"
          subtitle="Get in touch for demos, support, or partnerships."
          showCta={false}
        />

        <section className="section-padding section-bg-animate">
          <div className="container-narrow">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 1, x: 0 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <div className="glass-card p-5">
                  <h3 className="heading-3 mb-3">Company Email</h3>
                  <a
                    href="mailto:hello@ajtechnology.com"
                    className="text-[#00E5FF] hover:underline"
                  >
                    hello@ajtechnology.com
                  </a>
                </div>
                <div className="glass-card p-5">
                  <h3 className="heading-3 mb-3">Phone</h3>
                  <a href="tel:+1234567890" className="text-white/80 hover:text-white">
                    +1 (234) 567-890
                  </a>
                </div>
                <div className="glass-card p-5">
                  <h3 className="heading-3 mb-3">Social</h3>
                  <div className="flex gap-4">
                    <a
                      href="#"
                      className="text-white/60 hover:text-[#00E5FF] transition-colors"
                      aria-label="LinkedIn"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="text-white/60 hover:text-[#00E5FF] transition-colors"
                      aria-label="Twitter"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 1, x: 0 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="glass-card p-6">
                  <h3 className="heading-3 mb-4">Send a message</h3>
                  {submitted && !error && !loading && (
                    <p className="mb-3 text-sm text-[#00e5ff]/90" role="status">
                      Thanks — your message was sent.
                    </p>
                  )}
                  {error && (
                    <p className="mb-3 text-sm text-red-300/95" role="alert">
                      {error}
                    </p>
                  )}
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-1">
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        disabled={loading}
                        autoComplete="name"
                        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent disabled:opacity-50"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-1">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        disabled={loading}
                        autoComplete="email"
                        aria-invalid={fieldErrors.email ? true : undefined}
                        aria-describedby={fieldErrors.email ? "email-error" : undefined}
                        onChange={() => clearFieldError("email")}
                        className={`${inputBase} ${fieldErrors.email ? inputErr : inputOk}`}
                        placeholder="you@company.com"
                      />
                      {fieldErrors.email && (
                        <p id="email-error" className="mt-1 text-sm text-red-300/95" role="alert">
                          {fieldErrors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-white/90 mb-1">
                        Phone <span className="text-white/45 font-normal">(optional)</span>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        disabled={loading}
                        autoComplete="tel"
                        inputMode="tel"
                        aria-invalid={fieldErrors.phone ? true : undefined}
                        aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
                        onChange={() => clearFieldError("phone")}
                        className={`${inputBase} ${fieldErrors.phone ? inputErr : inputOk}`}
                        placeholder="+1 …"
                      />
                      {fieldErrors.phone && (
                        <p id="phone-error" className="mt-1 text-sm text-red-300/95" role="alert">
                          {fieldErrors.phone}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-white/90 mb-1">
                        Subject <span className="text-white/45 font-normal">(optional)</span>
                      </label>
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        disabled={loading}
                        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent disabled:opacity-50"
                        placeholder="What is this about?"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-white/90 mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        disabled={loading}
                        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent resize-none disabled:opacity-50"
                        placeholder="Your message..."
                      />
                    </div>
                    <button type="submit" className="btn-primary w-full" disabled={loading}>
                      {loading ? "Sending…" : "Send message"}
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
