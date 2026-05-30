import './globals.css';
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
});

export const metadata = {
  title: 'Sachin Kumar Singh — AI & Full-Stack Developer',
  description: 'Portfolio of Sachin Kumar Singh, a B.Tech CSE student specializing in AI/ML and full-stack product development.',
  keywords: ['Sachin Kumar Singh', 'AI Developer', 'Full Stack', 'Machine Learning', 'Portfolio', 'Next.js'],
  authors: [{ name: 'Sachin Kumar Singh' }],
  openGraph: {
    title: 'Sachin Kumar Singh — AI & Full-Stack Developer',
    description: 'Portfolio of Sachin Kumar Singh — B.Tech CSE student specializing in AI/ML and full-stack product development.',
    type: 'website',
    url: process.env.NEXT_PUBLIC_SITE_URL,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
      </head>
      <body className={`${inter.variable} ${playfair.variable}`}>
        {children}
      </body>
    </html>
  );
}
