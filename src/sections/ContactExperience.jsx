import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from '../components/TextReveal';
import MagneticButton from '../components/MagneticButton';
import FormField from '../components/FormField';
import CopyButton from '../components/CopyButton';
import { useToast } from '../components/Toast';
import { supabase } from '../lib/supabase';
import useLazyBackground from '../utils/useLazyBackground';
import { EASE } from '../utils/motion';
import { formEvents, trackCta } from '../utils/analytics';

const FORM_ID = 'contact_enquiry';
const MESSAGE_MAX = 1200;

const PROJECT_TYPES = ['Website', 'Custom Software / CRM', 'Branding', 'Social Media', 'Print', 'Digital Presence', 'Other'];

const COUNTRY_CODES = [
  { code: '+93', country: 'Afghanistan' },
  { code: '+355', country: 'Albania' },
  { code: '+213', country: 'Algeria' },
  { code: '+376', country: 'Andorra' },
  { code: '+244', country: 'Angola' },
  { code: '+1', country: 'Anguilla' },
  { code: '+1', country: 'Antigua & Barbuda' },
  { code: '+54', country: 'Argentina' },
  { code: '+374', country: 'Armenia' },
  { code: '+297', country: 'Aruba' },
  { code: '+61', country: 'Australia' },
  { code: '+43', country: 'Austria' },
  { code: '+994', country: 'Azerbaijan' },
  { code: '+1', country: 'Bahamas' },
  { code: '+973', country: 'Bahrain' },
  { code: '+880', country: 'Bangladesh' },
  { code: '+1', country: 'Barbados' },
  { code: '+375', country: 'Belarus' },
  { code: '+32', country: 'Belgium' },
  { code: '+501', country: 'Belize' },
  { code: '+229', country: 'Benin' },
  { code: '+1', country: 'Bermuda' },
  { code: '+975', country: 'Bhutan' },
  { code: '+591', country: 'Bolivia' },
  { code: '+387', country: 'Bosnia & Herzegovina' },
  { code: '+267', country: 'Botswana' },
  { code: '+55', country: 'Brazil' },
  { code: '+1', country: 'British Virgin Islands' },
  { code: '+673', country: 'Brunei' },
  { code: '+359', country: 'Bulgaria' },
  { code: '+226', country: 'Burkina Faso' },
  { code: '+257', country: 'Burundi' },
  { code: '+855', country: 'Cambodia' },
  { code: '+237', country: 'Cameroon' },
  { code: '+1', country: 'Canada' },
  { code: '+238', country: 'Cape Verde' },
  { code: '+1', country: 'Cayman Islands' },
  { code: '+236', country: 'Central African Republic' },
  { code: '+235', country: 'Chad' },
  { code: '+56', country: 'Chile' },
  { code: '+86', country: 'China' },
  { code: '+57', country: 'Colombia' },
  { code: '+269', country: 'Comoros' },
  { code: '+242', country: 'Congo' },
  { code: '+682', country: 'Cook Islands' },
  { code: '+506', country: 'Costa Rica' },
  { code: '+225', country: "Côte d'Ivoire" },
  { code: '+385', country: 'Croatia' },
  { code: '+53', country: 'Cuba' },
  { code: '+599', country: 'Curaçao' },
  { code: '+357', country: 'Cyprus' },
  { code: '+420', country: 'Czech Republic' },
  { code: '+45', country: 'Denmark' },
  { code: '+253', country: 'Djibouti' },
  { code: '+1', country: 'Dominica' },
  { code: '+1', country: 'Dominican Republic' },
  { code: '+243', country: 'DR Congo' },
  { code: '+593', country: 'Ecuador' },
  { code: '+20', country: 'Egypt' },
  { code: '+503', country: 'El Salvador' },
  { code: '+240', country: 'Equatorial Guinea' },
  { code: '+291', country: 'Eritrea' },
  { code: '+372', country: 'Estonia' },
  { code: '+268', country: 'Eswatini' },
  { code: '+251', country: 'Ethiopia' },
  { code: '+500', country: 'Falkland Islands' },
  { code: '+298', country: 'Faroe Islands' },
  { code: '+679', country: 'Fiji' },
  { code: '+358', country: 'Finland' },
  { code: '+33', country: 'France' },
  { code: '+594', country: 'French Guiana' },
  { code: '+689', country: 'French Polynesia' },
  { code: '+241', country: 'Gabon' },
  { code: '+220', country: 'Gambia' },
  { code: '+995', country: 'Georgia' },
  { code: '+49', country: 'Germany' },
  { code: '+233', country: 'Ghana' },
  { code: '+350', country: 'Gibraltar' },
  { code: '+30', country: 'Greece' },
  { code: '+299', country: 'Greenland' },
  { code: '+1', country: 'Grenada' },
  { code: '+590', country: 'Guadeloupe' },
  { code: '+1', country: 'Guam' },
  { code: '+502', country: 'Guatemala' },
  { code: '+44', country: 'Guernsey' },
  { code: '+224', country: 'Guinea' },
  { code: '+245', country: 'Guinea-Bissau' },
  { code: '+592', country: 'Guyana' },
  { code: '+509', country: 'Haiti' },
  { code: '+504', country: 'Honduras' },
  { code: '+852', country: 'Hong Kong' },
  { code: '+36', country: 'Hungary' },
  { code: '+354', country: 'Iceland' },
  { code: '+91', country: 'India' },
  { code: '+62', country: 'Indonesia' },
  { code: '+98', country: 'Iran' },
  { code: '+964', country: 'Iraq' },
  { code: '+353', country: 'Ireland' },
  { code: '+44', country: 'Isle of Man' },
  { code: '+972', country: 'Israel' },
  { code: '+39', country: 'Italy' },
  { code: '+1', country: 'Jamaica' },
  { code: '+81', country: 'Japan' },
  { code: '+44', country: 'Jersey' },
  { code: '+962', country: 'Jordan' },
  { code: '+7', country: 'Kazakhstan' },
  { code: '+254', country: 'Kenya' },
  { code: '+686', country: 'Kiribati' },
  { code: '+383', country: 'Kosovo' },
  { code: '+965', country: 'Kuwait' },
  { code: '+996', country: 'Kyrgyzstan' },
  { code: '+856', country: 'Laos' },
  { code: '+371', country: 'Latvia' },
  { code: '+961', country: 'Lebanon' },
  { code: '+266', country: 'Lesotho' },
  { code: '+231', country: 'Liberia' },
  { code: '+218', country: 'Libya' },
  { code: '+423', country: 'Liechtenstein' },
  { code: '+370', country: 'Lithuania' },
  { code: '+352', country: 'Luxembourg' },
  { code: '+853', country: 'Macau' },
  { code: '+261', country: 'Madagascar' },
  { code: '+265', country: 'Malawi' },
  { code: '+60', country: 'Malaysia' },
  { code: '+960', country: 'Maldives' },
  { code: '+223', country: 'Mali' },
  { code: '+356', country: 'Malta' },
  { code: '+692', country: 'Marshall Islands' },
  { code: '+596', country: 'Martinique' },
  { code: '+222', country: 'Mauritania' },
  { code: '+230', country: 'Mauritius' },
  { code: '+262', country: 'Mayotte' },
  { code: '+52', country: 'Mexico' },
  { code: '+691', country: 'Micronesia' },
  { code: '+373', country: 'Moldova' },
  { code: '+377', country: 'Monaco' },
  { code: '+976', country: 'Mongolia' },
  { code: '+382', country: 'Montenegro' },
  { code: '+1', country: 'Montserrat' },
  { code: '+212', country: 'Morocco' },
  { code: '+258', country: 'Mozambique' },
  { code: '+95', country: 'Myanmar' },
  { code: '+264', country: 'Namibia' },
  { code: '+674', country: 'Nauru' },
  { code: '+977', country: 'Nepal' },
  { code: '+31', country: 'Netherlands' },
  { code: '+687', country: 'New Caledonia' },
  { code: '+64', country: 'New Zealand' },
  { code: '+505', country: 'Nicaragua' },
  { code: '+227', country: 'Niger' },
  { code: '+234', country: 'Nigeria' },
  { code: '+683', country: 'Niue' },
  { code: '+850', country: 'North Korea' },
  { code: '+389', country: 'North Macedonia' },
  { code: '+1', country: 'Northern Mariana Islands' },
  { code: '+47', country: 'Norway' },
  { code: '+968', country: 'Oman' },
  { code: '+92', country: 'Pakistan' },
  { code: '+680', country: 'Palau' },
  { code: '+970', country: 'Palestine' },
  { code: '+507', country: 'Panama' },
  { code: '+675', country: 'Papua New Guinea' },
  { code: '+595', country: 'Paraguay' },
  { code: '+51', country: 'Peru' },
  { code: '+63', country: 'Philippines' },
  { code: '+48', country: 'Poland' },
  { code: '+351', country: 'Portugal' },
  { code: '+1', country: 'Puerto Rico' },
  { code: '+974', country: 'Qatar' },
  { code: '+262', country: 'Réunion' },
  { code: '+40', country: 'Romania' },
  { code: '+7', country: 'Russia' },
  { code: '+250', country: 'Rwanda' },
  { code: '+590', country: 'Saint Barthélemy' },
  { code: '+290', country: 'Saint Helena' },
  { code: '+1', country: 'Saint Kitts & Nevis' },
  { code: '+1', country: 'Saint Lucia' },
  { code: '+590', country: 'Saint Martin' },
  { code: '+508', country: 'Saint Pierre & Miquelon' },
  { code: '+1', country: 'Saint Vincent & Grenadines' },
  { code: '+685', country: 'Samoa' },
  { code: '+378', country: 'San Marino' },
  { code: '+239', country: 'São Tomé & Príncipe' },
  { code: '+966', country: 'Saudi Arabia' },
  { code: '+221', country: 'Senegal' },
  { code: '+381', country: 'Serbia' },
  { code: '+248', country: 'Seychelles' },
  { code: '+232', country: 'Sierra Leone' },
  { code: '+65', country: 'Singapore' },
  { code: '+1', country: 'Sint Maarten' },
  { code: '+421', country: 'Slovakia' },
  { code: '+386', country: 'Slovenia' },
  { code: '+677', country: 'Solomon Islands' },
  { code: '+252', country: 'Somalia' },
  { code: '+27', country: 'South Africa' },
  { code: '+82', country: 'South Korea' },
  { code: '+211', country: 'South Sudan' },
  { code: '+34', country: 'Spain' },
  { code: '+94', country: 'Sri Lanka' },
  { code: '+249', country: 'Sudan' },
  { code: '+597', country: 'Suriname' },
  { code: '+46', country: 'Sweden' },
  { code: '+41', country: 'Switzerland' },
  { code: '+963', country: 'Syria' },
  { code: '+886', country: 'Taiwan' },
  { code: '+992', country: 'Tajikistan' },
  { code: '+255', country: 'Tanzania' },
  { code: '+66', country: 'Thailand' },
  { code: '+670', country: 'Timor-Leste' },
  { code: '+228', country: 'Togo' },
  { code: '+690', country: 'Tokelau' },
  { code: '+676', country: 'Tonga' },
  { code: '+1', country: 'Trinidad & Tobago' },
  { code: '+216', country: 'Tunisia' },
  { code: '+90', country: 'Turkey' },
  { code: '+993', country: 'Turkmenistan' },
  { code: '+1', country: 'Turks & Caicos Islands' },
  { code: '+688', country: 'Tuvalu' },
  { code: '+256', country: 'Uganda' },
  { code: '+380', country: 'Ukraine' },
  { code: '+971', country: 'United Arab Emirates' },
  { code: '+44', country: 'United Kingdom' },
  { code: '+1', country: 'United States' },
  { code: '+598', country: 'Uruguay' },
  { code: '+1', country: 'US Virgin Islands' },
  { code: '+998', country: 'Uzbekistan' },
  { code: '+678', country: 'Vanuatu' },
  { code: '+39', country: 'Vatican City' },
  { code: '+58', country: 'Venezuela' },
  { code: '+84', country: 'Vietnam' },
  { code: '+681', country: 'Wallis & Futuna' },
  { code: '+967', country: 'Yemen' },
  { code: '+260', country: 'Zambia' },
  { code: '+263', country: 'Zimbabwe' },
];

function CountryCodeSelect({ value, onChange, error }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const filtered = search.trim()
    ? COUNTRY_CODES.filter(cc =>
        cc.code.includes(search.trim()) ||
        cc.country.toLowerCase().includes(search.trim().toLowerCase())
      )
    : COUNTRY_CODES;

  useEffect(() => {
    function handleClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
        setSearch('');
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  /* Escape closes the list and returns focus to the trigger,
     rather than leaving a 340px panel open over the form with
     no obvious way out for a keyboard user. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      e.stopPropagation();
      setOpen(false);
      setSearch('');
      containerRef.current?.querySelector('button')?.focus();
    };
    document.addEventListener('keydown', onKey, true);
    return () => document.removeEventListener('keydown', onKey, true);
  }, [open]);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  const selected = COUNTRY_CODES.find(cc => cc.code === value) || COUNTRY_CODES[0];

  const triggerBase = {
    width: '140px',
    padding: '20px 0',
    background: 'transparent',
    border: 'none',
    borderBottom: error ? '1px solid #EF4444' : '1px solid rgba(255,255,255,0.2)',
    color: '#fff',
    fontSize: '1.125rem',
    fontFamily: 'var(--font-body)',
    outline: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '4px',
    transition: 'border-color 0.3s ease',
  };

  return (
    <div ref={containerRef} style={{ position: 'relative', flexShrink: 0 }}>
      <button
        type="button"
        onClick={() => { setOpen(p => !p); setSearch(''); }}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Country calling code, currently ${selected.code} ${selected.country}`}
        style={triggerBase}
      >
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {selected.code} {selected.country}
        </span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{
          flexShrink: 0,
          opacity: 0.5,
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease'
        }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="country-dropdown" style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          width: '320px',
          maxHeight: '340px',
          marginTop: '4px',
          background: 'rgba(17,24,39,0.98)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div style={{ padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 0',
              borderBottom: '1px solid rgba(255,255,255,0.2)',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                ref={inputRef}
                placeholder="Search country or code..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#fff',
                  fontSize: '0.9375rem',
                  fontFamily: 'var(--font-body)',
                  width: '100%',
                }}
              />
            </div>
          </div>
          <div style={{
            overflowY: 'auto',
            flex: 1,
            maxHeight: '240px',
          }}>
            {filtered.map((cc, i) => (
              <button
                key={`${cc.code}-${i}`}
                type="button"
                onClick={() => { onChange(cc.code); setOpen(false); setSearch(''); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: '10px 16px',
                  background: cc.code === value
                    ? 'rgba(34,197,94,0.12)'
                    : 'transparent',
                  border: 'none',
                  color: cc.code === value ? '#22C55E' : 'rgba(255,255,255,0.8)',
                  fontSize: '0.9375rem',
                  fontFamily: 'var(--font-body)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.15s ease',
                }}
                onMouseEnter={e => { if (cc.code !== value) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                onMouseLeave={e => { if (cc.code !== value) e.currentTarget.style.background = 'transparent'; }}
              >
                <span style={{
                  color: 'rgba(255,255,255,0.48)',
                  minWidth: '64px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.875rem'
                }}>
                  {cc.code}
                </span>
                <span>{cc.country}</span>
              </button>
            ))}
            {filtered.length === 0 && (
              <div style={{ padding: '24px 16px', color: 'rgba(255,255,255,0.48)', textAlign: 'center', fontSize: '0.9375rem' }}>
                No countries found
              </div>
            )}
          </div>
          <div style={{
            padding: '8px 16px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            color: 'rgba(255,255,255,0.48)',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
          }}>
            {filtered.length} {filtered.length === 1 ? 'country' : 'countries'}
          </div>
        </div>
      )}
    </div>
  );
}

const INITIAL_FORM = {
  name: '', company: '', email: '', phone: '', address: '',
  type: '', otherType: '', message: '', contactMethod: 'Email',
};

/* ─── Validators ──────────────────────────────────────────
   Kept as pure single-field functions so the same rule runs on
   blur, on keystroke-after-error and on submit. One rule, one
   place — the classic bug here is a field that passes inline
   and then fails on submit for a reason nobody explained.
───────────────────────────────────────────────────────── */

/* Practical email shape check. Deliberately not RFC 5322: the
   full grammar accepts addresses no mail server will deliver to
   and rejects nothing a typo'd address would trip. The real
   validation is the reply landing in their inbox. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

const VALIDATORS = {
  name: (v) => {
    const t = v.trim();
    if (!t) return 'Please tell us your name';
    if (t.length < 2) return 'That looks a little short';
    if (t.length > 80) return 'Please keep this under 80 characters';
    return '';
  },
  email: (v) => {
    const t = v.trim();
    if (!t) return 'We need an email to reply to';
    if (t.length > 254) return 'That email address is too long';
    if (!EMAIL_RE.test(t)) return 'That does not look like a valid email address';
    return '';
  },
  phone: (v) => {
    const t = v.trim();
    if (!t) return 'A phone number helps us reach you faster';
    const digits = t.replace(/\D/g, '');
    if (digits.length < 7) return 'That number looks too short';
    if (digits.length > 15) return 'That number looks too long';
    if (/[^\d\s\-().]/.test(t)) return 'Use digits, spaces, dashes or brackets only';
    return '';
  },
  otherType: (v) => (v.trim() ? '' : 'Please tell us what kind of project this is'),
  message: (v) => (v.length > MESSAGE_MAX ? `Please keep this under ${MESSAGE_MAX} characters` : ''),
};

const FIELD_ORDER = ['name', 'company', 'email', 'phone', 'address', 'otherType', 'message'];

export default function ContactExperience() {
  const panelBgRef = useLazyBackground('/images/backgrounds/contact-bg.webp');
  const toast = useToast();

  const [formData, setFormData] = useState(INITIAL_FORM);
  const [countryCode, setCountryCode] = useState('+91');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [shakeField, setShakeField] = useState('');
  /* idle | submitting | success | error */
  const [status, setStatus] = useState('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const formRef = useRef(null);
  const sectionRef = useRef(null);
  const fieldRefs = useRef({});
  const started = useRef(false);
  const viewed = useRef(false);
  const lastField = useRef('');
  const resetTimer = useRef(null);

  const registerField = useCallback((name) => (node) => {
    if (node) fieldRefs.current[name] = node;
  }, []);

  /* ── Analytics: impression, start, abandonment ────────── */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !viewed.current) {
            viewed.current = true;
            formEvents.view(FORM_ID);
            io.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    /* Someone who typed into the form and left without sending is
       the most useful signal this page produces — it says the form
       is the problem, not the traffic. */
    const reportAbandon = () => {
      if (!started.current || status === 'success') return;
      const filled = FIELD_ORDER.filter((f) => String(formData[f] || '').trim()).length;
      formEvents.abandon(FORM_ID, lastField.current, filled);
      started.current = false;
    };

    window.addEventListener('pagehide', reportAbandon);
    return () => {
      window.removeEventListener('pagehide', reportAbandon);
      reportAbandon();
      clearTimeout(resetTimer.current);
    };
  }, [formData, status]);

  /* ── Field plumbing ───────────────────────────────────── */
  const handleFocus = useCallback((field) => () => {
    lastField.current = field;
    if (!started.current) {
      started.current = true;
      formEvents.start(FORM_ID, field);
    }
  }, []);

  const handleChange = useCallback((field) => (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));

    /* Only revalidate live once the field has already failed —
       otherwise we would be flagging an email as invalid after
       the first character. */
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = VALIDATORS[field]?.(value) ?? '';
      if (next === prev[field]) return prev;
      return { ...prev, [field]: next };
    });
  }, []);

  const handleBlur = useCallback((field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const validator = VALIDATORS[field];
    if (!validator) return;

    const value = formData[field] ?? '';
    /* Optional fields stay silent when left empty. */
    const optional = !['name', 'email', 'phone'].includes(field);
    if (optional && !String(value).trim()) return;

    const message = validator(value);
    setErrors((prev) => (prev[field] === message ? prev : { ...prev, [field]: message }));
    if (message) formEvents.fieldError(FORM_ID, field, message);
  }, [formData]);

  const clearField = useCallback((field) => () => {
    setFormData((prev) => ({ ...prev, [field]: '' }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
    fieldRefs.current[field]?.focus();
  }, []);

  function validateAll(data) {
    const errs = {};
    ['name', 'email', 'phone'].forEach((f) => {
      const m = VALIDATORS[f](data[f] ?? '');
      if (m) errs[f] = m;
    });
    if (data.type === 'Other') {
      const m = VALIDATORS.otherType(data.otherType ?? '');
      if (m) errs.otherType = m;
    }
    const msg = VALIDATORS.message(data.message ?? '');
    if (msg) errs.message = msg;
    return errs;
  }

  const focusFirstError = useCallback((errs) => {
    const first = FIELD_ORDER.find((f) => errs[f]);
    if (!first) return;

    setShakeField(first);
    setTimeout(() => setShakeField(''), 420);

    const node = fieldRefs.current[first];
    if (!node) return;

    /* Scroll the field into view before focusing. Focusing alone
       makes the browser jump to it with no easing, and behind a
       sticky nav it can land underneath the header. */
    const y = node.getBoundingClientRect().top + window.scrollY - 140;
    if (window.__lenis) window.__lenis.scrollTo(y, { duration: 0.6 });
    else window.scrollTo({ top: y, behavior: 'smooth' });

    setTimeout(() => node.focus({ preventScroll: true }), 320);
  }, []);

  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM);
    setCountryCode('+91');
    setErrors({});
    setTouched({});
    setStatus('idle');
    setStatusMessage('');
    started.current = false;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'submitting') return;

    const errs = validateAll(formData);
    setErrors(errs);
    setTouched(Object.fromEntries(FIELD_ORDER.map((f) => [f, true])));

    if (Object.keys(errs).length > 0) {
      const count = Object.keys(errs).length;
      setStatusMessage(`${count} field${count > 1 ? 's need' : ' needs'} your attention before we can send this.`);
      Object.entries(errs).forEach(([field, message]) => formEvents.fieldError(FORM_ID, field, message));
      focusFirstError(errs);
      toast.error('Almost there', `Please check the highlighted field${count > 1 ? 's' : ''}.`);
      return;
    }

    setStatus('submitting');
    setStatusMessage('Sending your enquiry…');

    const fullPhone = `${countryCode} ${formData.phone}`;
    const payload = { ...formData, phone: fullPhone };
    if (payload.type !== 'Other') delete payload.otherType;

    /* ── Primary destination: the enquiry sheet ── */
    try {
      const fd = new FormData();
      Object.entries(payload).forEach(([k, v]) => fd.append(k, v));

      /* A hung request must not leave the button spinning forever.
         `no-cors` means we never see a status code, so the timeout
         is the only failure signal available. */
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);

      await fetch('https://script.google.com/macros/s/AKfycbyKRyD8W4ppEvbYopADHNoGVzB0fs3lRX5E3jbTrdoDpJo6b4H8FdQzJa8nxs83y_yGIg/exec', {
        method: 'POST',
        body: fd,
        signal: controller.signal,
      });

      clearTimeout(timeout);
    } catch (err) {
      const timedOut = err?.name === 'AbortError';
      setStatus('error');
      setStatusMessage(
        timedOut
          ? 'That took longer than expected. Your connection may be slow — please try again.'
          : 'We could not send that. Please try again, or reach us directly.'
      );
      formEvents.error(FORM_ID, timedOut ? 'timeout' : 'network');
      toast.error(
        timedOut ? 'Request timed out' : 'Could not send',
        'Your details are still here — press Try again.'
      );
      return;
    }

    /* ── Secondary: CRM record. A failure here must never be shown
       to the visitor — their enquiry has already been delivered. ── */
    try {
      const { data: existing } = await supabase
        .from('clients')
        .select('id')
        .order('id', { ascending: false })
        .limit(1);
      const maxNum = existing?.length > 0
        ? parseInt(existing[0].id?.replace('MC-CL-', '') || '0', 10)
        : 0;
      const newId = `MC-CL-${String(maxNum + 1).padStart(4, '0')}`;
      await supabase.from('clients').insert([{
        id: newId,
        timestamp: new Date().toISOString(),
        source: 'Website',
        name: formData.name,
        business: formData.company || '',
        phone: fullPhone,
        email: formData.email || '',
        location: formData.address || '',
        services: formData.type === 'Other' ? formData.otherType : formData.type,
        requirement: formData.message || '',
        contact_method: formData.contactMethod,
      }]);
    } catch {
      /* Intentionally silent — see above. */
    }

    setErrors({});
    setStatus('success');
    setStatusMessage('Enquiry received. We will be in touch within 24 hours.');
    formEvents.submit(FORM_ID, {
      project_type: formData.type || 'unspecified',
      contact_method: formData.contactMethod,
      has_message: Boolean(formData.message?.trim()),
    });
    toast.success('Enquiry received', 'We will get back to you within 24 hours.');
    started.current = false;
  };

  const retry = useCallback(() => {
    setStatus('idle');
    setStatusMessage('');
  }, []);

  const busy = status === 'submitting';

  /* Chip rows (project type, contact method) share one style. */
  const chipStyle = (active) => ({
    padding: '10px 20px', borderRadius: '40px', fontSize: '0.9375rem', cursor: busy ? 'not-allowed' : 'pointer',
    background: active ? '#fff' : 'transparent',
    border: `1px solid ${active ? '#fff' : 'rgba(255,255,255,0.2)'}`,
    color: active ? '#000' : 'rgba(255,255,255,0.7)',
    transition: 'all 0.3s ease', fontFamily: 'var(--font-body)',
    minHeight: '44px', opacity: busy ? 0.5 : 1,
  });

  return (
    <section ref={sectionRef} id="contact" style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      
      {/* Left: Full Bleed Image */}
      <div ref={panelBgRef} className="contact-info-panel" style={{ 
        flex: 1, 
        position: 'relative', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        borderRight: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(11,15,14,0.3), rgba(11,15,14,0.8))' }} />
        
        <div className="contact-info-content" style={{ position: 'absolute', bottom: '80px', left: '80px', right: '40px', zIndex: 2 }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 5vw, 4.5rem)',
            fontWeight: 600,
            lineHeight: 1.1,
            marginBottom: '16px',
            letterSpacing: '-0.02em',
            color: '#fff'
          }}>
            Tell Us About <br /><span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.7)' }}>Your Project.</span>
          </h2>
          <p style={{
            fontSize: '1.0625rem',
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.7,
            marginBottom: '32px',
            maxWidth: '400px'
          }}>
            Share your goals, requirements, and timeline. We'll review your inquiry and get back to you with a clear next step.
          </p>
          {/* Email and phone are copyable — on desktop a `mailto:`
              link opens a mail client nobody configured, so the
              useful action is usually "give me the address". */}
          <div className="contact-info-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', color: 'rgba(255,255,255,0.6)', fontSize: '1.0625rem' }}>
            <div>
              <span style={{ display: 'block', color: '#fff', marginBottom: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>EMAIL</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
                <a href="mailto:info@manharcreatives.com" className="mc-link">info@manharcreatives.com</a>
                <CopyButton value="info@manharcreatives.com" type="email" iconOnly label="Copy email address" />
              </span>
            </div>
            <div>
              <span style={{ display: 'block', color: '#fff', marginBottom: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>PHONE</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
                <a href="tel:+919714571522" className="mc-link">+91 97145 71522</a>
                <CopyButton value="+91 97145 71522" type="phone" iconOnly label="Copy phone number" />
              </span>
            </div>
            <div>
              <span style={{ display: 'block', color: '#fff', marginBottom: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>WEBSITE</span>
              <a href="https://www.manharcreatives.com" target="_blank" rel="noopener noreferrer" className="mc-link">www.manharcreatives.com</a>
            </div>
            <div>
              <span style={{ display: 'block', color: '#fff', marginBottom: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>INSTAGRAM</span>
              <a href="https://instagram.com/manhar.creatives" target="_blank" rel="noopener noreferrer" className="mc-link">@manhar.creatives</a>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <span style={{ display: 'block', color: '#fff', marginBottom: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>LOCATION</span>
              <span style={{ display: 'block', marginBottom: '8px' }}>
                Sona Complex, A-252, Kansa Cross Road, Opp. Khodiyar Hotel, Visnagar, Mehsana, Gujarat 384315
              </span>
              <a href="https://maps.app.goo.gl/XibakBTyA6x1ECLJ7" target="_blank" rel="noopener noreferrer" className="mc-link">
                Get Directions →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Form Area */}
      <div className="contact-form-container" style={{ 
        flex: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '120px 40px' 
      }}>
        <div style={{ width: '100%', maxWidth: '560px' }}>
          
          <FadeIn>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
              <div style={{ height: '1px', width: '40px', background: 'var(--color-primary)' }} />
              <span className="text-caption" style={{ color: 'var(--color-primary)', letterSpacing: '0.15em' }}>
                READY TO GROW?
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
              {/* Status is announced to assistive tech regardless of
                  which visual state the form is in. Without this, a
                  screen-reader user submits and hears nothing at all. */}
              <p className="visually-hidden" role="status" aria-live="polite" aria-atomic="true">
                {statusMessage}
              </p>

              <AnimatePresence mode="wait" initial={false}>
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    style={{ padding: '48px 0' }}
                  >
                    <motion.div
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.5, ease: EASE }}
                      style={{
                        width: '62px', height: '62px', borderRadius: '50%', marginBottom: '26px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.35)',
                        color: 'var(--color-primary)',
                      }}
                    >
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </motion.div>

                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '14px', color: '#fff', lineHeight: 1.2 }}>
                      Enquiry received
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.0625rem', lineHeight: 1.75, marginBottom: '28px', maxWidth: '440px' }}>
                      Thank you{formData.name ? `, ${formData.name.trim().split(/\s+/)[0]}` : ''}. Our team will review your request
                      and reach out within 24 hours to schedule a consultation.
                    </p>

                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        onClick={resetForm}
                        className="btn btn-outline"
                        style={{ padding: '12px 26px', fontSize: '0.875rem' }}
                      >
                        Send another enquiry
                      </button>
                      <a
                        href="https://wa.me/919714571522"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-ghost"
                        style={{ padding: '12px 22px', fontSize: '0.875rem', color: 'var(--color-primary)' }}
                      >
                        Message us on WhatsApp →
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    ref={formRef}
                    onSubmit={handleSubmit}
                    noValidate
                    aria-busy={busy}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}
                  >
                    {/* Every control inside one fieldset so a single
                        `disabled` freezes the whole form mid-submit
                        and a double submission becomes impossible. */}
                    <fieldset
                      disabled={busy}
                      style={{ border: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '26px' }}
                    >
                      <FormField
                        ref={registerField('name')}
                        id="contact-name"
                        name="name"
                        label="Full Name"
                        value={formData.name}
                        onChange={handleChange('name')}
                        onFocus={handleFocus('name')}
                        onBlur={handleBlur('name')}
                        onClear={clearField('name')}
                        error={errors.name}
                        shaking={shakeField === 'name'}
                        required
                        maxLength={80}
                        autoComplete="name"
                        autoCapitalize="words"
                      />

                      <FormField
                        ref={registerField('company')}
                        id="contact-company"
                        name="company"
                        label="Company / Business Name"
                        value={formData.company}
                        onChange={handleChange('company')}
                        onFocus={handleFocus('company')}
                        onClear={clearField('company')}
                        maxLength={100}
                        autoComplete="organization"
                        autoCapitalize="words"
                      />

                      <FormField
                        ref={registerField('email')}
                        id="contact-email"
                        name="email"
                        label="Email Address"
                        type="email"
                        inputMode="email"
                        value={formData.email}
                        onChange={handleChange('email')}
                        onFocus={handleFocus('email')}
                        onBlur={handleBlur('email')}
                        onClear={clearField('email')}
                        error={errors.email}
                        shaking={shakeField === 'email'}
                        required
                        maxLength={254}
                        autoComplete="email"
                        autoCapitalize="off"
                      />

                      {/* Phone: country code + number share one row and
                          one error message, so the pair reads as a
                          single field rather than two that disagree. */}
                      <div>
                        <div className="contact-phone-row" style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
                          <CountryCodeSelect value={countryCode} onChange={setCountryCode} error={errors.phone} />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <FormField
                              ref={registerField('phone')}
                              id="contact-phone"
                              name="phone"
                              label="Phone Number"
                              type="tel"
                              inputMode="tel"
                              value={formData.phone}
                              onChange={handleChange('phone')}
                              onFocus={handleFocus('phone')}
                              onBlur={handleBlur('phone')}
                              onClear={clearField('phone')}
                              error={errors.phone}
                              hint={!errors.phone && !formData.phone ? 'Digits only — e.g. 97145 71522' : ''}
                              shaking={shakeField === 'phone'}
                              required
                              maxLength={20}
                              autoComplete="tel"
                              autoCapitalize="off"
                            />
                          </div>
                        </div>
                      </div>

                      <FormField
                        ref={registerField('address')}
                        id="contact-address"
                        name="address"
                        label="Address / Location"
                        value={formData.address}
                        onChange={handleChange('address')}
                        onFocus={handleFocus('address')}
                        onClear={clearField('address')}
                        maxLength={160}
                        autoComplete="address-level2"
                      />

                      <div style={{ marginTop: '10px' }}>
                        <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
                          <legend style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', marginBottom: '16px', fontFamily: 'var(--font-mono)', padding: 0 }}>
                            PROJECT TYPE
                          </legend>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                            {PROJECT_TYPES.map((type) => {
                              const active = formData.type === type;
                              return (
                                <motion.button
                                  key={type}
                                  type="button"
                                  aria-pressed={active}
                                  whileTap={{ scale: 0.96 }}
                                  onClick={() => {
                                    handleFocus('type')();
                                    setFormData((prev) => ({ ...prev, type: active ? '' : type }));
                                  }}
                                  style={chipStyle(active)}
                                >
                                  {type}
                                </motion.button>
                              );
                            })}
                          </div>
                        </fieldset>
                      </div>

                      <AnimatePresence initial={false}>
                        {formData.type === 'Other' && (
                          <motion.div
                            key="other-type"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.32, ease: EASE }}
                            style={{ overflow: 'hidden' }}
                          >
                            <FormField
                              ref={registerField('otherType')}
                              id="contact-other-type"
                              name="otherType"
                              label="Please specify your project type"
                              value={formData.otherType}
                              onChange={handleChange('otherType')}
                              onFocus={handleFocus('otherType')}
                              onBlur={handleBlur('otherType')}
                              onClear={clearField('otherType')}
                              error={errors.otherType}
                              shaking={shakeField === 'otherType'}
                              required
                              maxLength={80}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div style={{ marginTop: '10px' }}>
                        <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
                          <legend style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', marginBottom: '12px', fontFamily: 'var(--font-mono)', padding: 0 }}>
                            PREFERRED CONTACT METHOD
                          </legend>
                          <div style={{ display: 'flex', gap: '12px' }}>
                            {['Email', 'Phone'].map((method) => {
                              const active = formData.contactMethod === method;
                              return (
                                <motion.button
                                  key={method}
                                  type="button"
                                  aria-pressed={active}
                                  whileTap={{ scale: 0.96 }}
                                  onClick={() => setFormData((prev) => ({ ...prev, contactMethod: method }))}
                                  style={chipStyle(active)}
                                >
                                  {method}
                                </motion.button>
                              );
                            })}
                          </div>
                        </fieldset>
                      </div>

                      <div style={{ marginTop: '10px' }}>
                        <FormField
                          ref={registerField('message')}
                          id="contact-message"
                          name="message"
                          label="Message / Project Brief"
                          multiline
                          rows={3}
                          value={formData.message}
                          onChange={handleChange('message')}
                          onFocus={handleFocus('message')}
                          onBlur={handleBlur('message')}
                          error={errors.message}
                          hint="Tell us about your project, timeline and goals."
                          maxLength={MESSAGE_MAX}
                          showValid={false}
                        />
                      </div>
                    </fieldset>

                    {/* Network failure — recoverable, with the entered
                        details still intact behind it. */}
                    <AnimatePresence initial={false}>
                      {status === 'error' && (
                        <motion.div
                          key="submit-error"
                          initial={{ opacity: 0, y: -8, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: 'auto' }}
                          exit={{ opacity: 0, y: -8, height: 0 }}
                          transition={{ duration: 0.3, ease: EASE }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div
                            role="alert"
                            style={{
                              padding: '18px 20px', background: 'rgba(239,68,68,0.08)',
                              border: '1px solid rgba(239,68,68,0.28)', borderRadius: 'var(--radius-md)',
                              color: '#f87171', fontSize: '0.9375rem', lineHeight: 1.65,
                            }}
                          >
                            <p style={{ marginBottom: '14px' }}>{statusMessage}</p>
                            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                              <button
                                type="button"
                                onClick={retry}
                                style={{
                                  padding: '9px 20px', borderRadius: 'var(--radius-full)',
                                  border: '1px solid rgba(239,68,68,0.45)', background: 'transparent',
                                  color: '#f87171', fontSize: '0.8125rem', fontFamily: 'var(--font-mono)',
                                  cursor: 'pointer', minHeight: '38px',
                                }}
                              >
                                ↻ Try again
                              </button>
                              <span style={{ color: 'rgba(255,255,255,0.48)', fontSize: '0.875rem' }}>
                                or email{' '}
                                <a href="mailto:info@manharcreatives.com" style={{ color: '#22C55E', textDecoration: 'underline' }}>
                                  info@manharcreatives.com
                                </a>
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div style={{ marginTop: '14px', padding: '20px 24px', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', background: 'rgba(255,255,255,0.03)' }}>
                      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9375rem', marginBottom: '6px', fontWeight: 500 }}>
                        Need more information before getting started?
                      </p>
                      <p style={{ color: 'rgba(255,255,255,0.48)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '16px' }}>
                        Download our Company Profile to explore our services and process.
                      </p>
                      <MagneticButton
                        as="a"
                        href="https://drive.google.com/uc?export=download&id=1RdGn0DZyyL_f2liZHFeJVqLUyYGWKSny"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackCta('Download Company Profile', 'contact_form')}
                        className="btn btn-secondary"
                        style={{ padding: '12px 28px', fontSize: '0.8125rem', width: 'fit-content', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '40px', color: 'rgba(255,255,255,0.85)', background: 'transparent' }}
                      >
                        ↓ Download Company Profile
                      </MagneticButton>
                    </div>

                    <div style={{ marginTop: '20px' }}>
                      <MagneticButton
                        type="submit"
                        disabled={busy}
                        onClick={() => !busy && trackCta('Send Inquiry', 'contact_form')}
                        className="btn btn-primary"
                        style={{ padding: '18px 40px', fontSize: '1rem', width: 'fit-content', minWidth: '212px' }}
                      >
                        {busy ? (
                          <>
                            <span className="mc-spinner mc-spinner--sm" aria-hidden="true" style={{ marginRight: 10 }} />
                            Sending…
                          </>
                        ) : (
                          <>
                            Send Inquiry
                            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" style={{ marginLeft: 8 }} aria-hidden="true">
                              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </>
                        )}
                      </MagneticButton>

                      <p style={{ marginTop: '14px', color: 'rgba(255,255,255,0.48)', fontSize: '0.8125rem', lineHeight: 1.6 }}>
                        We reply within 24 hours. Your details are never shared or sold.
                      </p>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
          </FadeIn>

        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
        .country-dropdown { animation: fadeIn 0.15s ease; }

        /* The country selector sits on the same baseline as the
           phone field, which now carries an 18px floating-label
           gutter above it. */
        .contact-phone-row > div:first-child > button { padding-bottom: 14px !important; }

        @media (max-width: 560px) {
          /* Stacked on narrow screens: 140px + a phone number in
             one row leaves about six characters visible. */
          .contact-phone-row { flex-direction: column !important; align-items: stretch !important; gap: 4px !important; }
          .contact-phone-row > div:first-child { width: 100% !important; }
          .contact-phone-row > div:first-child > button { width: 100% !important; }
          .country-dropdown { width: 100% !important; min-width: 260px; }
        }
        @media (max-width: 992px) {
          #contact { flex-direction: column !important; }
          .contact-info-panel { min-height: auto !important; padding: 60px 24px 40px !important; background-position: top !important; }
          .contact-info-panel > div:first-child { position: absolute !important; }
          .contact-info-content { position: relative !important; bottom: auto !important; left: auto !important; right: auto !important; }
          .contact-info-content h2 { margin-bottom: 32px !important; }
          .contact-info-content h2 br { display: none !important; }
          .contact-info-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .contact-form-container { padding: 60px 24px !important; }
        }
      `}</style>
    </section>
  );
}
