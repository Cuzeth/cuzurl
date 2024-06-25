import './globals.css';

export const metadata = {
  title: 'URL Shortener',
  description: 'A simple URL shortener built with Next.js and TypeScript.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}