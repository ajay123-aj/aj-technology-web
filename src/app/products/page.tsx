import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";

const products = [
  { title: "AJ Email Editor", description: "Easily create professional email templates with an intuitive drag-and-drop editor. Build beautiful, responsive emails in minutes.", iconType: "workflow" as const, href: "https://mail.ajtechhub.com/" },
  { title: "Customer Nurturing", description: "SMS, notifications, WhatsApp, and more—all with AI integration. Set up workflows and automation for end-to-end customer nurturing.", iconType: "chat" as const, href: "https://nurturing.ajtechhub.com/" },
  { title: "Aj Smart Biz", description: "Your business website built and live in one working day — domain, hosting, SSL, backups and unlimited edits included for one monthly recharge.", iconType: "globe" as const, href: "https://smart-biz.ajtechhub.com/" },
];

export default function Products() {
  return (
    <div className="min-h-screen bg-gradient-mesh bg-animated-orbs">
      <Navbar />
      <main>
        <Hero
          title="Our Products"
          subtitle="Intelligent tools designed to automate and scale your business."
          showCta={true}
        />
        <section className="section-padding section-bg-animate">
          <div className="container-narrow">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {products.map((p, i) => (
                <ProductCard
                  key={p.title}
                  title={p.title}
                  description={p.description}
                  iconType={p.iconType}
                  href={p.href}
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
