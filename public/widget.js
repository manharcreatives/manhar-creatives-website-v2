(function () {
  'use strict';

  const BRAND = {
    primary: '#22C55E', primaryDark: '#16A34A', accent: '#4ADE80',
    primaryRgb: '34,197,94', bg: '#0B0F0E', bgSecondary: '#111827',
    bgGlass: 'rgba(11,15,14,0.6)', textPrimary: '#FFFFFF',
    textSecondary: '#9CA3AF', textMuted: '#6B7280',
    borderSubtle: 'rgba(255,255,255,0.06)', borderLight: 'rgba(255,255,255,0.1)',
    borderGlow: 'rgba(34,197,94,0.3)', radiusLg: '20px',
    easeOutExpo: 'cubic-bezier(0.16, 1, 0.3, 1)',
  };

  const BOT_IMG = '/images/manhar-bot.webp';

  const CLOSE_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
  const SEND_SVG = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>';

  // ─── State ───
  let chatOpen = false;
  let botVisible = false;
  let currentSectionIdx = -1;
  let selectedLanguage = 'en';
  let isDismissing = false;

  /* Anchor points the floating bot hops between. Homepage has the section
     ids; inner pages fall back to the last entry so the bot is always
     reachable no matter which route the visitor landed on. */
  const sections = [
    { id: '#services', pos: { right: '30px', bottom: '40%' } },
    { id: '#process',  pos: { left: '30px', top: '40%' } },
    { id: '#projects', pos: { right: '30px', bottom: '35%' } },
    { id: '#contact',  pos: { bottom: '100px', right: '90px' } },
    { id: 'body',      pos: { bottom: '100px', right: '90px' } },
  ];

  /* ═══════════════════════════════════════════════════════════
     KNOWLEDGE BASE — every fact the bot is allowed to state.
     Nothing here is generated; if it is not in this object the
     bot hands the visitor to a human instead of inventing an
     answer. That is the whole point of running rule-based.
     ═══════════════════════════════════════════════════════════ */
  const BIZ = {
    name: 'Manhar Creatives',
    site: 'https://www.manharcreatives.com',
    contact: 'https://www.manharcreatives.com/contact',
    phone: '+919714571522',
    phonePretty: '+91 97145 71522',
    email: 'info@manharcreatives.com',
    wa: 'https://wa.me/919714571522',
    instagram: 'https://instagram.com/manhar.creatives',
    city: 'Visnagar',
    district: 'Mehsana',
    state: 'Gujarat',
    hours: 'Mon–Sat, 9:30am – 7:00pm IST',
    founded: '2022',
  };

  const SERVICES = [
    {
      id: 'web-dev',
      slug: 'website-development',
      terms: ['website', 'websites', 'web', 'webpage', 'web site', 'website design', 'web design',
        'web development', 'webdev', 'landing page', 'ecommerce', 'e commerce', 'online store',
        'shop website', 'business website', 'company website', 'portfolio website', 'wordpress',
        'site banana', 'website banana', 'website chahiye', 'website joiye'],
      name: { en: 'Website Development', hi: 'Website Development', gu: 'Website Development' },
      blurb: {
        en: 'Custom business, corporate, portfolio and landing-page websites — built mobile-first, tuned for speed, with on-page SEO and analytics handed over at launch.',
        hi: 'Custom business, corporate, portfolio aur landing-page websites — mobile-first build, speed tuning, on-page SEO aur analytics ke saath handover.',
        gu: 'Custom business, corporate, portfolio ane landing-page websites — mobile-first build, speed tuning, on-page SEO ane analytics sathe handover.',
      },
    },
    {
      id: 'custom-software',
      slug: 'custom-software-development',
      terms: ['software', 'custom software', 'crm', 'erp', 'automation', 'automate', 'dashboard',
        'admin panel', 'inventory', 'billing', 'invoicing', 'internal tool', 'portal',
        'management system', 'app', 'web app', 'application', 'api', 'integration',
        'excel se', 'manual work', 'staff management', 'order management'],
      name: { en: 'Custom Software & CRM', hi: 'Custom Software & CRM', gu: 'Custom Software & CRM' },
      blurb: {
        en: 'Software shaped around how your business already runs — custom CRM, inventory, billing, admin dashboards, integrations and automation that removes repeat manual work.',
        hi: 'Aapke business ke actual workflow ke hisaab se software — custom CRM, inventory, billing, admin dashboards, integrations aur automation jo manual kaam hataata hai.',
        gu: 'Tamara business na actual workflow pramane software — custom CRM, inventory, billing, admin dashboards, integrations ane automation je manual kaam hatave chhe.',
      },
    },
    {
      id: 'branding',
      slug: 'branding-identity',
      terms: ['brand', 'branding', 'logo', 'identity', 'brand identity', 'logo design',
        'brand guidelines', 'rebrand', 'visual identity', 'colour palette', 'color palette',
        'typography', 'brand book', 'logo banana', 'logo joiye'],
      name: { en: 'Branding & Identity', hi: 'Branding & Identity', gu: 'Branding & Identity' },
      blurb: {
        en: 'Logo design with full variations, colour and typography systems, and a written brand guideline document so everything you publish stays consistent.',
        hi: 'Logo design with variations, colour aur typography system, aur written brand guidelines — taaki har jagah brand consistent rahe.',
        gu: 'Logo design with variations, colour ane typography system, ane written brand guidelines — jethi darek jagya brand consistent rahe.',
      },
    },
    {
      id: 'social',
      slug: 'social-media-design',
      terms: ['social', 'social media', 'instagram', 'insta', 'facebook', 'fb', 'post design',
        'posts', 'reel', 'reels', 'story', 'creatives', 'campaign', 'content design',
        'festival post', 'linkedin'],
      name: { en: 'Social Media Design', hi: 'Social Media Design', gu: 'Social Media Design' },
      blurb: {
        en: 'A social brand kit plus editable post templates, campaign sets, profile and highlight design, and festival creatives that do not look like stock templates.',
        hi: 'Social brand kit ke saath editable post templates, campaign sets, profile aur highlight design, aur festival creatives — generic template look ke bina.',
        gu: 'Social brand kit sathe editable post templates, campaign sets, profile ane highlight design, ane festival creatives — generic template look vagar.',
      },
    },
    {
      id: 'print',
      slug: 'print-branding',
      terms: ['print', 'printing', 'business card', 'visiting card', 'brochure', 'catalogue',
        'catalog', 'flyer', 'pamphlet', 'signage', 'hoarding', 'banner', 'packaging',
        'label', 'letterhead', 'stationery', 'standee'],
      name: { en: 'Print & Offline Branding', hi: 'Print & Offline Branding', gu: 'Print & Offline Branding' },
      blurb: {
        en: 'Visiting cards, letterheads, brochures, catalogues, flyers, standees, signage and packaging — prepared print-ready at the correct scale and resolution.',
        hi: 'Visiting cards, letterheads, brochures, catalogues, flyers, standees, signage aur packaging — print-ready, sahi scale aur resolution par.',
        gu: 'Visiting cards, letterheads, brochures, catalogues, flyers, standees, signage ane packaging — print-ready, sacha scale ane resolution par.',
      },
    },
    {
      id: 'digital-presence',
      slug: 'digital-presence',
      terms: ['digital presence', 'google business', 'google business profile', 'gmb',
        'google my business', 'google maps', 'maps listing', 'business email', 'whatsapp business',
        'online presence', 'local seo', 'seo', 'ranking', 'google par', 'google pe',
        'search me', 'near me'],
      name: { en: 'Digital Presence Setup', hi: 'Digital Presence Setup', gu: 'Digital Presence Setup' },
      blurb: {
        en: 'Google Business Profile setup and optimisation, Maps listing, business email, WhatsApp Business and the local-SEO groundwork that makes you findable nearby.',
        hi: 'Google Business Profile setup aur optimisation, Maps listing, business email, WhatsApp Business aur local-SEO groundwork — taaki aas-paas ke log aapko dhundh sakein.',
        gu: 'Google Business Profile setup ane optimisation, Maps listing, business email, WhatsApp Business ane local-SEO groundwork — jethi aaspas na loko tamne shodhi shake.',
      },
    },
  ];

  const CITY_TERMS = ['ahmedabad', 'amdavad', 'mehsana', 'mahesana', 'visnagar', 'gujarat',
    'gandhinagar', 'surat', 'vadodara', 'baroda', 'rajkot', 'india'];

  /* ─── Language plumbing ───────────────────────────────
     The picker hands back long codes; everything internal
     speaks en/hi/gu. Map once, here, so nothing downstream
     has to care which one it was given. */
  const LANG_MAP = { english: 'en', hindi: 'hi', gujarati: 'gu', en: 'en', hi: 'hi', gu: 'gu' };
  function setLang(code) { selectedLanguage = LANG_MAP[code] || 'en'; }
  function L(obj) {
    if (typeof obj === 'string') return obj;
    return obj[selectedLanguage] || obj.en;
  }

  /* ═══════════════════════════════════════════════════════════
     NLU — normalise, expand, score.
     ═══════════════════════════════════════════════════════════ */

  /* Hinglish / Gujlish / shorthand folded onto canonical English so a
     single keyword list serves all three languages. */
  const SYNONYMS = {
    kitna: 'cost', kitne: 'cost', ketlu: 'cost', ketla: 'cost', kimat: 'cost',
    keemat: 'cost', paisa: 'cost', paise: 'cost', rupaye: 'cost', rupiya: 'cost',
    charge: 'cost', charges: 'cost', fees: 'cost', fee: 'cost', budget: 'cost',
    price: 'cost', pricing: 'cost', quotation: 'quote', estimate: 'quote',
    kab: 'timeline', samay: 'timeline', time: 'timeline', vaar: 'timeline',
    duration: 'timeline', deadline: 'timeline', delivery: 'timeline',
    kaise: 'how', kem: 'how', kevi: 'how', shu: 'what', kya: 'what', su: 'what',
    kaha: 'where', kahan: 'where', kyaa: 'what',
    banao: 'build', banana: 'build', banavu: 'build', chahiye: 'want',
    joiye: 'want', jarur: 'want', karvu: 'want', karna: 'want',
    madad: 'help', sahayata: 'help',
    bharosa: 'trust', vishwas: 'trust',
    number: 'phone', mobile: 'phone', fon: 'phone', sampark: 'contact',
    wesbite: 'website', websit: 'website', webiste: 'website', wbsite: 'website',
    brnding: 'branding', desing: 'design', desgin: 'design',
    servises: 'services', servics: 'services', servis: 'services',
  };

  function normalize(s) {
    return String(s || '')
      .toLowerCase()
      .replace(/[‘’]/g, "'")
      .replace(/[^\w\sऀ-ॿ઀-૿]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /* Collapse runs of the same letter: "helloooo" → "hello", "websiteee" → "website" */
  function deflate(word) {
    return word.replace(/(.)\1{2,}/g, '$1$1');
  }

  /* Bounded Levenshtein — bails out as soon as it exceeds `max`.
     Only used on words long enough that a typo is plausible. */
  function within(a, b, max) {
    if (a === b) return true;
    const la = a.length, lb = b.length;
    if (Math.abs(la - lb) > max) return false;
    let prev = new Array(lb + 1);
    for (let j = 0; j <= lb; j++) prev[j] = j;
    for (let i = 1; i <= la; i++) {
      const cur = [i];
      let best = i;
      for (let j = 1; j <= lb; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
        if (cur[j] < best) best = cur[j];
      }
      if (best > max) return false;
      prev = cur;
    }
    return prev[lb] <= max;
  }

  function tokenize(raw) {
    const words = normalize(raw).split(' ').filter(Boolean).map(deflate);
    const expanded = [];
    words.forEach((w) => {
      expanded.push(w);
      if (SYNONYMS[w] && SYNONYMS[w] !== w) expanded.push(SYNONYMS[w]);
    });
    return expanded;
  }

  /* Does the message contain this term? Multi-word terms are matched against
     the raw normalised string; single words get typo tolerance. */
  function hasTerm(text, toks, term) {
    if (term.indexOf(' ') !== -1) return text.indexOf(term) !== -1;
    /* Typo tolerance scaled to word length. Kept deliberately tight —
       at 2 edits on a 7-letter word, "content" starts matching "contact". */
    const tol = term.length >= 9 ? 2 : term.length >= 6 ? 1 : 0;
    for (let i = 0; i < toks.length; i++) {
      if (toks[i] === term) return true;
      if (tol && within(toks[i], term, tol)) return true;
    }
    return false;
  }

  function countTerms(text, toks, terms) {
    let hits = 0;
    for (let i = 0; i < terms.length; i++) if (hasTerm(text, toks, terms[i])) hits++;
    return hits;
  }

  /* ─── Conversation memory ─────────────────────────────
     Enough context that "and how much?" after a service
     question resolves to that service's pricing. */
  const ctx = { lastIntent: null, service: null, city: null, turns: 0 };

  function detectService(text, toks) {
    let best = null, bestScore = 0;
    SERVICES.forEach((svc) => {
      const score = countTerms(text, toks, svc.terms);
      if (score > bestScore) { bestScore = score; best = svc; }
    });
    return bestScore > 0 ? best : null;
  }

  function detectCity(text, toks) {
    for (let i = 0; i < CITY_TERMS.length; i++) {
      if (hasTerm(text, toks, CITY_TERMS[i])) return CITY_TERMS[i];
    }
    return null;
  }

  /* ─── Shared reply fragments ──────────────────────────── */
  const CTA = {
    en: `Tell me a bit about the project and I'll pass it straight to the team — or reach us directly: ${BIZ.contact}`,
    hi: `Project ke baare mein thoda batayiye, main seedha team tak pahuncha dunga — ya direct: ${BIZ.contact}`,
    gu: `Project vishe thodu kaho, hu sidhu team sudhi pahochadi daish — athva direct: ${BIZ.contact}`,
  };

  const CHIPS = {
    services: { en: 'What do you build?', hi: 'Aap kya banate ho?', gu: 'Tame su banavo chho?' },
    pricing: { en: 'What does it cost?', hi: 'Kitna cost hoga?', gu: 'Ketlo kharch thashe?' },
    timeline: { en: 'How long does it take?', hi: 'Kitna time lagega?', gu: 'Ketlo time lagshe?' },
    process: { en: 'How do you work?', hi: 'Aap kaise kaam karte ho?', gu: 'Tame kevi rite kaam karo chho?' },
    work: { en: 'Show me your work', hi: 'Apna kaam dikhaiye', gu: 'Tamaru kaam batavo' },
    start: { en: 'I want to start a project', hi: 'Mujhe project shuru karna hai', gu: 'Mare project shuru karvo chhe' },
    human: { en: 'Talk to a human', hi: 'Kisi se baat karni hai', gu: 'Koi sathe vaat karvi chhe' },
    location: { en: 'Where are you based?', hi: 'Aap kahan se ho?', gu: 'Tame kya thi chho?' },
    support: { en: 'Do you support after launch?', hi: 'Launch ke baad support?', gu: 'Launch pachhi support?' },
  };

  function chipSet(keys) { return keys.map((k) => L(CHIPS[k])); }

  /* ═══════════════════════════════════════════════════════════
     INTENTS
     Each intent scores itself against the message. Highest score
     wins; ties surface a clarifying question instead of guessing.
     ═══════════════════════════════════════════════════════════ */
  const INTENTS = [
    {
      id: 'greeting',
      strong: [/^(hi+|hey+|hello+|hlo+|helo+|yo+|namaste|namaskar|kem chho|kem cho|salam|good\s*(morning|afternoon|evening|day))\b/],
      terms: [],
      answer: () => ({
        text: {
          en: `Hi! 👋 I'm the Manhar Creatives assistant. I can tell you what we build, how the process runs, what it costs, and put you in front of the team when you're ready.\n\nWhat brings you here?`,
          hi: `Namaste! 👋 Main Manhar Creatives ka assistant hoon. Main bata sakta hoon ki hum kya banate hain, process kaise chalta hai, cost kitni hoti hai — aur ready hone par team se connect kara dunga.\n\nAap kis cheez ke liye aaye hain?`,
          gu: `Namaste! 👋 Hu Manhar Creatives no assistant chhu. Hu kahi shaku ke ame su banaviye chhie, process kevi rite chale chhe, kharch ketlo thay — ane taiyar hoy tyare team sathe jodi daish.\n\nTame sha mate aavya chho?`,
        },
        chips: chipSet(['services', 'pricing', 'work', 'start']),
      }),
    },

    {
      id: 'services',
      terms: ['services', 'service', 'offer', 'offerings', 'provide', 'solutions', 'do you do',
        'what do you do', 'capabilities', 'kaam', 'kam', 'work you do', 'sab kuch'],
      answer: () => ({
        text: {
          en: `We run six services:\n\n${SERVICES.map((s, i) => `${i + 1}. **${s.name.en}**`).join('\n')}\n\nWhich one is closest to what you need? I'll go into detail on that one.`,
          hi: `Hum chhah services chalate hain:\n\n${SERVICES.map((s, i) => `${i + 1}. **${s.name.hi}**`).join('\n')}\n\nAapki zaroorat kis se sabse close hai? Us par detail mein bataunga.`,
          gu: `Ame chha services chalaviye chhie:\n\n${SERVICES.map((s, i) => `${i + 1}. **${s.name.gu}**`).join('\n')}\n\nTamari jarurat kone sauthi najik chhe? Ena par detail ma kahish.`,
        },
        chips: [SERVICES[0].name.en, SERVICES[1].name.en, SERVICES[2].name.en, L(CHIPS.pricing)],
      }),
    },

    {
      id: 'service_detail',
      /* Scored dynamically — see scoreMessage(); fires when a specific
         service is named without another intent outranking it. */
      terms: [],
      answer: (state) => {
        const svc = state.service || SERVICES[0];
        return {
          text: {
            en: `**${svc.name.en}**\n\n${svc.blurb.en}\n\nFull breakdown — scope, deliverables and FAQs: ${BIZ.site}/services/${svc.slug}\n\nWant a quote for this?`,
            hi: `**${svc.name.hi}**\n\n${svc.blurb.hi}\n\nPoori detail — scope, deliverables aur FAQs: ${BIZ.site}/services/${svc.slug}\n\nIska quote chahiye?`,
            gu: `**${svc.name.gu}**\n\n${svc.blurb.gu}\n\nPuri detail — scope, deliverables ane FAQs: ${BIZ.site}/services/${svc.slug}\n\nEnu quote joiye chhe?`,
          },
          chips: chipSet(['pricing', 'timeline', 'work', 'start']),
        };
      },
    },

    {
      id: 'pricing',
      terms: ['cost', 'quote', 'how much', 'expensive', 'cheap', 'affordable', 'package',
        'packages', 'plan', 'plans', 'discount', 'payment', 'advance', 'installment'],
      answer: (state) => {
        const svc = state.service;
        const forSvc = svc ? ` for ${svc.name.en}` : '';
        return {
          text: {
            en: `Every project is quoted individually — there are no fixed packages, because a five-page site and a custom CRM are not the same job.\n\nWhat the quote depends on${forSvc}: the number of screens or modules, whether content and images exist already, integrations needed, and how fast you need it live.\n\nShare the scope and you'll have a written quote with a fixed price and timeline within 24 hours: ${BIZ.contact}`,
            hi: `Har project ka quote alag hota hai — fixed packages nahi hain, kyunki paanch-page ki site aur custom CRM ek jaisa kaam nahi hai.\n\nQuote kis par depend karta hai${svc ? ` (${svc.name.hi})` : ''}: kitne screens ya modules, content aur images ready hain ya nahi, kaunse integrations chahiye, aur kitni jaldi live karna hai.\n\nScope batayiye — 24 ghante mein fixed price aur timeline ke saath likhit quote milega: ${BIZ.contact}`,
            gu: `Darek project nu quote alag hoy chhe — fixed packages nathi, kemke paanch-page ni site ane custom CRM ek sarkhu kaam nathi.\n\nQuote sha par aadharit chhe${svc ? ` (${svc.name.gu})` : ''}: ketla screens ke modules, content ane images taiyar chhe ke nahi, kaya integrations joiye, ane ketli jaldi live karvu chhe.\n\nScope kaho — 24 kalak ma fixed price ane timeline sathe lekhit quote malshe: ${BIZ.contact}`,
          },
          chips: chipSet(['start', 'timeline', 'process', 'human']),
        };
      },
    },

    {
      id: 'timeline',
      terms: ['timeline', 'how long', 'how many days', 'how many weeks', 'when ready',
        'turnaround', 'fast', 'urgent', 'quick', 'jaldi',
        /* Hinglish/Gujlish phrasings — multi-word so they outweigh the bare
           "kitna" that would otherwise read as a price question. */
        'kitna time', 'kitne din', 'kitna samay', 'ketlo time', 'ketla divas',
        'kitne days', 'how much time'],
      answer: () => ({
        text: {
          en: `Typical timelines once content is ready:\n\n- Landing page — **5–7 days**\n- Business website — **2–3 weeks**\n- Brand identity — **2–3 weeks**\n- Custom software / CRM — **4–10 weeks**, depending on modules\n- Social or print set — **3–6 days**\n\nThe usual delay is not the build, it's waiting on content. We tell you exactly what we need from you on day one.`,
          hi: `Content ready hone ke baad typical timelines:\n\n- Landing page — **5–7 din**\n- Business website — **2–3 hafte**\n- Brand identity — **2–3 hafte**\n- Custom software / CRM — **4–10 hafte**, modules par depend\n- Social ya print set — **3–6 din**\n\nDeri build mein nahi, content ka wait karne mein hoti hai. Pehle din hi bata dete hain ki aapse kya chahiye.`,
          gu: `Content taiyar thaya pachhi typical timelines:\n\n- Landing page — **5–7 divas**\n- Business website — **2–3 athvadiya**\n- Brand identity — **2–3 athvadiya**\n- Custom software / CRM — **4–10 athvadiya**, modules par aadhar\n- Social ke print set — **3–6 divas**\n\nModu build ma nahi, content ni raah jova ma thay chhe. Pehla divase j kahi daiye ke tamara thi su joiye.`,
        },
        chips: chipSet(['pricing', 'process', 'start']),
      }),
    },

    {
      id: 'process',
      terms: ['process', 'workflow', 'steps', 'how do you work', 'methodology', 'stages',
        'how it works', 'procedure'],
      answer: () => ({
        text: {
          en: `Six stages, same every time:\n\n1. **Discovery** — what the business does, who it serves, what success means\n2. **Research** — competitors, search demand, positioning gaps\n3. **Planning** — scope locked, structure mapped, timeline agreed\n4. **Design & Development** — built against that plan, with performance and SEO engineered in\n5. **Review** — tested across real devices and slower connections, not just the ideal case\n6. **Delivery & Support** — full handover, access, training walkthrough, post-launch support\n\nWalkthrough of each stage: ${BIZ.site}/process`,
          hi: `Chhah stages, har baar same:\n\n1. **Discovery** — business kya karta hai, kiske liye, success ka matlab kya\n2. **Research** — competitors, search demand, positioning gaps\n3. **Planning** — scope lock, structure map, timeline final\n4. **Design & Development** — usi plan par build, performance aur SEO andar se\n5. **Review** — real devices aur slow connections par test, sirf ideal case par nahi\n6. **Delivery & Support** — poora handover, access, training walkthrough, launch ke baad support\n\nHar stage ka walkthrough: ${BIZ.site}/process`,
          gu: `Chha stages, darek vakhat same:\n\n1. **Discovery** — business su kare chhe, kona mate, success no matlab su\n2. **Research** — competitors, search demand, positioning gaps\n3. **Planning** — scope lock, structure map, timeline final\n4. **Design & Development** — e j plan par build, performance ane SEO andar thi\n5. **Review** — real devices ane dhima connections par test, fakt ideal case par nahi\n6. **Delivery & Support** — puru handover, access, training walkthrough, launch pachhi support\n\nDarek stage no walkthrough: ${BIZ.site}/process`,
        },
        chips: chipSet(['timeline', 'pricing', 'start']),
      }),
    },

    {
      id: 'portfolio',
      terms: ['portfolio', 'projects', 'work', 'examples', 'case study', 'case studies',
        'samples', 'show me', 'previous work', 'past work', 'clients you worked'],
      answer: () => ({
        text: {
          en: `A few live ones:\n\n- **InfoTech Placement** — international career-consulting site: https://www.infotechplacement.com\n- **Averexa Placement** — US/Canada placement consultancy: https://www.averexaplacement.com\n- **Macron Industries** — industrial capability site: https://www.macronindustries.com\n- **Restaurant QR Menu System** — branded digital menu built for weak connections\n\nAll of them with scope and outcome: ${BIZ.site}/projects`,
          hi: `Kuch live projects:\n\n- **InfoTech Placement** — international career-consulting site: https://www.infotechplacement.com\n- **Averexa Placement** — US/Canada placement consultancy: https://www.averexaplacement.com\n- **Macron Industries** — industrial capability site: https://www.macronindustries.com\n- **Restaurant QR Menu System** — weak connection ke liye bana branded digital menu\n\nScope aur outcome ke saath sab: ${BIZ.site}/projects`,
          gu: `Ketlak live projects:\n\n- **InfoTech Placement** — international career-consulting site: https://www.infotechplacement.com\n- **Averexa Placement** — US/Canada placement consultancy: https://www.averexaplacement.com\n- **Macron Industries** — industrial capability site: https://www.macronindustries.com\n- **Restaurant QR Menu System** — nabla connection mate banelu branded digital menu\n\nScope ane outcome sathe badha: ${BIZ.site}/projects`,
        },
        chips: chipSet(['services', 'pricing', 'start']),
      }),
    },

    {
      id: 'location',
      terms: ['location', 'located', 'where', 'based', 'address', 'office', 'city',
        'area served', 'serve', 'remote', 'abroad', 'international', 'usa', 'uk', 'canada',
        'australia', 'uae', 'dubai', 'europe', 'near me', 'nearby'],
      answer: (state) => {
        const c = state.city;
        const known = c && ['ahmedabad', 'amdavad', 'mehsana', 'mahesana', 'visnagar'].indexOf(c) !== -1;
        const cityName = c === 'amdavad' ? 'ahmedabad' : c === 'mahesana' ? 'mehsana' : c;
        const localLine = known
          ? `\n\nWe work with businesses in ${cityName.charAt(0).toUpperCase() + cityName.slice(1)} regularly — details here: ${BIZ.site}/${cityName}`
          : '';
        return {
          text: {
            en: `We're based in ${BIZ.city}, ${BIZ.district} district, ${BIZ.state}, India 🇮🇳 — and we work with clients across Ahmedabad, Mehsana, Gandhinagar and the rest of Gujarat, plus remote clients in the US, UK, Canada, Australia, UAE and Europe.${localLine}\n\nMost of the work runs remotely; on-site visits happen within Gujarat when a project needs it.`,
            hi: `Hum ${BIZ.city}, ${BIZ.district} district, ${BIZ.state}, India 🇮🇳 mein based hain — aur Ahmedabad, Mehsana, Gandhinagar aur poore Gujarat ke clients ke saath kaam karte hain, saath hi US, UK, Canada, Australia, UAE aur Europe ke remote clients.${localLine}\n\nZyada kaam remote chalta hai; Gujarat ke andar zaroorat par on-site visit bhi karte hain.`,
            gu: `Ame ${BIZ.city}, ${BIZ.district} jilla, ${BIZ.state}, India 🇮🇳 ma chhie — ane Ahmedabad, Mehsana, Gandhinagar ane aakha Gujarat na clients sathe kaam kariye chhie, sathe US, UK, Canada, Australia, UAE ane Europe na remote clients pan.${localLine}\n\nMotu bhag nu kaam remote chale chhe; Gujarat ma jarur pade tyare on-site visit pan kariye chhie.`,
          },
          chips: chipSet(['services', 'work', 'human']),
        };
      },
    },

    {
      id: 'contact',
      terms: ['contact', 'phone', 'call', 'email', 'whatsapp', 'reach', 'number',
        'talk to someone', 'human', 'person', 'agent', 'speak', 'meeting', 'appointment',
        'hours', 'timing', 'open', 'available'],
      answer: () => ({
        text: {
          en: `Direct lines:\n\n📞 ${BIZ.phonePretty}\n💬 WhatsApp: ${BIZ.wa}\n✉️ ${BIZ.email}\n🌐 ${BIZ.contact}\n\nWe're around ${BIZ.hours}. Messages outside those hours get answered the next working morning.`,
          hi: `Direct contact:\n\n📞 ${BIZ.phonePretty}\n💬 WhatsApp: ${BIZ.wa}\n✉️ ${BIZ.email}\n🌐 ${BIZ.contact}\n\nHum ${BIZ.hours} available hain. Us ke baad ke messages agle working morning tak answer ho jaate hain.`,
          gu: `Direct contact:\n\n📞 ${BIZ.phonePretty}\n💬 WhatsApp: ${BIZ.wa}\n✉️ ${BIZ.email}\n🌐 ${BIZ.contact}\n\nAme ${BIZ.hours} available chhie. E pachhi na messages next working morning sudhi answer thai jay chhe.`,
        },
        chips: chipSet(['start', 'location', 'services']),
      }),
    },

    {
      id: 'support',
      terms: ['support', 'maintenance', 'maintain', 'after launch', 'aftercare', 'updates',
        'bug', 'fix', 'warranty', 'amc', 'ongoing'],
      answer: () => ({
        text: {
          en: `Yes. Every project ships with a handover walkthrough plus post-launch support, and we stay available for updates, fixes and future phases afterwards.\n\nYou own everything at the end — domain, hosting, source files, accounts. Nothing is held hostage.`,
          hi: `Haan. Har project ke saath handover walkthrough aur launch ke baad support milta hai, aur uske baad updates, fixes aur future phases ke liye hum available rehte hain.\n\nAnt mein sab kuch aapka hota hai — domain, hosting, source files, accounts. Kuch bhi rok kar nahi rakha jaata.`,
          gu: `Ha. Darek project sathe handover walkthrough ane launch pachhi support male chhe, ane tya pachhi updates, fixes ane future phases mate ame available rahiye chhie.\n\nChhelle badhu tamaru hoy chhe — domain, hosting, source files, accounts. Kai pan rokay ne rakhvama aavtu nathi.`,
        },
        chips: chipSet(['process', 'pricing', 'start']),
      }),
    },

    {
      id: 'trust',
      terms: ['trust', 'reliable', 'why you', 'why should', 'credible', 'reviews', 'rating',
        'testimonial', 'experience', 'how long in business', 'since when', 'founded',
        'established', 'team size', 'guarantee', 'refund'],
      answer: () => ({
        text: {
          en: `Fair question to ask.\n\nWe've been running since ${BIZ.founded}, and the work is public — the live sites in our portfolio are real client projects you can open and inspect right now, not mockups.\n\nHow we keep it low-risk for you: scope and price fixed in writing before work starts, staged reviews so you see progress rather than a reveal at the end, and full ownership handed over at delivery.`,
          hi: `Sahi sawaal hai.\n\nHum ${BIZ.founded} se kaam kar rahe hain, aur kaam public hai — portfolio ki live sites real client projects hain, aap abhi khol kar dekh sakte hain, mockups nahi.\n\nRisk kam kaise rakhte hain: kaam shuru hone se pehle scope aur price likhit mein fix, staged reviews taaki aapko progress dikhe — end mein surprise nahi, aur delivery par poori ownership aapko.`,
          gu: `Sacho sawal chhe.\n\nAme ${BIZ.founded} thi kaam kariye chhie, ane kaam public chhe — portfolio ni live sites real client projects chhe, tame atyare kholi ne joi shako, mockups nathi.\n\nRisk kevi rite ochho rakhiye: kaam shuru thaya pehla scope ane price lekhit ma fix, staged reviews jethi tamne progress dekhay — chhelle surprise nahi, ane delivery vakhate puri ownership tamne.`,
        },
        chips: chipSet(['work', 'process', 'start']),
      }),
    },

    {
      id: 'industries',
      terms: ['industries', 'industry', 'sector', 'what kind of business', 'who do you work with',
        'clients', 'niche', 'restaurant', 'cafe', 'hotel', 'clinic', 'doctor', 'hospital',
        'retail', 'shop', 'manufacturer', 'factory', 'school', 'real estate', 'startup'],
      answer: () => ({
        text: {
          en: `We work across restaurants and cafés, clinics and healthcare, retail and showrooms, manufacturing and industrial, education, real estate, professional services and early-stage startups.\n\nThe industry matters less than the problem — a clinic needing appointments and a factory needing enquiries are the same shape of job underneath.`,
          hi: `Hum restaurants aur cafés, clinics aur healthcare, retail aur showrooms, manufacturing aur industrial, education, real estate, professional services aur early-stage startups — sab ke saath kaam karte hain.\n\nIndustry se zyada problem matter karti hai — appointments chahiye wali clinic aur enquiries chahiye wali factory, andar se ek jaisa kaam hai.`,
          gu: `Ame restaurants ane cafés, clinics ane healthcare, retail ane showrooms, manufacturing ane industrial, education, real estate, professional services ane early-stage startups — badha sathe kaam kariye chhie.\n\nIndustry karta problem vadhu matter kare chhe — appointments joiti clinic ane enquiries joiti factory, andar thi ek sarkhu kaam chhe.`,
        },
        chips: chipSet(['work', 'services', 'start']),
      }),
    },

    {
      id: 'blog',
      terms: ['blog', 'article', 'guide', 'read', 'insights', 'resources', 'learn'],
      answer: () => ({
        text: {
          en: `We publish practical guides — no fluff:\n\n- Website development cost in India: ${BIZ.site}/blog/website-development-cost-india\n- Custom CRM vs ready-made CRM: ${BIZ.site}/blog/custom-crm-vs-readymade-crm\n- Google Business Profile checklist: ${BIZ.site}/blog/google-business-profile-optimization-checklist\n- How to choose a web development company: ${BIZ.site}/blog/how-to-choose-web-development-company\n\nAll of them: ${BIZ.site}/blog`,
          hi: `Hum practical guides publish karte hain — bina fluff ke:\n\n- India mein website development cost: ${BIZ.site}/blog/website-development-cost-india\n- Custom CRM vs ready-made CRM: ${BIZ.site}/blog/custom-crm-vs-readymade-crm\n- Google Business Profile checklist: ${BIZ.site}/blog/google-business-profile-optimization-checklist\n- Web development company kaise chunein: ${BIZ.site}/blog/how-to-choose-web-development-company\n\nSab yahan: ${BIZ.site}/blog`,
          gu: `Ame practical guides publish kariye chhie — fluff vagar:\n\n- India ma website development cost: ${BIZ.site}/blog/website-development-cost-india\n- Custom CRM vs ready-made CRM: ${BIZ.site}/blog/custom-crm-vs-readymade-crm\n- Google Business Profile checklist: ${BIZ.site}/blog/google-business-profile-optimization-checklist\n- Web development company kevi rite pasand karvi: ${BIZ.site}/blog/how-to-choose-web-development-company\n\nBadha ahiya: ${BIZ.site}/blog`,
        },
        chips: chipSet(['services', 'pricing', 'start']),
      }),
    },

    {
      id: 'thanks',
      strong: [/\b(thanks|thank you|thnx|thx|dhanyavad|dhanyawad|shukriya|aabhar|abhar)\b/],
      terms: [],
      answer: () => ({
        text: {
          en: `Anytime 🙂 Anything else you want to know before you decide?`,
          hi: `Kabhi bhi 🙂 Decide karne se pehle aur kuch jaanna hai?`,
          gu: `Gme tyare 🙂 Nakki karta pehla biju kai jaanvu chhe?`,
        },
        chips: chipSet(['pricing', 'work', 'start']),
      }),
    },

    {
      id: 'bye',
      strong: [/\b(bye|goodbye|see you|alvida|aavjo|tata)\b/],
      terms: [],
      answer: () => ({
        text: {
          en: `Take care 👋 Whenever you're ready: ${BIZ.contact} or WhatsApp ${BIZ.phonePretty}.`,
          hi: `Dhyan rakhiye 👋 Jab bhi ready hon: ${BIZ.contact} ya WhatsApp ${BIZ.phonePretty}.`,
          gu: `Dhyan rakhjo 👋 Jyare pan taiyar hoy: ${BIZ.contact} athva WhatsApp ${BIZ.phonePretty}.`,
        },
        chips: [],
      }),
    },
  ];

  /* ─── Scoring ─────────────────────────────────────────
     Weighted term hits + regex bonuses, with a small boost
     for the intent that follows naturally from the last one. */
  /* Intents that ask something specific about a service rather than asking
     what the service is. These are the only ones allowed to outrank a
     directly-named service. */
  const QUESTION_INTENTS = ['pricing', 'timeline', 'process', 'support', 'portfolio',
    'contact', 'location'];

  const FOLLOWS = {
    service_detail: ['pricing', 'timeline', 'process'],
    pricing: ['timeline', 'start'],
    process: ['timeline', 'pricing'],
    portfolio: ['pricing', 'start'],
  };

  function scoreMessage(raw) {
    const text = normalize(raw);
    const toks = tokenize(raw);
    const scores = [];

    INTENTS.forEach((intent) => {
      let score = 0;
      if (intent.strong) {
        intent.strong.forEach((re) => { if (re.test(text)) score += 4; });
      }
      /* Multi-word terms are far more discriminating than single words,
         so they earn more. */
      intent.terms.forEach((term) => {
        if (hasTerm(text, toks, term)) score += term.indexOf(' ') !== -1 ? 2.2 : 1.2;
      });
      if (ctx.lastIntent && FOLLOWS[ctx.lastIntent] &&
          FOLLOWS[ctx.lastIntent].indexOf(intent.id) !== -1) {
        score += score > 0 ? 0.6 : 0;
      }
      if (score > 0) scores.push({ intent, score });
    });

    scores.sort((a, b) => b.score - a.score);

    /* A named service is context first, topic second. "How much for a logo?"
       names a service but is a pricing question, so the question wins. But
       only a *question* outranks it — "a website for my restaurant" mentions
       an industry and still wants the website answer. */
    const svc = detectService(text, toks);
    const topQuestion = scores.filter((s) => QUESTION_INTENTS.indexOf(s.intent.id) !== -1)[0];
    if (svc && (!topQuestion || topQuestion.score < 1.2)) {
      const detail = INTENTS.filter((i) => i.id === 'service_detail')[0];
      scores.unshift({ intent: detail, score: 2.6 });
    }
    return { scores, service: svc, city: detectCity(text, toks), text, toks };
  }

  const FALLBACK = {
    en: `I don't want to guess at that one — I'd rather get you a straight answer than a made-up one.\n\nThe team can answer it properly: ${BIZ.contact} · WhatsApp ${BIZ.wa} · ${BIZ.email}\n\nMeanwhile, I can help with any of these:`,
    hi: `Is par main guess nahi karna chahta — galat jawab dene se behtar hai sahi jawab dilana.\n\nTeam ise theek se answer kar degi: ${BIZ.contact} · WhatsApp ${BIZ.wa} · ${BIZ.email}\n\nTab tak, in mein se kisi cheez mein madad kar sakta hoon:`,
    gu: `Aa vishe hu andajo nathi lagavvo mangto — khota jawab karta sacho jawab apavvo saro.\n\nTeam ene barabar answer kari deshe: ${BIZ.contact} · WhatsApp ${BIZ.wa} · ${BIZ.email}\n\nTya sudhi, aa ma thi kai pan ma madad kari shaku:`,
  };

  const AMBIGUOUS = {
    en: 'I can read that two ways — which one did you mean?',
    hi: 'Ise do tarah se samajh sakta hoon — aapka matlab kaunsa tha?',
    gu: 'Aane be rite samji shaku — tamaro matlab kayo hato?',
  };

  /* ═══════════════════════════════════════════════════════════
     LEAD FLOW — a short guided capture. Runs entirely locally;
     the finished brief is handed to the visitor as a prefilled
     WhatsApp message so nothing depends on a server being up.
     ═══════════════════════════════════════════════════════════ */
  const LEAD_TRIGGERS = ['start', 'begin', 'get started', 'hire', 'book', 'interested',
    'enquiry', 'enquire', 'inquiry', 'want to work', 'lets work', 'proceed', 'go ahead',
    'shuru', 'chalu', 'karvana', 'karwana'];

  const lead = { active: false, step: 0, name: '', contact: '', service: '', brief: '' };

  const LEAD_STEPS = [
    {
      key: 'name',
      ask: {
        en: `Good — let's get this moving. 🚀\n\nFirst, what should I call you?`,
        hi: `Badhiya — shuru karte hain. 🚀\n\nPehle, aapko kya bulaun?`,
        gu: `Saras — chalo shuru kariye. 🚀\n\nPehla, tamne su kahi ne bolavu?`,
      },
      chips: [],
    },
    {
      key: 'contact',
      ask: {
        en: `Thanks {name}. What's the best number or email to reach you on?`,
        hi: `Shukriya {name}. Aap tak pahunchne ke liye best number ya email kya hai?`,
        gu: `Aabhar {name}. Tamara sudhi pahochva mate best number ke email su chhe?`,
      },
      chips: [],
    },
    {
      key: 'service',
      ask: {
        en: `Got it. Which of these is the project closest to?`,
        hi: `Theek hai. Project in mein se kis ke sabse kareeb hai?`,
        gu: `Barabar. Project aa ma thi kone sauthi najik chhe?`,
      },
      chips: () => SERVICES.map((s) => s.name.en),
    },
    {
      key: 'brief',
      ask: {
        en: `Last one — in a line or two, what are you trying to achieve? (What the business does, and what this project should change.)`,
        hi: `Aakhri — ek-do line mein, aap kya achieve karna chahte hain? (Business kya karta hai, aur is project se kya badalna chahiye.)`,
        gu: `Chhellu — ek-be line ma, tame su achieve karva mango chho? (Business su kare chhe, ane aa project thi su badlavu joiye.)`,
      },
      chips: [],
    },
  ];

  function startLead() {
    lead.active = true;
    lead.step = 0;
    lead.name = ''; lead.contact = ''; lead.brief = '';
    lead.service = ctx.service ? ctx.service.name.en : '';
    return { text: L(LEAD_STEPS[0].ask), chips: [] };
  }

  function leadSummary() {
    const msg =
      `Hello Manhar Creatives,\n\n` +
      `Name: ${lead.name}\n` +
      `Contact: ${lead.contact}\n` +
      `Service: ${lead.service || 'Not sure yet'}\n` +
      `About the project: ${lead.brief}\n\n` +
      `Sent from the website assistant.`;
    const waLink = `${BIZ.wa}?text=${encodeURIComponent(msg)}`;
    try { localStorage.setItem('mch_lead', JSON.stringify(lead)); } catch (e) {}
    return {
      text: {
        en: `That's everything I need, ${lead.name}. Here's your brief:\n\n- **Service** — ${lead.service || 'To be decided together'}\n- **Reach you on** — ${lead.contact}\n- **Goal** — ${lead.brief}\n\nSend it straight through and the team will reply within one working day:\n\n${waLink}\n\nPrefer email or a form instead? ${BIZ.email} · ${BIZ.contact}`,
        hi: `Bas itna hi chahiye tha, ${lead.name}. Ye raha aapka brief:\n\n- **Service** — ${lead.service || 'Saath mein decide karenge'}\n- **Contact** — ${lead.contact}\n- **Goal** — ${lead.brief}\n\nSeedha bhej dijiye, team ek working day mein reply karegi:\n\n${waLink}\n\nEmail ya form better lage to: ${BIZ.email} · ${BIZ.contact}`,
        gu: `Aatlu j joitu hatu, ${lead.name}. Aa rahyo tamaro brief:\n\n- **Service** — ${lead.service || 'Sathe malikne nakki karishu'}\n- **Contact** — ${lead.contact}\n- **Goal** — ${lead.brief}\n\nSidhu mokli do, team ek working day ma reply karshe:\n\n${waLink}\n\nEmail ke form saru lage to: ${BIZ.email} · ${BIZ.contact}`,
      },
      chips: chipSet(['services', 'work', 'process']),
    };
  }

  function advanceLead(raw) {
    const text = normalize(raw);
    if (/^(cancel|stop|skip|rehne do|nahi|na|no thanks|chhodo)\b/.test(text)) {
      lead.active = false;
      return {
        text: {
          en: `No problem, dropped it. Ask me anything else whenever you like.`,
          hi: `Koi baat nahi, chhod diya. Jab chahein kuch bhi poochh lijiye.`,
          gu: `Vandho nahi, chhodi didhu. Jyare mann thay tyare kai pan puchho.`,
        },
        chips: chipSet(['services', 'pricing', 'work']),
      };
    }

    const step = LEAD_STEPS[lead.step];
    lead[step.key] = String(raw).trim();

    /* Normalise a typed service answer onto a real service name. */
    if (step.key === 'service') {
      const svc = detectService(text, tokenize(raw));
      if (svc) lead.service = svc.name.en;
    }

    lead.step += 1;
    if (lead.step >= LEAD_STEPS.length) {
      lead.active = false;
      return leadSummary();
    }

    const next = LEAD_STEPS[lead.step];
    const askText = {};
    ['en', 'hi', 'gu'].forEach((lg) => {
      askText[lg] = next.ask[lg].replace('{name}', lead.name || '');
    });
    return { text: askText, chips: typeof next.chips === 'function' ? next.chips() : next.chips };
  }

  /* ═══════════════════════════════════════════════════════════
     ENTRY POINT — returns { text, chips } for any input.
     ═══════════════════════════════════════════════════════════ */
  function respond(raw) {
    ctx.turns += 1;

    if (lead.active) return advanceLead(raw);

    const analysis = scoreMessage(raw);
    const { scores, service, city, text, toks } = analysis;

    if (service) ctx.service = service;
    if (city) ctx.city = city;

    /* Explicit "let's start" beats everything — it's the whole point. */
    if (countTerms(text, toks, LEAD_TRIGGERS) > 0) {
      ctx.lastIntent = 'lead';
      return startLead();
    }

    if (!scores.length) {
      ctx.lastIntent = null;
      return {
        text: FALLBACK,
        chips: chipSet(['services', 'pricing', 'work', 'human']),
      };
    }

    /* Two intents within a hair of each other means the message genuinely
       reads both ways — ask rather than pick. */
    if (scores.length > 1 && scores[0].score - scores[1].score < 0.5 && scores[0].score < 4) {
      const a = scores[0].intent, b = scores[1].intent;
      const labelFor = (i) => {
        const map = {
          services: CHIPS.services, pricing: CHIPS.pricing, timeline: CHIPS.timeline,
          process: CHIPS.process, portfolio: CHIPS.work, contact: CHIPS.human,
          location: CHIPS.location, support: CHIPS.support, trust: CHIPS.work,
          industries: CHIPS.services, blog: CHIPS.services,
          service_detail: ctx.service
            ? { en: ctx.service.name.en, hi: ctx.service.name.hi, gu: ctx.service.name.gu }
            : CHIPS.services,
        };
        return map[i.id] ? L(map[i.id]) : L(CHIPS.services);
      };
      return { text: AMBIGUOUS, chips: [labelFor(a), labelFor(b)] };
    }

    const winner = scores[0].intent;
    ctx.lastIntent = winner.id;
    return winner.answer({ service: ctx.service, city: ctx.city });
  }

  // ─── HTML ───
  const root = document.createElement('div');
  root.id = 'mch-root';
  const shadow = root.attachShadow({ mode: 'closed' });

  const styles = document.createElement('style');
  styles.textContent = `
    @import url('https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700,900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

    * { box-sizing: border-box; margin: 0; padding: 0; }

    .mch-float {
      position: fixed;
      z-index: 2147483647;
      font-family: 'Satoshi', 'Inter', -apple-system, sans-serif;
      pointer-events: none;
    }
    .mch-bubble-wrap {
      position: relative;
      display: flex;
      align-items: center;
      gap: 16px;
      pointer-events: auto;
      opacity: 0;
      transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      will-change: transform, opacity;
    }
    .mch-bubble-wrap.mch-from-left { transform: translateX(-100%); }
    .mch-bubble-wrap.mch-from-right { transform: translateX(100%); }
    .mch-bubble-wrap.mch-show {
      opacity: 1;
      transform: translateX(0);
    }
    .mch-bubble-wrap.mch-hide {
      opacity: 0;
      transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .mch-avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      border: 2.5px solid rgba(34,197,94,0.3);
      box-shadow: 0 0 32px rgba(34,197,94,0.4), 0 0 80px rgba(34,197,94,0.12);
      cursor: pointer;
      flex-shrink: 0;
      overflow: hidden;
      background: rgba(11,15,14,0.6);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      animation: mch-bob 3s ease-in-out infinite;
      -webkit-tap-highlight-color: transparent;
    }
    .mch-avatar:hover {
      transform: scale(1.08);
      box-shadow: 0 0 32px rgba(34,197,94,0.5), 0 0 80px rgba(34,197,94,0.12);
    }
    .mch-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    @keyframes mch-bob {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-4px); }
    }

    .mch-bubble {
      position: relative;
      background: rgba(11,15,14,0.6);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 16px;
      padding: 10px 16px 10px 14px;
      color: #FFFFFF;
      font-size: 13px;
      line-height: 1.4;
      box-shadow: 0 4px 24px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .mch-bubble::after {
      content: '';
      position: absolute;
      top: 50%;
      right: 100%;
      margin-top: -6px;
      border: 6px solid transparent;
      border-right-color: rgba(255,255,255,0.1);
    }
    .mch-bubble-wrap.mch-right { flex-direction: row-reverse; }
    .mch-bubble-wrap.mch-right .mch-bubble::after {
      right: auto; left: 100%;
      border-right-color: transparent;
      border-left-color: rgba(255,255,255,0.1);
    }
    .mch-bubble-close {
      background: none;
      border: none;
      color: #6B7280;
      cursor: pointer;
      padding: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      transition: color 0.2s, background 0.2s;
      flex-shrink: 0;
    }
    .mch-bubble-close:hover { color: #FFFFFF; background: rgba(255,255,255,0.06); }
    .mch-bubble-close svg { width: 14px; height: 14px; }

    /* Language Picker */
    .mch-lang-picker {
      display: none;
      flex-direction: column;
      gap: 6px;
      white-space: nowrap;
    }
    .mch-lang-label {
      font-size: 11px;
      color: #9CA3AF;
    }
    .mch-lang-options {
      display: flex;
      gap: 4px;
    }
    .mch-lang-btn {
      background: rgba(31,41,55,0.6);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 8px;
      padding: 5px 10px;
      font-size: 11.5px;
      font-family: inherit;
      color: #FFFFFF;
      cursor: pointer;
      transition: all 0.2s;
    }
    .mch-lang-btn:hover {
      background: rgba(34,197,94,0.15);
      border-color: rgba(34,197,94,0.3);
    }

    /* ── Chat Window ── */
    .mch-window {
      position: fixed;
      bottom: 100px;
      right: 90px;
      width: 380px;
      height: 600px;
      max-height: min(600px, calc(100vh - 140px));
      max-width: calc(100vw - 40px);
      background: #0B0F0E;
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 8px 48px rgba(0,0,0,0.5);
      display: none;
      flex-direction: column;
      z-index: 2147483647;
      animation: mch-slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .mch-window.mch-open { display: flex; }

    @keyframes mch-slideUp {
      from { opacity: 0; transform: translateY(12px) scale(0.96); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }

    .mch-hdr {
      background: rgba(11,15,14,0.6);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(255,255,255,0.06);
      padding: 14px 18px;
      display: flex;
      align-items: center;
      gap: 12px;
      flex-shrink: 0;
    }
    .mch-hdr-avatar {
      width: 44px; height: 44px; border-radius: 50%; overflow: hidden;
      border: 2px solid rgba(34,197,94,0.3); flex-shrink: 0;
    }
    .mch-hdr-avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .mch-hdr-info { flex: 1; min-width: 0; }
    .mch-hdr-name { font-size: 14px; font-weight: 600; color: #FFFFFF; }
    .mch-hdr-status { font-size: 11px; color: #22C55E; display: flex; align-items: center; gap: 4px; }
    .mch-hdr-dot { width: 5px; height: 5px; border-radius: 50%; background: #22C55E; display: inline-block; }
    .mch-hdr-btn {
      background: transparent; border: none; border-radius: 8px; width: 30px; height: 30px;
      display: flex; align-items: center; justify-content: center; cursor: pointer;
      color: #6B7280; transition: background 0.2s, color 0.2s;
    }
    .mch-hdr-btn:hover { background: rgba(255,255,255,0.06); color: #FFFFFF; }
    .mch-hdr-btn svg { width: 16px; height: 16px; }

    .mch-body {
      flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 8px;
      background: #0B0F0E; scroll-behavior: smooth;
    }
    .mch-body::-webkit-scrollbar { width: 3px; }
    .mch-body::-webkit-scrollbar-track { background: transparent; }
    .mch-body::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 10px; }

    .mch-msg {
      max-width: 88%; padding: 10px 14px; border-radius: 14px; font-size: 13.5px;
      line-height: 1.55; word-wrap: break-word; animation: mch-fadeIn 0.25s ease;
    }
    .mch-msg-user {
      background: #22C55E; color: #0B0F0E; align-self: flex-end;
      border-bottom-right-radius: 4px; font-weight: 500;
    }
    .mch-msg-bot {
      background: #111827; color: #FFFFFF;
      align-self: flex-start; border: 1px solid rgba(255,255,255,0.06); border-bottom-left-radius: 4px;
    }
    .mch-time { font-size: 10px; opacity: 0.35; margin-top: 4px; text-align: right; }

    .mch-typing {
      align-self: flex-start; background: #111827; border: 1px solid rgba(255,255,255,0.06);
      padding: 12px 16px; border-radius: 14px; border-bottom-left-radius: 4px; display: flex; gap: 4px;
      animation: mch-fadeIn 0.2s ease;
    }
    .mch-typing span {
      width: 6px; height: 6px; border-radius: 50%; background: #6B7280;
      animation: mch-bounce 1.4s ease-in-out infinite;
    }
    .mch-typing span:nth-child(2) { animation-delay: 0.2s; }
    .mch-typing span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes mch-bounce {
      0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
      40% { transform: scale(1); opacity: 0.9; }
    }
    @keyframes mch-fadeIn { from { opacity: 0; } to { opacity: 1; } }

    .mch-footer {
      background: rgba(11,15,14,0.6); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
      border-top: 1px solid rgba(255,255,255,0.06); padding: 10px 14px;
      display: flex; align-items: flex-end; gap: 8px; flex-shrink: 0;
    }
    .mch-input {
      flex: 1; background: rgba(31,41,55,0.4); border: 1px solid rgba(255,255,255,0.06);
      border-radius: 12px; padding: 9px 13px; font-family: inherit; font-size: 13.5px;
      color: #FFFFFF; outline: none; transition: border-color 0.2s, background 0.2s;
      resize: none; min-height: 38px; max-height: 120px; line-height: 1.4;
    }
    .mch-input::placeholder { color: #6B7280; }
    .mch-input:focus { border-color: rgba(34,197,94,0.4); background: rgba(31,41,55,0.6); }

    .mch-send {
      width: 38px; height: 38px; border-radius: 50%; border: none; background: #22C55E;
      color: #0B0F0E; display: flex; align-items: center; justify-content: center;
      cursor: pointer; flex-shrink: 0; transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), background 0.2s, opacity 0.2s;
    }
    .mch-send:hover { transform: scale(1.05); background: #4ADE80; }
    .mch-send:active { transform: scale(0.9); }
    .mch-send:disabled { opacity: 0.3; cursor: default; transform: none; }
    .mch-send svg { width: 18px; height: 18px; }

    .mch-quick {
      display: flex; flex-wrap: wrap; gap: 6px; padding: 4px 16px 12px; background: #0B0F0E;
    }
    .mch-qchip {
      background: rgba(31,41,55,0.5); border: 1px solid rgba(255,255,255,0.06);
      border-radius: 20px; padding: 5px 12px; font-size: 12px; color: #9CA3AF;
      cursor: pointer; transition: all 0.2s; font-family: inherit;
    }
    .mch-qchip:hover { background: rgba(34,197,94,0.1); border-color: rgba(34,197,94,0.3); color: #4ADE80; }

    /* Follow-up suggestions rendered inline under the newest bot reply */
    .mch-sugg {
      display: flex; flex-wrap: wrap; gap: 6px;
      align-self: flex-start; max-width: 96%; margin-top: 2px;
      animation: mch-fadeIn 0.3s ease;
    }
    .mch-sugg .mch-qchip {
      background: rgba(34,197,94,0.06); border-color: rgba(34,197,94,0.18);
      color: #4ADE80; text-align: left;
    }
    .mch-sugg .mch-qchip:hover {
      background: rgba(34,197,94,0.14); border-color: rgba(34,197,94,0.42);
    }

    @media (max-width: 480px) {
      .mch-window {
        position: fixed; bottom: 0; right: 0; left: 0; top: 0;
        width: 100%; max-width: 100%; height: 100%; max-height: 100%;
        border-radius: 0; border: none;
      }
      .mch-bubble-wrap { gap: 8px; }
      .mch-avatar { width: 64px; height: 64px; }
      .mch-bubble { font-size: 12px; padding: 8px 12px; }
    }
  `;
  shadow.appendChild(styles);

  // ─── Build UI ───
  const floatWrap = document.createElement('div');
  floatWrap.className = 'mch-float';

  const bubbleWrap = document.createElement('div');
  bubbleWrap.className = 'mch-bubble-wrap';

  const avatar = document.createElement('div');
  avatar.className = 'mch-avatar';
  avatar.setAttribute('role', 'button');
  avatar.setAttribute('tabindex', '0');
  avatar.setAttribute('aria-label', 'Chat with Manhar AI');
  const avatarImg = document.createElement('img');
  avatarImg.src = BOT_IMG;
  avatarImg.alt = 'Manhar AI';
  avatarImg.draggable = false;
  avatar.appendChild(avatarImg);

  const bubble = document.createElement('div');
  bubble.className = 'mch-bubble';

  // Language picker UI (hidden by default)
  const langPicker = document.createElement('div');
  langPicker.className = 'mch-lang-picker';

  const langLabel = document.createElement('div');
  langLabel.className = 'mch-lang-label';
  langLabel.textContent = 'Choose your language:';

  const langOptions = document.createElement('div');
  langOptions.className = 'mch-lang-options';

  const languages = [
    { code: 'hindi', label: '🇮🇳 हिंदी' },
    { code: 'english', label: '🇬🇧 English' },
    { code: 'gujarati', label: '🇮🇳 ગુજરાતી' },
  ];
  languages.forEach(lang => {
    const btn = document.createElement('button');
    btn.className = 'mch-lang-btn';
    btn.textContent = lang.label;
    btn.dataset.lang = lang.code;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      selectLanguage(lang.code);
    });
    langOptions.appendChild(btn);
  });

  langPicker.appendChild(langLabel);
  langPicker.appendChild(langOptions);

  const msgSpan = document.createElement('span');
  msgSpan.textContent = "Need help? 👋";

  const closeBtn = document.createElement('button');
  closeBtn.className = 'mch-bubble-close';
  closeBtn.setAttribute('aria-label', 'Dismiss');
  closeBtn.innerHTML = CLOSE_SVG;

  bubble.appendChild(langPicker);
  bubble.appendChild(msgSpan);
  bubble.appendChild(closeBtn);

  bubbleWrap.appendChild(avatar);
  bubbleWrap.appendChild(bubble);
  floatWrap.appendChild(bubbleWrap);

  // ─── Chat Window ───
  const chatEl = document.createElement('div');
  chatEl.className = 'mch-window';
  chatEl.innerHTML = `
    <div class="mch-hdr">
      <div class="mch-hdr-avatar"><img src="${BOT_IMG}" alt="Manhar AI"></div>
      <div class="mch-hdr-info">
        <div class="mch-hdr-name">Manhar AI</div>
        <div class="mch-hdr-status"><span class="mch-hdr-dot"></span> Online</div>
      </div>
      <div class="mch-hdr-actions">
        <button class="mch-hdr-btn" data-action="reset" title="New chat"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg></button>
        <button class="mch-hdr-btn" data-action="close" title="Close">${CLOSE_SVG}</button>
      </div>
    </div>
    <div class="mch-body"></div>
    <div class="mch-footer">
      <textarea class="mch-input" rows="1" placeholder="Type your message..." aria-label="Chat message"></textarea>
      <button class="mch-send" disabled aria-label="Send">${SEND_SVG}</button>
    </div>
  `;

  shadow.appendChild(floatWrap);
  shadow.appendChild(chatEl);

  // ─── Chat DOM refs ───
  const chatBody = chatEl.querySelector('.mch-body');
  const chatInput = chatEl.querySelector('.mch-input');
  const chatSend = chatEl.querySelector('.mch-send');

  // ─── Show/hide bot ───
  function showBot(pos) {
    if (botVisible || isDismissing) return;
    botVisible = true;

    Object.keys(pos).forEach(key => {
      floatWrap.style[key] = pos[key];
    });
    if (pos.left) floatWrap.style.right = 'auto';
    if (pos.right) floatWrap.style.left = 'auto';
    if (pos.top) floatWrap.style.bottom = 'auto';
    if (pos.bottom) floatWrap.style.top = 'auto';

    const isRight = !!pos.right;
    bubbleWrap.classList.remove('mch-hide', 'mch-show', 'mch-from-left', 'mch-from-right', 'mch-right');
    void bubbleWrap.offsetHeight;
    bubbleWrap.classList.add(isRight ? 'mch-from-right' : 'mch-from-left');
    if (isRight) bubbleWrap.classList.add('mch-right');
    void bubbleWrap.offsetHeight;
    bubbleWrap.classList.add('mch-show');
  }

  function hideBot(callback) {
    if (!botVisible && !isDismissing) {
      if (callback) callback();
      return;
    }
    botVisible = false;
    isDismissing = true;

    const isRight = bubbleWrap.classList.contains('mch-right');
    bubbleWrap.classList.remove('mch-show');
    bubbleWrap.classList.add('mch-hide');
    bubbleWrap.style.transform = isRight ? 'translateX(100%)' : 'translateX(-100%)';

    setTimeout(() => {
      bubbleWrap.style.transform = '';
      isDismissing = false;
      if (callback) callback();
    }, 400);
  }

  // ─── Language picker ───
  function showLanguagePicker() {
    msgSpan.style.display = 'none';
    langPicker.style.display = 'flex';
  }

  function hideLanguagePicker() {
    msgSpan.style.display = '';
    langPicker.style.display = 'none';
  }

  function selectLanguage(lang) {
    setLang(lang);
    try { localStorage.setItem('mch_lang', selectedLanguage); } catch (e) {}
    hideLanguagePicker();
    openChat();
  }

  // ─── Section tracking (continuous, Lenis-compatible) ───
  let sectionRaf = null;

  function startSectionWatcher() {
    function checkSections() {
      if (chatOpen) {
        sectionRaf = requestAnimationFrame(checkSections);
        return;
      }

      /* The homepage anchors only exist on "/". On every inner route we
         fall through to the last entry — a fixed corner slot — so the bot
         is reachable everywhere instead of only on the homepage. */
      const anchored = sections.slice(0, -1);
      const onAnchoredPage = anchored.some((s) => document.querySelector(s.id));

      let foundSection = -1;
      if (onAnchoredPage) {
        for (let i = 0; i < anchored.length; i++) {
          const el = document.querySelector(anchored[i].id);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          const threshold = i === 0 ? 0.75 : 0.6;
          if (rect.top < window.innerHeight * threshold && rect.bottom > 80) {
            foundSection = i;
            break;
          }
        }
      } else if (window.scrollY > 400) {
        foundSection = sections.length - 1;
      }

      if (foundSection >= 0 && foundSection !== currentSectionIdx && !isDismissing) {
        const newPos = sections[foundSection].pos;
        currentSectionIdx = foundSection;
        if (botVisible) {
          hideBot(() => showBot(newPos));
        } else {
          showBot(newPos);
        }
      } else if (foundSection < 0 && botVisible && !isDismissing) {
        hideBot();
      }

      sectionRaf = requestAnimationFrame(checkSections);
    }
    sectionRaf = requestAnimationFrame(checkSections);
  }

  // ─── Initial activation ───
  function tryActivate() {
    /* Wait out the intro film, then start watching. On inner routes there
       is no hero and no preloader, so we start as soon as the app has
       painted something. */
    if (document.querySelector('.preloader')) { setTimeout(tryActivate, 500); return; }
    const appReady = document.querySelector('#hero') || document.querySelector('#main-content');
    if (!appReady) { setTimeout(tryActivate, 500); return; }
    startSectionWatcher();
  }

  // ─── Formatting ───
  function formatText(text) {
    const escaped = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return escaped
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/^- (.+)$/gm, '&nbsp;&nbsp;• $1')
      .replace(/\n/g, '<br>')
      .replace(/https?:\/\/[^\s<]+/g, '<a href="$&" target="_blank" rel="noopener noreferrer" style="color:#22C55E;text-decoration:underline">$&</a>');
  }

  function saveMessages() {
    const msgs = [];
    chatBody.querySelectorAll('.mch-msg').forEach(el => {
      const type = el.classList.contains('mch-msg-user') ? 'user' : 'bot';
      const textEl = el.querySelector('.mch-msg-text');
      if (textEl) msgs.push({ type, text: textEl.innerHTML });
    });
    if (msgs.length) localStorage.setItem('mch_messages', JSON.stringify(msgs));
    else localStorage.removeItem('mch_messages');
  }

  function loadMessages() {
    const saved = localStorage.getItem('mch_messages');
    if (!saved) return;
    try {
      const msgs = JSON.parse(saved);
      msgs.forEach(({ type, text }) => {
        const msg = document.createElement('div');
        msg.className = 'mch-msg mch-msg-' + type;
        const textSpan = document.createElement('span');
        textSpan.className = 'mch-msg-text';
        textSpan.innerHTML = text;
        msg.appendChild(textSpan);
        const time = document.createElement('div');
        time.className = 'mch-time';
        time.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        msg.appendChild(time);
        chatBody.appendChild(msg);
      });
      chatBody.scrollTop = chatBody.scrollHeight;
    } catch (e) {}
  }

  function clearMessages() {
    localStorage.removeItem('mch_messages');
    chatBody.innerHTML = '';
  }

  // ─── Chat functions ───
  function addMsg(text, type) {
    const msg = document.createElement('div');
    msg.className = 'mch-msg mch-msg-' + type;
    const textSpan = document.createElement('span');
    textSpan.className = 'mch-msg-text';
    textSpan.innerHTML = formatText(text);
    msg.appendChild(textSpan);
    const time = document.createElement('div');
    time.className = 'mch-time';
    time.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    msg.appendChild(time);
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  /* Suggestion chips rendered under the latest bot reply. Only the newest
     set stays on screen — stale suggestions from three answers ago are
     noise, not help. */
  function clearSuggestions() {
    chatBody.querySelectorAll('.mch-sugg').forEach((n) => n.remove());
  }

  function renderSuggestions(chips) {
    clearSuggestions();
    if (!chips || !chips.length) return;
    const wrap = document.createElement('div');
    wrap.className = 'mch-sugg';
    chips.forEach((label) => {
      const btn = document.createElement('button');
      btn.className = 'mch-qchip';
      btn.textContent = label;
      btn.addEventListener('click', () => sendMsg(label));
      wrap.appendChild(btn);
    });
    chatBody.appendChild(wrap);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function sendMsg(text) {
    if (!text.trim()) return;
    clearSuggestions();
    addMsg(text, 'user');
    chatInput.value = '';
    chatInput.style.height = 'auto';
    chatSend.disabled = true;

    const typing = document.createElement('div');
    typing.className = 'mch-typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    chatBody.appendChild(typing);
    chatBody.scrollTop = chatBody.scrollHeight;

    const result = respond(text);
    const replyText = L(result.text);

    /* Pace the typing indicator to the length of the answer so a long
       reply doesn't appear instantly and read as canned. */
    const delay = Math.min(1500, 420 + replyText.length * 2.2);
    setTimeout(() => {
      typing.remove();
      addMsg(replyText, 'bot');
      renderSuggestions(result.chips);
      saveMessages();
    }, delay);
  }

  function openChat() {
    if (chatOpen) return;
    chatOpen = true;
    hideBot();
    chatEl.classList.add('mch-open');
    chatInput.focus();
    if (chatBody.children.length === 0) {
      const opener = INTENTS.filter((i) => i.id === 'greeting')[0].answer({});
      addMsg(L(opener.text), 'bot');
      renderSuggestions(opener.chips);
      saveMessages();
    }
  }

  /* Closing hides the window; it does not wipe the conversation. A visitor
     who collapses the chat to read a page and reopens it expects to find
     their thread where they left it. */
  function closeChat() {
    chatOpen = false;
    chatEl.classList.remove('mch-open');
    currentSectionIdx = -1;
  }

  // ─── Events ───
  avatar.addEventListener('click', showLanguagePicker);
  avatar.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showLanguagePicker(); } });
  closeBtn.addEventListener('click', (e) => { e.stopPropagation(); hideBot(); });

  chatSend.addEventListener('click', () => sendMsg(chatInput.value));
  chatInput.addEventListener('input', () => {
    chatInput.style.height = 'auto';
    chatInput.style.height = Math.min(chatInput.scrollHeight, 120) + 'px';
    chatSend.disabled = !chatInput.value.trim();
  });
  chatInput.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (chatInput.value.trim()) sendMsg(chatInput.value);
    }
  });
  chatEl.querySelector('[data-action="close"]').addEventListener('click', closeChat);
  chatEl.querySelector('[data-action="reset"]').addEventListener('click', () => {
    clearMessages();
    lead.active = false;
    ctx.lastIntent = null; ctx.service = null; ctx.city = null; ctx.turns = 0;
    const opener = INTENTS.filter((i) => i.id === 'greeting')[0].answer({});
    addMsg(L(opener.text), 'bot');
    renderSuggestions(opener.chips);
    saveMessages();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && chatOpen) closeChat();
  });

  // ─── Init ───
  document.body.appendChild(root);
  try {
    const savedLang = localStorage.getItem('mch_lang');
    if (savedLang) setLang(savedLang);
  } catch (e) {}
  loadMessages();
  setTimeout(tryActivate, 1000);
})();
