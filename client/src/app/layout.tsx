import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import StoreProvider from '@/lib/redux/StoreProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'E-Commerce Advanced',
  description: 'Advanced e-commerce app built with Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background font-sans antialiased`}>
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className="container mx-auto px-0 sm:px-4 py-0 sm:py-4 min-h-[70vh]">
              {children}
            </main>
          </ThemeProvider>
        <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
