import { Metadata, Viewport } from 'next';
import './globals.css';
import Provider from './session';

export const metadata: Metadata = {
  title: "Personal URL Shortener | Cuzeth",
  description: "A simple URL Shortener built with Next.JS and TypeScript.",
  metadataBase: new URL("https://s.cuzeth.com"),
  icons: [
    { rel: "icon", url: "/favicon.ico?v=3" },
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png?v=3", sizes: "180x180" },
    { rel: "icon", url: "/favicon-32x32.png?v=3", type: "image/png", sizes: "32x32" },
    { rel: "icon", url: "/favicon-16x16.png?v=3", type: "image/png", sizes: "16x16" },
    { rel: "manifest", url: "/site.webmanifest?v=3" },
    { rel: "mask-icon", url: "/safari-pinned-tab.svg?v=3", color: "#dc1616" },
  ],
  openGraph: {
    type: "website",
    url: "https://s.cuzeth.com/",
    title: "Personal URL Shortener | Cuzeth",
    description: "A simple URL Shortener built with Next.JS and TypeScript.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Personal URL Shortener | Cuzeth",
    description: "A simple URL Shortener built with Next.JS and TypeScript.",
  },
  authors: [
    {
      name: "Cuzeth",
      url: "https://s.cuzeth.com",
    },
  ],
  manifest: "/site.webmanifest?v=3",
};

export const viewport: Viewport = {
  // width: 'device-width',
  // initialScale: 1,
  themeColor: [
    { color: "#0b0b0b" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}