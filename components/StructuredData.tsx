export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CriaTech",
    "alternateName": ["Cria Tech", "criatech"],
    "url": "https://criatech.com.br",
    "logo": "https://criatech.com.br/images/heroo.png",
    "image": "https://criatech.com.br/images/heroo.png",
    "description": "Especialistas em desenvolvimento de sites, sistemas e vídeos com inteligência artificial. Transformamos seu negócio com soluções digitais de alta conversão.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Rio de Janeiro",
      "addressRegion": "RJ",
      "addressCountry": "BR"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+55-21-96805-3672",
      "contactType": "customer service",
      "email": "contatodaflonedu@gmail.com",
      "availableLanguage": ["Portuguese"]
    },
    "sameAs": [
      "https://github.com/daflones/criatech"
    ],
    "serviceType": [
      "Desenvolvimento de Sites",
      "Desenvolvimento de Software",
      "Vídeos com Inteligência Artificial",
      "Landing Pages",
      "Sistemas Web",
      "E-commerce"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "Brazil"
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "Desenvolvimento de Sites Profissionais",
        "description": "Sites personalizados e responsivos com alta conversão",
        "price": "297",
        "priceCurrency": "BRL",
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "name": "Vídeos com Inteligência Artificial",
        "description": "Vídeos profissionais automatizados com IA",
        "price": "49.99",
        "priceCurrency": "BRL",
        "availability": "https://schema.org/InStock"
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
