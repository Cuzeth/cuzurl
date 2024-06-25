import './globals.css';
import Provider from './session';

export const metadata = {
  title: 'URL Shortener',
  description: 'A simple URL shortener built with Next.js and TypeScript.',
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