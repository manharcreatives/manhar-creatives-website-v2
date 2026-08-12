import { forwardRef, useState, useId, useCallback } from 'react';

/* ═══════════════════════════════════════════════════════════
   FORM FIELD

   One component covering the whole state machine of a text
   input: empty → typing → filled → valid → invalid, plus focus
   and the clear affordance.

   Design decisions worth stating:

   • Floating label, not a placeholder. A placeholder disappears
     the moment someone types, so a half-filled form becomes a
     column of unlabelled boxes — the single most common cause
     of people entering the right thing in the wrong field.

   • Validation messages appear on blur, not on keystroke. Being
     told "invalid email" after typing the letter "a" is scolding
     someone for not having finished yet.

   • Once a field has been marked invalid it *does* revalidate on
     every keystroke, so the error clears the instant it is fixed.

   • Errors are wired with aria-describedby and role="alert" so
     they are announced, not just coloured red.
   ═══════════════════════════════════════════════════════════ */

const ClearIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const CheckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const AlertIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const FormField = forwardRef(function FormField(
  {
    id,
    name,
    label,
    value = '',
    onChange,
    onBlur,
    onFocus,
    onClear,
    type = 'text',
    required = false,
    error = '',
    hint = '',
    /** show a tick once the field has content and no error */
    showValid = true,
    shaking = false,
    multiline = false,
    rows = 3,
    maxLength,
    /** counter appears once this fraction of maxLength is used */
    counterAt = 0.6,
    inputMode,
    autoComplete,
    autoCapitalize,
    disabled = false,
    className = '',
    style = {},
    children,
  },
  ref
) {
  const reactId = useId();
  const fieldId = id || `f-${reactId}`;
  const errorId = `${fieldId}-error`;
  const hintId = `${fieldId}-hint`;

  const [focused, setFocused] = useState(false);

  const filled = String(value ?? '').length > 0;
  const floating = focused || filled;
  const invalid = Boolean(error);
  const valid = showValid && filled && !invalid && !focused;

  const handleFocus = useCallback((e) => { setFocused(true); onFocus?.(e); }, [onFocus]);
  const handleBlur = useCallback((e) => { setFocused(false); onBlur?.(e); }, [onBlur]);

  const classes = [
    'mc-field',
    floating && 'is-floating',
    focused && 'is-focused',
    filled && 'is-filled',
    invalid && 'is-invalid',
    valid && 'is-valid',
    shaking && 'is-shaking',
    className,
  ].filter(Boolean).join(' ');

  const describedBy = [invalid && errorId, hint && hintId].filter(Boolean).join(' ') || undefined;

  const shared = {
    id: fieldId,
    name: name || fieldId,
    value: value ?? '',
    onChange,
    onFocus: handleFocus,
    onBlur: handleBlur,
    required,
    disabled,
    maxLength,
    inputMode,
    autoComplete,
    autoCapitalize,
    'aria-invalid': invalid || undefined,
    'aria-describedby': describedBy,
    'aria-required': required || undefined,
    className: 'mc-field__input',
    placeholder: label,
  };

  const used = String(value ?? '').length;
  const showCounter = Boolean(maxLength) && used >= maxLength * counterAt;
  const counterClass = [
    'mc-field__counter',
    used >= maxLength ? 'is-over' : used >= maxLength * 0.9 ? 'is-near' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} style={style}>
      <label htmlFor={fieldId} className="mc-field__label">
        {label}
        {required && <span aria-hidden="true" style={{ color: 'var(--color-primary)', marginLeft: '3px' }}>*</span>}
      </label>

      {multiline ? (
        <textarea
          {...shared}
          ref={ref}
          rows={rows}
          style={{ resize: 'vertical', minHeight: `${rows * 26}px`, paddingRight: '34px' }}
        />
      ) : (
        <input {...shared} ref={ref} type={type} />
      )}

      <span className="mc-field__adornment">
        {valid && <span className="mc-field__check"><CheckIcon /></span>}
        {filled && !disabled && onClear && (
          <button
            type="button"
            className="mc-field__clear"
            onClick={onClear}
            tabIndex={-1}
            aria-label={`Clear ${label}`}
            title={`Clear ${label}`}
          >
            <ClearIcon />
          </button>
        )}
      </span>

      {/* Message row: error takes priority, then hint, and the
          character counter sits opposite whichever is showing. */}
      {(invalid || hint || showCounter) && (
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '14px', marginTop: invalid ? 0 : '7px' }}>
          <span style={{ flex: 1, minWidth: 0 }}>
            {invalid ? (
              <span id={errorId} role="alert" className="mc-field__msg">
                <AlertIcon />
                {error}
              </span>
            ) : hint ? (
              <span id={hintId} style={{ fontSize: '0.7813rem', color: 'rgba(255,255,255,0.48)', lineHeight: 1.5 }}>
                {hint}
              </span>
            ) : null}
          </span>
          {showCounter && (
            <span className={counterClass} aria-hidden="true" style={{ flexShrink: 0 }}>
              {used}/{maxLength}
            </span>
          )}
        </div>
      )}

      {children}
    </div>
  );
});

export default FormField;
