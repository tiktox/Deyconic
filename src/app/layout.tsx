import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Deyconic',
  description: 'Somos una institución que ofrece servicios digitales y físicos a empresas que no tienen presencia en redes sociales o no cuentan con una plataforma profesional que los posicione en los motores de búsqueda.',
  keywords: 'desarrollo web, marketing digital, innovación, tecnología, digitalización empresarial',
  authors: [{ name: 'Deyconic' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  icons: {
    icon: '/favicon.ico',
  },
}
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import ClientLayoutWrapper from '@/components/client-layout-wrapper';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

const lightLogoUrl = "https://ik.imagekit.io/ajkl5a98u/logo_1000x1000-removebg-preview.png?updatedAt=1746469003137";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://ik.imagekit.io" />
        <link rel="preconnect" href="https://videos.pexels.com" />
        <link rel="dns-prefetch" href="https://ik.imagekit.io" />
        <link rel="dns-prefetch" href="https://videos.pexels.com" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('error', function(e) {
                if (e.message && e.message.includes('extension')) {
                  e.preventDefault();
                }
              });
              window.addEventListener('unhandledrejection', function(e) {
                if (e.reason && e.reason.message && e.reason.message.includes('extension')) {
                  e.preventDefault();
                }
              });
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-secondary`}>
        <ClientLayoutWrapper>
          <main className="min-h-[calc(100vh-0rem)]">
            {children}
          </main>
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}