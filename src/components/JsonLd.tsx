import { getPublicSiteUrl } from "@/lib/publicSiteUrl";

const baseUrl = getPublicSiteUrl();

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "Aj Technology",
      url: baseUrl,
      description:
        "AI-powered software and automation for modern businesses. Build intelligent tools, scale faster, and succeed.",
      sameAs: [],
      contactPoint: {
        "@type": "ContactPoint",
        url: `${baseUrl}/contact`,
        contactType: "customer service",
        availableLanguage: "English",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      url: baseUrl,
      name: "Aj Technology",
      description:
        "AI-powered software and automation for modern businesses. Build intelligent tools, scale faster, and succeed.",
      publisher: { "@id": `${baseUrl}/#organization` },
      inLanguage: "en-US",
    },
  ],
};

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}
