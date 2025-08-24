// Server-side message loading for static export
export const locales = ['en', 'fr'] as const;
export type Locale = typeof locales[number];

// Server-compatible static message loading
export async function getStaticMessages(locale: string) {
  try {
    const messages = await import(`../../messages/${locale}.json`);
    return messages.default;
  } catch (error) {
    // Fallback to English if locale not found
    const messages = await import(`../../messages/en.json`);
    return messages.default;
  }
}
