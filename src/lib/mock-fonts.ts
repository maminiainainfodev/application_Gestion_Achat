/**
 * Mock font implementation for CI/CD environments where external
 * network requests (like Google Fonts) may fail.
 */
export const inter = {
  className: "inter-fallback",
  style: {
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif",
  },
  variable: "--font-inter",
};
