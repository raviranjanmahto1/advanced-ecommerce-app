'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { addToCart, removeFromCart } from '@/lib/redux/slices/cartSlice';
import { Plus, Minus, ShoppingCart, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import Loader from '@/components/ui/Loader';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const router = useRouter();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state: RootState) => state.cart);

  const checkoutHandler = () => {
    router.push('/shipping');
  };

  if (!isMounted) return <Loader text="Loading your cart..." />;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Custom Cart Header */}
      <div className="sticky top-0 z-50 bg-background border-b shadow-sm mb-4 md:mb-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-12">
            <h1 className="text-xl font-bold tracking-tighter">Shopping Cart</h1>
            <button 
              onClick={() => router.back()}
              className="p-1.5 md:p-2 border border-input bg-background rounded-md hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
              aria-label="Close Cart"
            >
              <X size={18} className="md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto flex flex-col md:flex-row gap-4 md:gap-8 px-0 sm:px-4 flex-1 pb-48 md:pb-10 relative">
      <div className="w-full md:w-2/3 flex-shrink-0">
        <div className="space-y-0">
            {cartItems.map((item: any) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                key={item._id} 
                className="flex items-center justify-between border-b border-border p-3 md:rounded-md md:border md:shadow-sm md:mb-3 bg-card"
              >
                
                <div className="flex flex-col sm:flex-row sm:items-center w-full gap-1 sm:gap-4 justify-between">
                  
                  {/* Top Row: Image, Name, Delete */}
                  <div className="flex items-start justify-between w-full sm:w-auto sm:flex-1">
                    <div className="flex items-start gap-3 flex-1 overflow-hidden pr-2">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-muted rounded-sm flex shrink-0 items-center justify-center text-xs overflow-hidden border border-border">
                        <img src={item.image.startsWith('http') ? item.image : `${'https://advanced-ecommerce-app-api-raviranjan.vercel.app'}${item.image}`} alt={item.name} className="object-cover w-full h-full" />
                      </div>
                      <Link href={`/product/${item._id}`} className="font-medium text-sm hover:text-primary transition-colors line-clamp-2 pt-1">
                        {item.name}
                      </Link>
                    </div>
                    
                    <button
                      onClick={() => { dispatch(removeFromCart(item._id)); toast.info('Item removed from cart'); }}
                      className="p-1.5 border border-red-200 text-red-500 bg-background hover:bg-red-50 dark:hover:bg-red-950/30 rounded-md transition-colors cursor-pointer shrink-0"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  
                  {/* Bottom Row: Price and Qty */}
                  <div className="flex items-center justify-between w-full sm:w-auto pl-[76px] sm:pl-0 gap-4">
                    <div className="text-base font-bold w-20 sm:text-right">${item.price}</div>
                    
                    <div className="flex items-center bg-background border border-input rounded-md shadow-sm overflow-hidden h-7">
                      <button 
                        onClick={() => dispatch(addToCart({ ...item, qty: item.qty - 1 }))}
                        disabled={item.qty <= 1}
                        className="w-8 h-full flex items-center justify-center hover:bg-accent hover:text-accent-foreground cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-xs font-bold w-8 text-center border-x border-input h-full flex items-center justify-center">{item.qty}</span>
                      <button 
                        onClick={() => dispatch(addToCart({ ...item, qty: item.qty + 1 }))}
                        disabled={item.qty >= item.countInStock}
                        className="w-8 h-full flex items-center justify-center hover:bg-accent hover:text-accent-foreground cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                  
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="w-full md:w-1/3 fixed bottom-0 left-0 right-0 z-40 md:relative md:z-auto bg-background md:bg-transparent border-t md:border-t-0 p-4 md:p-0 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] md:shadow-none">
        <div className="border border-border rounded-lg p-4 bg-card text-card-foreground shadow-sm">
          <h2 className="text-lg font-semibold mb-3 border-b pb-2 hidden md:block">Order Summary</h2>
          <div className="hidden md:block">
            <div className="flex justify-between mb-2 text-sm text-muted-foreground">
              <span>Subtotal:</span>
              <span>${cartItems.reduce((acc: any, item: any) => acc + item.qty * item.price, 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2 text-sm text-muted-foreground">
              <span>Items ({cartItems.reduce((acc: any, item: any) => acc + item.qty, 0)}):</span>
              <span>${cartItems.reduce((acc: any, item: any) => acc + item.qty * item.price, 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2 text-sm text-muted-foreground">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between mb-2 text-sm text-muted-foreground">
              <span>Tax (Estimated):</span>
              <span>${(cartItems.reduce((acc: any, item: any) => acc + item.qty * item.price, 0) * 0.08).toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-3 text-sm text-muted-foreground border-b pb-3">
              <span>Platform Fee:</span>
              <span>$2.99</span>
            </div>
            
            <div className="mb-3">
              <div className="flex">
                <input type="text" placeholder="Coupon code" className="w-full p-1.5 px-2 border border-input rounded-l-md bg-background text-sm outline-none focus:border-primary" />
                <button className="bg-secondary text-secondary-foreground px-3 py-1.5 rounded-r-md text-sm font-medium border border-l-0 border-input hover:bg-secondary/80 transition-colors cursor-pointer">Apply</button>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-3 font-bold text-lg md:text-xl border-b pb-2 md:pb-3">
            <span>Items:</span>
            <span>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span>
          </div>
          <div className="flex justify-between mb-4 font-bold text-lg border-b pb-4">
            <span>Total:</span>
            <span>${(cartItems.reduce((acc: any, item: any) => acc + item.qty * item.price, 0) * 1.08 + 2.99).toFixed(2)}</span>
          </div>
          <button
            onClick={checkoutHandler}
            disabled={cartItems.length === 0}
            className="w-full bg-primary text-primary-foreground py-3 rounded-md font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-opacity"
          >
            Proceed To Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
  );
}
