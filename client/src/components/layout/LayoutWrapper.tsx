'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Define all routes that should NOT have the standard Navbar and Footer
  const noLayoutRoutes = ['/cart', '/wishlist', '/search', '/shipping', '/payment', '/placeorder'];
  const isNoLayout = noLayoutRoutes.includes(pathname);

  return (
    <>
      {!isNoLayout && <Navbar />}
      <main className={`container mx-auto ${isNoLayout ? 'px-0 sm:px-4 py-0' : 'px-0 sm:px-4 py-0 sm:py-4'} min-h-[70vh]`}>
        {children}
      </main>
      {!isNoLayout && <Footer />}
    </>
  );
}
