'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import ProductCard from '@/components/ui/ProductCard';
import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function WishlistPage() {
  const { wishlistItems } = useSelector((state: RootState) => state.wishlist);

  return (
    <div className="pb-10 pt-4 min-h-[60vh]">
      <div className="flex items-center mb-6 md:mb-8 px-2 sm:px-0">
        <Heart className="mr-3 text-primary" size={28} />
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">My Wishlist</h1>
        <span className="text-sm font-normal text-muted-foreground ml-3">({wishlistItems.length} items)</span>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 px-2 sm:px-0">
        {wishlistItems.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
        
        {wishlistItems.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center text-muted-foreground py-20 bg-muted/30 rounded-xl border border-dashed mx-2 sm:mx-0">
            <Heart size={48} className="mb-4 opacity-20" />
            <p className="text-xl font-medium mb-2">Your wishlist is empty</p>
            <p className="text-sm mb-6">Save items you love to view them later.</p>
            <Link href="/products" className="bg-primary text-primary-foreground px-6 py-2.5 rounded-md font-medium hover:opacity-90 transition-opacity">
              Explore Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
