import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";

const products = [
  { title: "AI CRM", description: "Smart CRM that tracks customers, automates sales pipelines, and provides AI-driven insights.", iconType: "crm" as const },
  { title: "AutoInvoice", description: "SaaS platform for automated invoicing, payment tracking, and financial reports.", iconType: "invoice" as const },
  { title: "AI Chat Support", description: "AI-powered chatbot system for automating customer service on websites.", iconType: "chat" as const },
  { title: "Workflow Automator", description: "Connect apps and automate repetitive business tasks.", iconType: "workflow" as const },
  { title: "SaaS Analytics", description: "Real-time dashboard with business analytics and AI predictions.", iconType: "analytics" as const },
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {products.map((p, i) => (
                <ProductCard
                  key={p.title}
                  title={p.title}
                  description={p.description}
                  iconType={p.iconType}
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
