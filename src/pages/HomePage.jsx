import Seo, { orgSchema, faqSchema, breadcrumbSchema, serviceSchema } from '../components/Seo';
import { SITE, SERVICE_AREAS } from '../data/site';
import { SERVICES } from '../data/services';
import { FAQS } from '../utils/constants';

import HeroExperience from '../sections/HeroExperience';
import StoryTransition from '../sections/StoryTransition';
import ValuePropsSection from '../sections/ValuePropsSection';
import ServicesUniverse from '../sections/ServicesUniverse';
import ProcessJourney from '../sections/ProcessJourney';
import FeaturedSolutionsSection from '../sections/FeaturedSolutionsSection';
import IndustriesSection from '../sections/IndustriesSection';
import BenefitsSection from '../sections/BenefitsSection';
import ProjectShowcase from '../sections/ProjectShowcase';
import TrustAuthority from '../sections/TrustAuthority';
import BlogTeaserSection from '../sections/BlogTeaserSection';
import FAQSection from '../sections/FAQSection';
import ContactExperience from '../sections/ContactExperience';

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE.url}/#website`,
  url: SITE.url,
  name: SITE.name,
  description: SITE.description,
  publisher: { '@id': `${SITE.url}/#organization` },
  inLanguage: ['en-IN', 'en'],
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE.url}/blog?s={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE.url}/#localbusiness`,
  name: SITE.name,
  image: `${SITE.url}${SITE.ogImage}`,
  logo: `${SITE.url}${SITE.logo}`,
  url: SITE.url,
  telephone: SITE.phoneRaw,
  email: SITE.email,
  priceRange: '₹₹',
  description: SITE.description,
  slogan: SITE.tagline,
  foundingDate: SITE.founded,
  address: {
    '@type': 'PostalAddress',
    addressLocality: SITE.address.locality,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.countryCode,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: SITE.geo.lat,
    longitude: SITE.geo.lng,
  },
  areaServed: SERVICE_AREAS.map((a) => ({ '@type': 'Place', name: a })),
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:30',
    closes: '19:00',
  },
  sameAs: [SITE.instagram],
};

export default function HomePage() {
  return (
    <>
      <Seo
        path="/"
        title="Website Development, Custom Software & Branding Company in Gujarat | Manhar Creatives"
        description="Manhar Creatives builds websites, custom software and CRM systems, brand identities and digital presence for businesses in Ahmedabad, Mehsana, Visnagar and across India. We design, we build, you grow."
        keywords={[
          'website development company gujarat',
          'custom software development india',
          'crm development company',
          'branding agency ahmedabad',
          'web design company mehsana',
          'digital solutions visnagar',
          'business automation software',
          'logo design gujarat',
          'google business profile setup',
          'professional website design india',
        ]}
        schema={[
          orgSchema(),
          websiteSchema,
          localBusiness,
          /* One Service node per offering, so each can be surfaced
             independently for service-specific queries. */
          ...SERVICES.map(serviceSchema),
          faqSchema(FAQS),
          breadcrumbSchema([{ name: 'Home', path: '/' }]),
        ]}
      />

      <HeroExperience />
      <StoryTransition />
      <ValuePropsSection />
      <ServicesUniverse />
      <ProcessJourney />
      <FeaturedSolutionsSection />
      <IndustriesSection />
      <BenefitsSection />
      <ProjectShowcase />
      <TrustAuthority />
      <BlogTeaserSection />
      <FAQSection />
      <ContactExperience />
    </>
  );
}
