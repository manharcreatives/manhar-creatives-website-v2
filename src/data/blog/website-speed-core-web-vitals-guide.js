export default {
  slug: 'website-speed-core-web-vitals-guide',
  title: 'Why Your Website Is Slow: Core Web Vitals Explained for Business Owners',
  h1: 'Why Your Website Is Slow: Core Web Vitals Explained Without the Jargon',
  excerpt:
    'Google measures three specific things about your website’s speed, and they directly affect both rankings and revenue. Here is what each one means, why sites fail them, and what to fix first.',
  metaTitle: 'Core Web Vitals Explained for Business Owners (2026) | Manhar Creatives',
  metaDescription:
    'What Core Web Vitals are, why your website is slow, and how LCP, INP and CLS affect Google rankings and conversions. A non-technical guide with a prioritised fix list.',
  date: '2026-06-23',
  dateLabel: 'June 23, 2026',
  updated: '2026-06-23',
  readTime: '9 min read',
  category: 'Website Performance',
  tags: ['Website Performance', 'SEO', 'Core Web Vitals'],
  image: '/images/blog/core-web-vitals-guide.webp',
  imageAlt: 'Core Web Vitals explained: website speed guide by Manhar Creatives',
  keywords: [
    'core web vitals',
    'website speed optimization',
    'why is my website slow',
    'largest contentful paint',
    'cumulative layout shift',
    'interaction to next paint',
    'pagespeed insights',
    'improve website loading speed',
    'website performance optimization india',
  ],
  featured: false,
  related: ['website-development-cost-india', 'how-to-choose-web-development-company', 'google-business-profile-optimization-checklist'],
  faqs: [
    {
      q: 'What are Core Web Vitals?',
      a: 'Core Web Vitals are three metrics Google uses to measure real user experience: Largest Contentful Paint (loading speed), Interaction to Next Paint (responsiveness) and Cumulative Layout Shift (visual stability). They are part of Google’s ranking signals.',
    },
    {
      q: 'Do Core Web Vitals affect Google rankings?',
      a: 'Yes, they are a confirmed ranking signal, though a relatively light one compared to content relevance. Their bigger impact is on user behaviour: slow pages get abandoned, which raises bounce rate and lowers conversions.',
    },
    {
      q: 'What is a good LCP score?',
      a: 'Under 2.5 seconds is good, 2.5–4 seconds needs improvement, and above 4 seconds is poor. Measure on mobile, since that is how most visitors and Google evaluate your site.',
    },
    {
      q: 'What is the most common cause of a slow website?',
      a: 'Unoptimised images are the single most common cause, followed by too many third-party scripts and heavy page-builder or plugin code. Images alone often account for the majority of a page’s total weight.',
    },
  ],
  content: [
    { type: 'p', text: 'Google publishes exactly what it measures about your website’s speed. It is three numbers. Most business owners have never seen them, and most websites fail at least one, usually badly, and usually on mobile.' },
    { type: 'p', text: 'This matters for two separate reasons. Speed is a Google ranking signal, so it affects visibility. More importantly, slow pages get abandoned before they load, so it affects revenue directly. This guide explains what the three metrics mean in plain language and what to fix in what order.' },

    { type: 'h2', text: 'The three numbers Google measures' },
    {
      type: 'table',
      head: ['Metric', 'What it measures', 'Good', 'Poor'],
      rows: [
        ['LCP (Largest Contentful Paint)', 'How long until the main content appears', 'Under 2.5s', 'Over 4s'],
        ['INP (Interaction to Next Paint)', 'How quickly the page responds to taps and clicks', 'Under 200ms', 'Over 500ms'],
        ['CLS (Cumulative Layout Shift)', 'How much the page jumps around while loading', 'Under 0.1', 'Over 0.25'],
      ],
    },
    { type: 'p', text: 'You can check all three for free at <strong>pagespeed.web.dev</strong>. Enter your URL and read the mobile score, not the desktop one: mobile is what the majority of your visitors experience and what Google weights.' },

    { type: 'h2', text: 'LCP: the "is anything happening?" number' },
    { type: 'p', text: 'Largest Contentful Paint measures how long it takes for the biggest visible element (usually your hero image or main headline) to render. It is the closest technical proxy for the human question: <em>has this page loaded yet?</em>' },
    { type: 'p', text: 'The main causes of poor LCP, in order of how often they are responsible:' },
    {
      type: 'ul',
      items: [
        '<strong>Enormous hero images.</strong> A 4 MB photo straight from a phone camera, displayed at 800 pixels wide. This is the single most common cause of slow websites.',
        '<strong>Slow hosting.</strong> Cheap shared hosting with a slow server response time delays everything that follows.',
        '<strong>Render-blocking resources.</strong> Fonts, CSS and scripts loaded in a way that forces the browser to wait before it can draw anything.',
        '<strong>No caching or CDN.</strong> Every visitor downloads everything from scratch, from a single server location.',
      ],
    },
    {
      type: 'callout',
      title: 'The 80% fix',
      text: 'Compress and correctly size your images, serve them as WebP, and add width and height attributes. For most business websites this alone moves LCP from poor into the acceptable range.',
    },

    { type: 'h2', text: 'INP: the "why is nothing happening?" number' },
    { type: 'p', text: 'Interaction to Next Paint measures the delay between a user tapping something and the page visually responding. It replaced the older First Input Delay metric in 2024 because it measures the whole interaction, not just the first one.' },
    { type: 'p', text: 'High INP is what makes a page feel broken. The user taps a menu, nothing happens, they tap again, then the menu opens and closes. Usually the cause is heavy JavaScript occupying the browser’s main thread: too many plugins, chat widgets, tracking pixels, or a page builder generating far more code than the page needs.' },
    { type: 'p', text: 'The fix is subtraction. Audit every third-party script and remove the ones nobody uses. Most business websites carry two or three tracking or widget scripts installed for a campaign that ended two years ago.' },

    { type: 'h2', text: 'CLS: the "why did the page move?" number' },
    { type: 'p', text: 'Cumulative Layout Shift measures visual instability: content jumping around as the page loads. Everyone has experienced it: you go to tap a link, an image finishes loading above it, the page shifts, and you tap an advertisement instead.' },
    { type: 'p', text: 'CLS is the easiest of the three to fix and the most frequently ignored. The causes are consistent:' },
    {
      type: 'ul',
      items: [
        'Images without width and height attributes, so the browser cannot reserve space',
        'Web fonts that swap in after loading and reflow all the text',
        'Banners, cookie notices or advertisements injected above existing content',
        'Content inserted dynamically without a reserved placeholder',
      ],
    },
    { type: 'p', text: 'Setting explicit dimensions on every image and reserving space for anything that loads late resolves the overwhelming majority of CLS problems.' },

    { type: 'h2', text: 'Why this affects money, not just rankings' },
    { type: 'p', text: 'The SEO argument for performance is real but modest: Core Web Vitals are one signal among many, and excellent content on a slow page still outranks thin content on a fast one.' },
    { type: 'p', text: 'The behavioural argument is much stronger. Bounce rate rises steeply with each additional second of load time, and the effect compounds on mobile connections. In India, where a large share of traffic arrives on mid-range Android devices over variable 4G, the gap between a 2-second and a 6-second page is the difference between an enquiry and a lost visitor.' },
    { type: 'p', text: 'And critically, you never see the loss. Nobody emails to say your website was too slow. They simply go to a competitor, and your analytics records it as a bounce.' },

    { type: 'h2', text: 'What to fix, in priority order' },
    {
      type: 'ol',
      items: [
        '<strong>Compress and resize every image.</strong> Convert to WebP, size them to their actual display dimensions, and never upload a raw camera file. Typically the biggest single win available.',
        '<strong>Add width and height to every image.</strong> Fixes most CLS in one pass, costs almost nothing.',
        '<strong>Lazy-load below-the-fold images.</strong> Only load what the visitor can actually see.',
        '<strong>Remove unused scripts and plugins.</strong> Every third-party tag costs time on every page view, forever.',
        '<strong>Enable caching and a CDN.</strong> Cloudflare’s free tier is enough for most business websites.',
        '<strong>Self-host or preload fonts.</strong> Prevents both render blocking and font-swap layout shift.',
        '<strong>Upgrade hosting if server response is slow.</strong> If time to first byte is above roughly 600 ms, no amount of front-end work will save you.',
        '<strong>Reconsider heavy page builders.</strong> Some generate several times the code a hand-built page needs.',
      ],
    },

    { type: 'h2', text: 'How to measure properly' },
    { type: 'p', text: 'Two tools, used for different purposes:' },
    {
      type: 'ul',
      items: [
        '<strong>PageSpeed Insights:</strong> a lab test plus real-user field data if your site has enough traffic. Use it for diagnosing specific issues.',
        '<strong>Google Search Console → Core Web Vitals report:</strong> real data from actual visitors, grouped by page type. Use it to decide what to prioritise, because it reflects reality rather than a simulated test.',
      ],
    },
    { type: 'p', text: 'Field data always beats lab data. A page can score 95 in a lab test and still fail for real users on slower devices and connections.' },
    {
      type: 'callout',
      title: 'Do not chase 100',
      text: 'A mobile score in the 85–95 range with all three Core Web Vitals passing is an excellent, commercially sufficient outcome. The effort required to reach 100 is usually better spent on content, conversion or the offer itself.',
    },

    { type: 'h2', text: 'When speed is not your real problem' },
    { type: 'p', text: 'Be honest about diagnosis. If your website loads in two seconds and still generates no enquiries, performance is not the constraint. The constraint is more likely one of these:' },
    {
      type: 'ul',
      items: [
        'Nobody is finding the site at all: a visibility and SEO problem',
        'Visitors arrive but cannot immediately tell what you do: a messaging problem',
        'They understand the offer but are not convinced: a trust and proof problem',
        'They are convinced but the next step is unclear: a conversion design problem',
      ],
    },
    { type: 'p', text: 'Speed removes friction. It does not create demand. Fix it because it is measurable, cheap and compounding, but fix the message first if the message is what is broken.' },

    {
      type: 'cta',
      title: 'Want to know what is actually slowing your site down?',
      text: 'We audit performance, structure and conversion together, and tell you which one is genuinely costing you enquiries.',
      label: 'Request a Website Audit',
      href: '/contact',
    },
  ],
};
