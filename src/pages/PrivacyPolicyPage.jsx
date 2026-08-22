import Seo, { orgSchema, breadcrumbSchema } from '../components/Seo';
import LegalLayout from './LegalLayout';
import { SITE } from '../data/site';

const UPDATED = '1 August 2026';

const SECTIONS = [
  {
    heading: 'Introduction',
    blocks: [
      {
        type: 'p',
        text: `${SITE.name} ("we", "us", "our") operates the website <strong>${SITE.domain}</strong> and provides digital solutions and branding services including website development, custom software development, brand identity design, social media design, print & offline branding and digital presence & growth.`,
      },
      {
        type: 'p',
        text: 'This Privacy Policy explains what information we collect when you visit our website or engage our services, how we use it, who we share it with, and the choices available to you. We have written it in plain language rather than legal boilerplate, because a policy nobody reads protects nobody.',
      },
      {
        type: 'p',
        text: 'By using this website or submitting an enquiry, you agree to the practices described here. If you do not agree, please do not use the website or submit information to us.',
      },
    ],
  },
  {
    heading: 'Information We Collect',
    blocks: [
      { type: 'p', text: 'We collect only what we need to respond to enquiries and deliver our services. Specifically:' },
      {
        type: 'table',
        head: ['Category', 'What it includes', 'How it is collected'],
        rows: [
          ['Contact details', 'Name and phone number, and optionally your email address and business name', 'Submitted by you through our contact form, WhatsApp, email or phone'],
          ['Project information', 'Service required, budget indication, project description, requirements', 'Submitted by you through the contact form or during discussions'],
          ['Chat messages', 'Messages you send to the website chat assistant', 'Entered by you into the on-site chat widget'],
          ['Usage data', 'Pages viewed, time on page, referring source, approximate location, device and browser type', 'Collected automatically via analytics'],
          ['Technical data', 'IP address, browser type, operating system, screen resolution', 'Collected automatically by our hosting provider and analytics'],
          ['Client project data', 'Content, images, credentials and business information you share for a project', 'Provided by you during an engagement'],
        ],
      },
      {
        type: 'callout',
        text: '<strong>We do not collect payment card details on this website.</strong> Any payments are handled directly through bank transfer, UPI or a third-party payment provider, and card information never passes through our systems.',
      },
      {
        type: 'p',
        text: 'We do not knowingly collect information from children under the age of 18. If you believe a minor has provided us with personal information, please contact us and we will delete it.',
      },
    ],
  },
  {
    heading: 'How We Use Your Information',
    blocks: [
      { type: 'p', text: 'We use the information described above for the following purposes, and no others:' },
      {
        type: 'ul',
        items: [
          '<strong>To respond to your enquiry</strong>: contacting you by email, phone or WhatsApp about the project you asked about',
          '<strong>To prepare proposals and quotations</strong>: scoping work accurately based on the requirements you share',
          '<strong>To deliver our services</strong>: building, designing and supporting the work you engage us for',
          '<strong>To communicate during a project</strong>: sharing updates, drafts, approvals and delivery information',
          '<strong>To improve our website</strong>: understanding which pages are useful and where visitors encounter difficulty',
          '<strong>To meet legal and accounting obligations</strong>: issuing invoices and maintaining records required under Indian law',
        ],
      },
      {
        type: 'p',
        text: 'We do <strong>not</strong> sell, rent or trade your personal information to anyone. We do not add you to marketing lists without your consent, and we do not use your enquiry details for unrelated promotions.',
      },
    ],
  },
  {
    heading: 'Third-Party Services We Use',
    blocks: [
      {
        type: 'p',
        text: 'Running this website and our operations requires a small number of third-party providers. Each one receives only the data necessary for its function, and each maintains its own privacy policy.',
      },
      {
        type: 'table',
        head: ['Service', 'Purpose', 'Data involved'],
        rows: [
          ['Google Analytics / Google Tag Manager', 'Website traffic and behaviour analytics', 'Anonymised usage data, approximate location, device information'],
          ['Google Apps Script & Google Sheets', 'Receiving and storing contact form submissions', 'Name, email, phone, project details'],
          ['Supabase', 'Secure database for enquiry and client records', 'Contact and project details'],
          ['Vercel', 'Website hosting and content delivery', 'IP address, request logs'],
          ['WhatsApp (Meta)', 'Direct customer communication', 'Phone number and message content'],
          ['On-site chat assistant', 'Answering common questions and routing enquiries', 'Messages you type into the chat'],
        ],
      },
      {
        type: 'p',
        text: 'Some of these providers operate servers outside India. Where information is transferred internationally, it is handled under the provider’s own security and data protection commitments.',
      },
    ],
  },
  {
    heading: 'Cookies and Tracking',
    blocks: [
      {
        type: 'p',
        text: 'Cookies are small text files stored by your browser. We use a limited number of them:',
      },
      {
        type: 'ul',
        items: [
          '<strong>Essential cookies</strong>: required for the website to function correctly. These cannot be disabled without breaking the site.',
          '<strong>Analytics cookies</strong>: set by Google Analytics to understand how visitors use the site in aggregate. These do not identify you personally.',
        ],
      },
      {
        type: 'p',
        text: 'We do not use advertising cookies, remarketing pixels or cross-site tracking on this website.',
      },
      {
        type: 'p',
        text: 'You can block or delete cookies through your browser settings, and you can opt out of Google Analytics using Google’s official browser add-on. Blocking analytics cookies will not affect your ability to use the website or contact us.',
      },
    ],
  },
  {
    heading: 'Data Retention',
    blocks: [
      { type: 'p', text: 'We keep information only as long as there is a reason to:' },
      {
        type: 'table',
        head: ['Data type', 'Retention period'],
        rows: [
          ['Enquiries that do not become projects', 'Up to 24 months, then deleted'],
          ['Active client records and project files', 'For the duration of the engagement and 3 years afterwards'],
          ['Invoices and financial records', 'As required under Indian tax and accounting law'],
          ['Analytics data', 'As per Google Analytics default retention settings'],
          ['Chat conversations', 'Retained only as long as needed to respond to the enquiry'],
        ],
      },
      {
        type: 'p',
        text: 'You may request deletion of your information at any time, subject to any records we are legally required to retain.',
      },
    ],
  },
  {
    heading: 'Data Security',
    blocks: [
      { type: 'p', text: 'We take reasonable technical and organisational measures to protect the information you share with us:' },
      {
        type: 'ul',
        items: [
          'All traffic to this website is encrypted using HTTPS/SSL',
          'Access to enquiry and client data is restricted to authorised team members only',
          'Third-party services are chosen for their established security practices',
          'Credentials shared for project work are stored securely and removed once the engagement concludes',
          'We ask clients never to send passwords or sensitive credentials over unencrypted channels',
        ],
      },
      {
        type: 'callout',
        text: 'No method of transmission over the internet is completely secure. While we work to protect your information, we cannot guarantee absolute security, and you share information with us at your own discretion.',
      },
    ],
  },
  {
    heading: 'Your Rights and Choices',
    blocks: [
      { type: 'p', text: 'You have the right to:' },
      {
        type: 'ul',
        items: [
          '<strong>Access</strong>: request a copy of the personal information we hold about you',
          '<strong>Correction</strong>: ask us to correct information that is inaccurate or incomplete',
          '<strong>Deletion</strong>: request that we delete your information, subject to legal retention requirements',
          '<strong>Withdraw consent</strong>: ask us to stop contacting you at any time',
          '<strong>Object</strong>: object to particular uses of your information',
        ],
      },
      {
        type: 'p',
        text: `To exercise any of these rights, email us at <a href="mailto:${SITE.email}" style="color:var(--color-primary)">${SITE.email}</a> with the details of your request. We will respond within a reasonable time and may ask you to verify your identity before acting on the request.`,
      },
    ],
  },
  {
    heading: 'Client Project Confidentiality',
    blocks: [
      {
        type: 'p',
        text: 'Business information you share with us during a project (pricing, customer data, internal processes, unreleased plans, source materials) is treated as confidential and is not shared with any third party.',
      },
      {
        type: 'p',
        text: 'We may display completed work publicly in our portfolio, on this website, or on social media, showing the visual design and a general description of the project. We will not publish confidential business information, customer data, or commercial terms. If you would prefer that your project is not shown publicly at all, tell us and we will exclude it.',
      },
    ],
  },
  {
    heading: 'External Links',
    blocks: [
      {
        type: 'p',
        text: 'This website contains links to client projects, third-party tools and other external websites. We are not responsible for the privacy practices or content of those sites. We encourage you to read the privacy policy of any external site you visit.',
      },
    ],
  },
  {
    heading: 'Changes to This Policy',
    blocks: [
      {
        type: 'p',
        text: 'We may update this Privacy Policy as our services, tools or legal obligations change. The "last updated" date at the top of this page always reflects the current version. Significant changes will be highlighted on this page.',
      },
      {
        type: 'p',
        text: 'Continued use of the website after changes are published constitutes acceptance of the revised policy.',
      },
    ],
  },
  {
    heading: 'Governing Law',
    blocks: [
      {
        type: 'p',
        text: `This Privacy Policy is governed by the laws of India, including the Information Technology Act, 2000 and applicable data protection regulations. Any disputes relating to this policy shall be subject to the jurisdiction of the courts of ${SITE.address.region}, India.`,
      },
    ],
  },
  {
    heading: 'Contact Us',
    blocks: [
      {
        type: 'p',
        text: `If you have questions, concerns or requests regarding this Privacy Policy or how we handle your information, contact us at <a href="mailto:${SITE.email}" style="color:var(--color-primary)">${SITE.email}</a> or ${SITE.phone}. Our address is ${SITE.address.locality}, ${SITE.address.region} ${SITE.address.postalCode}, ${SITE.address.country}.`,
      },
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Seo
        path="/privacy-policy"
        title={`Privacy Policy | ${SITE.name}`}
        description={`How ${SITE.name} collects, uses, stores and protects your information: what we collect, which third-party services we use, how long we keep data, and your rights.`}
        keywords={['privacy policy', 'data protection', 'manhar creatives privacy', 'website privacy policy india']}
        background="/images/backgrounds/legal-privacy-bg.webp"
        schema={[
          orgSchema(),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Privacy Policy', path: '/privacy-policy' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Privacy Policy',
            url: `${SITE.url}/privacy-policy`,
            description: 'Privacy Policy for Manhar Creatives.',
            dateModified: '2026-08-01',
            isPartOf: { '@id': `${SITE.url}/#website` },
          },
        ]}
      />

      <LegalLayout
        eyebrow="LEGAL"
        title="Privacy"
        titleAccent="Policy"
        subtitle="What we collect, why we collect it, who we share it with, and the control you have over it: written to be read, not skimmed."
        background="/images/backgrounds/legal-privacy-bg.webp"
        updated={UPDATED}
        sections={SECTIONS}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Privacy Policy', path: '/privacy-policy' },
        ]}
      />
    </>
  );
}
