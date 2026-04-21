'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import StoreProvider from '@/lib/redux/StoreProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { useState, useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close sidebar when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Admin Portal - E-Commerce</title>
        <meta name="description" content="Advanced admin portal" />
      </head>
      <body className={`${inter.className} min-h-screen bg-background font-sans antialiased`}>
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex h-screen overflow-hidden">
              <Sidebar 
                isOpen={isSidebarOpen} 
                onClose={() => setIsSidebarOpen(false)} 
              />
              <div className="flex-1 md:ml-64 flex flex-col overflow-hidden w-full">
                <Header onMenuClick={() => setIsSidebarOpen(true)} />
                <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-muted/30">
                  {children}
                </main>
              </div>
            </div>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
