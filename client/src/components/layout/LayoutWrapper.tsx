'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isCart = pathname === '/cart';

  return (
    <>
      {!isCart && <Navbar />}
      <main className={`container mx-auto ${isCart ? 'px-0 sm:px-4 py-0' : 'px-0 sm:px-4 py-0 sm:py-4'} min-h-[70vh]`}>
        {children}
      </main>
      {!isCart && <Footer />}
    </>
  );
}
