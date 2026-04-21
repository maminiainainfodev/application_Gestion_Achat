import { Inter } from "next/font/google";

const interReal = Inter({
  subsets: ["latin"],
  display: "swap",
});

const interMock = {
  className: "inter-fallback",
  style: {
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif",
  },
  variable: "--font-inter",
};

export const inter = process.env.USE_MOCK_DB === 'true' ? interMock : interReal;
