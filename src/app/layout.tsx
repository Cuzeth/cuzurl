import { Metadata } from 'next';
import './globals.css';
import Provider from './session';

export const metadata: Metadata = {
  title: "Personal URL Shortener | Cuzeth",
  description: "A simple URL Shortener built with Next.JS and TypeScript.",
  metadataBase: new URL("https://s.cuzeth.com"),
  icons: [
    { rel: "icon", url: "/favicon.ico?v=1" },
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png?v=1", sizes: "180x180" },
    { rel: "icon", url: "/favicon-32x32.png?v=1", type: "image/png", sizes: "32x32" },
    { rel: "icon", url: "/favicon-16x16.png?v=1", type: "image/png", sizes: "16x16" },
    { rel: "manifest", url: "/site.webmanifest?v=1" },
    { rel: "mask-icon", url: "/safari-pinned-tab.svg?v=1", color: "#dc1616" },
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
  manifest: "/site.webmanifest?v=1",
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