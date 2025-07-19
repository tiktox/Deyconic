import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Deyconic',
  description: 'Somos una institución que ofrece servicios digitales y físicos a empresas que no tienen presencia en redes sociales o no cuentan con una plataforma profesional que los posicione en los motores de búsqueda.',
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