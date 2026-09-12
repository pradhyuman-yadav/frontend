/**
 * Inline notice for content that failed to load.
 *
 * Rendered as a quiet inline alert rather than a full-page error block: the
 * page still shows fallback content behind it, so shouting is misleading.
 */
const ErrorMessage = ({
  message = 'Some content could not be loaded.',
  tone = 'info',
}) => (
  <div className={`alert alert-${tone}`} role="status" aria-live="polite">
    <span>{message}</span>
  </div>
);

export default ErrorMessage;
