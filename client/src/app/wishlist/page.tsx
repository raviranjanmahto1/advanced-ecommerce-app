'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import ProductCard from '@/components/ui/ProductCard';
import Link from 'next/link';
import { Heart, X, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { toggleWishlist } from '@/lib/redux/slices/wishlistSlice';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function WishlistPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { wishlistItems } = useSelector((state: RootState) => state.wishlist);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Custom Header */}
      <div className="sticky top-0 z-50 flex items-center justify-between p-4 bg-background border-b shadow-sm mb-4 md:mb-8">
        <div className="container mx-auto px-0 sm:px-4">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center">
              <Heart className="mr-2 text-primary" size={20} />
              <h1 className="text-xl font-bold tracking-tighter">My Wishlist</h1>
              <span className="text-sm font-normal text-muted-foreground ml-2">({wishlistItems.length})</span>
            </div>
            <button 
              onClick={() => router.back()}
              className="p-1.5 md:p-2 border border-input bg-background rounded-md hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
              aria-label="Close Wishlist"
            >
              <X size={18} className="md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </div>
      
<<<<<<< HEAD
      <div className="container mx-auto px-3 sm:px-4 flex-1 pb-10">
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 px-2 sm:px-0">
        {wishlistItems.map((product: any) => (
          <div key={product._id} className="relative group/wishlist">
            <button 
              onClick={() => { dispatch(toggleWishlist(product)); toast.success('Removed from wishlist'); }}
              className="absolute top-2 right-2 z-20 w-8 h-8 rounded-md bg-background/80 backdrop-blur-sm border border-red-200 text-red-500 flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer shadow-sm md:opacity-0 md:group-hover/wishlist:opacity-100"
              aria-label="Remove from wishlist"
            >
              <Trash2 size={16} />
            </button>
            <ProductCard product={product} />
          </div>
=======
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 px-2 sm:px-0">
        {wishlistItems.map((product) => (
          <ProductCard key={product._id} product={product} />
>>>>>>> a8a4686 (feat(admin, client): fix admin dashboard overflow and compact cart/wishlist layouts)
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
    </div>
  );
}
