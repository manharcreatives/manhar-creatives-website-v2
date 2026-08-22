import Seo, { orgSchema, breadcrumbSchema } from '../components/Seo';
import LegalLayout from './LegalLayout';
import { SITE } from '../data/site';

const UPDATED = '1 August 2026';

const SECTIONS = [
  {
    heading: 'Agreement to Terms',
    blocks: [
      {
        type: 'p',
        text: `These Terms & Conditions govern your use of <strong>${SITE.domain}</strong> and any services provided by ${SITE.name} ("we", "us", "our"), a digital solutions and branding company based in ${SITE.address.locality}, ${SITE.address.region}, India.`,
      },
      {
        type: 'p',
        text: 'By accessing this website, submitting an enquiry, or engaging us for a project, you accept these terms in full. If you do not agree with any part of them, please do not use the website or our services.',
      },
      {
        type: 'callout',
        text: 'Where a signed proposal, quotation or written agreement exists for a specific project, that document takes precedence over these general terms wherever the two differ.',
      },
    ],
  },
  {
    heading: 'Our Services',
    blocks: [
      { type: 'p', text: 'We provide the following services, individually or in combination:' },
      {
        type: 'ul',
        items: [
          '<strong>Website Development</strong>: business websites, corporate websites, landing pages and portfolio websites',
          '<strong>Custom Software Development</strong>: CRM systems, admin dashboards, internal tools, business automation and API integrations',
          '<strong>Branding & Identity</strong>: logo design, brand identity systems, brand guidelines and visual systems',
          '<strong>Social Media Design</strong>: post templates, campaign creatives and content design systems',
          '<strong>Print & Offline Branding</strong>: stationery, brochures, signage, packaging and marketing collateral',
          '<strong>Digital Presence & Growth</strong>: Google Business Profile, business email, WhatsApp Business and local visibility foundations',
        ],
      },
      {
        type: 'p',
        text: 'The exact scope, deliverables, timeline and cost of any engagement are defined in the written proposal or quotation issued for that project. Anything not explicitly included in that document is outside scope.',
      },
    ],
  },
  {
    heading: 'Quotations and Project Scope',
    blocks: [
      {
        type: 'ul',
        items: [
          'Quotations are valid for <strong>30 days</strong> from the date of issue unless stated otherwise.',
          'Every quotation is based on the requirements shared at the time of quoting. If requirements change materially, the quotation may be revised.',
          'Work commences only after written acceptance of the proposal and receipt of the agreed advance payment.',
          'Requests that fall outside the agreed scope will be quoted separately and require your approval before we proceed.',
          'The number of revision rounds included is stated in the proposal. Additional rounds beyond that are chargeable.',
        ],
      },
      {
        type: 'p',
        text: '"Scope creep" is the most common cause of delays and disputes in digital projects. We manage it by documenting scope clearly upfront and raising a change request whenever something new is added, rather than absorbing it silently and delivering late.',
      },
    ],
  },
  {
    heading: 'Payment Terms',
    blocks: [
      {
        type: 'table',
        head: ['Stage', 'Typical payment'],
        rows: [
          ['Project commencement', '40–50% advance, non-refundable once work begins'],
          ['Milestone or design approval', 'As specified in the proposal'],
          ['Before final delivery / launch', 'Remaining balance'],
        ],
      },
      {
        type: 'ul',
        items: [
          'All prices are quoted in Indian Rupees (INR) unless stated otherwise. Applicable taxes are additional.',
          'Shorter-scope work, such as Print & Offline Branding, requires <strong>full advance payment</strong> before work begins, as set out in that service\'s own terms, rather than the staged structure above.',
          'Payments are accepted by bank transfer, UPI or other methods communicated at the time of invoicing.',
          'Final files, source code, credentials and production assets are released only after full payment is received.',
          'Third-party costs (domains, hosting, premium fonts, stock imagery, plugin licences, paid APIs) are billed separately at actual cost unless explicitly included in the proposal.',
          'We reserve the right to pause work on a project where payment is overdue beyond the agreed terms.',
        ],
      },
    ],
  },
  {
    heading: 'Client Responsibilities',
    blocks: [
      {
        type: 'p',
        text: 'Digital projects are collaborative. Timely delivery depends materially on your input, and the following are your responsibility:',
      },
      {
        type: 'ul',
        items: [
          'Providing accurate business information, content, images, logos and any other material required, in a usable format',
          'Providing timely feedback and approvals at each review stage',
          'Ensuring you hold the necessary rights to any content, images, fonts or trademarks you supply to us',
          'Providing access to domains, hosting, social accounts or third-party systems where required',
          'Nominating a single point of contact authorised to give approvals',
        ],
      },
      {
        type: 'callout',
        text: 'Where a project is delayed because required content, feedback or access has not been provided, the agreed timeline is extended accordingly, and we are not liable for the resulting delay.',
      },
    ],
  },
  {
    heading: 'Timelines and Delivery',
    blocks: [
      {
        type: 'ul',
        items: [
          'Timelines shared in a proposal are estimates based on the assumption of timely client input and approvals.',
          'Working days exclude Sundays and public holidays in India.',
          'Delays caused by late content, late feedback, scope changes or third-party dependencies extend the delivery date by an equivalent period.',
          'If a project is inactive for more than 30 days due to a lack of client response, we may treat it as suspended and require a re-scheduling fee to resume.',
        ],
      },
    ],
  },
  {
    heading: 'Intellectual Property and Ownership',
    blocks: [
      {
        type: 'p',
        text: 'Ownership transfers to you on full payment. Specifically, once the final invoice is settled:',
      },
      {
        type: 'ul',
        items: [
          '<strong>You own</strong> the final delivered designs, website, source code and brand assets created specifically for your project.',
          '<strong>You own</strong> the domain name, hosting account and all data associated with them. We never register a client domain in our own name.',
          '<strong>We retain</strong> ownership of our internal tools, frameworks, reusable components, methodologies and pre-existing intellectual property used to produce the work.',
          '<strong>Third-party assets</strong> (fonts, stock photography, plugins and libraries) remain governed by their respective licences, which are transferred to you where the licence permits.',
          '<strong>Rejected concepts</strong> and unused design directions remain our property and may be repurposed.',
        ],
      },
      {
        type: 'p',
        text: 'You warrant that any material you supply to us does not infringe the intellectual property rights of any third party, and you indemnify us against claims arising from material you provide.',
      },
    ],
  },
  {
    heading: 'Portfolio and Promotional Rights',
    blocks: [
      {
        type: 'p',
        text: 'Unless you request otherwise in writing, we reserve the right to display completed work in our portfolio, on this website, in proposals and on social media. This includes visual designs, screenshots and a general description of the project.',
      },
      {
        type: 'p',
        text: 'We will never publish confidential business information, customer data, pricing, commercial terms or internal processes. If you prefer that a project is not shown publicly, tell us and we will exclude it entirely.',
      },
    ],
  },
  {
    heading: 'Revisions, Support and Maintenance',
    blocks: [
      {
        type: 'ul',
        items: [
          'The number of revision rounds included is defined in the proposal. A "revision round" means one consolidated set of feedback, not an unlimited series of individual changes.',
          'Post-launch support covering bugs and defects in the delivered work is included for the period stated in the proposal.',
          'Support does not cover new features, design changes, content updates or issues caused by third-party services, hosting problems, or changes made by others after handover.',
          'Ongoing maintenance, content updates and enhancements are available under a separate arrangement.',
        ],
      },
    ],
  },
  {
    heading: 'Cancellation and Refunds',
    blocks: [
      {
        type: 'ul',
        items: [
          'Advance payments are <strong>non-refundable</strong> once work has commenced, as they compensate time already allocated and delivered.',
          'If you cancel mid-project, you are liable for all work completed up to the cancellation date, calculated proportionally against the agreed scope.',
          'Work completed but unpaid at the point of cancellation remains our property and may not be used.',
          'We reserve the right to terminate an engagement where the client is unresponsive beyond 60 days, where payment obligations are not met, or where the working relationship becomes untenable. In such cases, completed work is invoiced and delivered up to that point.',
        ],
      },
    ],
  },
  {
    heading: 'Limitation of Liability',
    blocks: [
      {
        type: 'p',
        text: 'To the maximum extent permitted by law:',
      },
      {
        type: 'ul',
        items: [
          'Our total liability arising from any project is limited to the total amount paid by you for that project.',
          'We are not liable for indirect, incidental or consequential losses, including loss of profit, loss of business, loss of data or loss of goodwill.',
          'We are not liable for issues arising from third-party services, including hosting providers, domain registrars, payment gateways, plugins, APIs or platform policy changes.',
          'We do not guarantee specific search engine rankings, traffic volumes, conversion rates, sales or business outcomes. We build the technical and structural foundations that support these outcomes; results also depend on factors outside our control.',
          'We are not liable for changes, damage or downtime caused by modifications made by you or a third party after handover.',
        ],
      },
      {
        type: 'callout',
        text: 'Nothing in these terms excludes liability that cannot lawfully be excluded under Indian law.',
      },
    ],
  },
  {
    heading: 'Confidentiality',
    blocks: [
      {
        type: 'p',
        text: 'Both parties agree to keep confidential any non-public business information disclosed during an engagement, including pricing, strategy, customer data, internal processes and technical details, and not to disclose it to third parties without written consent. This obligation survives the completion of the project.',
      },
    ],
  },
  {
    heading: 'Website Use',
    blocks: [
      {
        type: 'p',
        text: 'All content on this website (text, design, code, graphics, logos and images) is the property of ' + SITE.name + ' and protected by applicable intellectual property law. You may not copy, reproduce, republish or redistribute any part of it without written permission.',
      },
      {
        type: 'ul',
        items: [
          'Content on this website is provided for general information and does not constitute professional advice.',
          'We make reasonable efforts to keep information accurate and current, but do not warrant that it is complete or error-free.',
          'You may not attempt to gain unauthorised access to the website, interfere with its operation, or use automated tools to scrape it at scale.',
          'The website is provided "as is" and we do not guarantee uninterrupted availability.',
        ],
      },
    ],
  },
  {
    heading: 'Force Majeure',
    blocks: [
      {
        type: 'p',
        text: 'Neither party shall be liable for failure or delay in performance caused by circumstances beyond reasonable control, including natural disasters, government action, power or internet failures, pandemics, strikes, or failures of third-party infrastructure. Timelines are extended for the duration of such events.',
      },
    ],
  },
  {
    heading: 'Governing Law and Jurisdiction',
    blocks: [
      {
        type: 'p',
        text: `These Terms & Conditions are governed by and construed in accordance with the laws of India. Any dispute arising out of or in connection with these terms or any engagement shall be subject to the exclusive jurisdiction of the courts of ${SITE.address.region}, India.`,
      },
      {
        type: 'p',
        text: 'Both parties agree to attempt good-faith resolution through direct discussion before initiating any formal proceedings.',
      },
    ],
  },
  {
    heading: 'Changes to These Terms',
    blocks: [
      {
        type: 'p',
        text: 'We may revise these Terms & Conditions from time to time. The "last updated" date at the top of this page reflects the current version. Changes apply to new engagements from the date of publication; existing signed agreements remain governed by the terms in force when they were accepted.',
      },
    ],
  },
  {
    heading: 'Contact',
    blocks: [
      {
        type: 'p',
        text: `For any questions regarding these Terms & Conditions, contact us at <a href="mailto:${SITE.email}" style="color:var(--color-primary)">${SITE.email}</a> or ${SITE.phone}. Our address is ${SITE.address.street}, ${SITE.address.locality}, ${SITE.address.region} ${SITE.address.postalCode}, ${SITE.address.country}.`,
      },
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <Seo
        path="/terms-and-conditions"
        title={`Terms & Conditions | ${SITE.name}`}
        description={`Terms and conditions for engaging ${SITE.name}: scope, payment terms, timelines, intellectual property and ownership, revisions, cancellation and liability.`}
        keywords={['terms and conditions', 'service terms', 'manhar creatives terms', 'website terms of use india']}
        schema={[
          orgSchema(),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Terms & Conditions', path: '/terms-and-conditions' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Terms & Conditions',
            url: `${SITE.url}/terms-and-conditions`,
            description: 'Terms and Conditions for Manhar Creatives services.',
            dateModified: '2026-08-01',
            isPartOf: { '@id': `${SITE.url}/#website` },
          },
        ]}
      />

      <LegalLayout
        eyebrow="LEGAL"
        title="Terms &"
        titleAccent="Conditions"
        subtitle="How we work together: scope, payments, timelines, ownership and what each side is responsible for. Clear terms prevent difficult conversations later."
        background="/images/backgrounds/legal-terms-bg.webp"
        updated={UPDATED}
        sections={SECTIONS}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Terms & Conditions', path: '/terms-and-conditions' },
        ]}
      />
    </>
  );
}
