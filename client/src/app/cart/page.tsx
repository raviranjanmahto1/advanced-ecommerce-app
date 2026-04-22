'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { addToCart, removeFromCart } from '@/lib/redux/slices/cartSlice';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state: RootState) => state.cart);

  const checkoutHandler = () => {
    router.push('/login?redirect=shipping');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-16 bg-muted/30 rounded-xl border border-dashed text-center"
        >
          <ShoppingCart size={48} className="mb-4 text-muted-foreground opacity-20" />
          <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
          <p className="text-sm text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link href="/products" className="bg-primary text-primary-foreground px-6 py-2.5 rounded-md font-medium hover:opacity-90 transition-opacity">
            Explore Products
          </Link>
        </motion.div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                key={item._id} 
                className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 gap-4"
              >
                <div className="flex items-center space-x-4 flex-1">
                  <div className="w-20 h-20 sm:w-16 sm:h-16 bg-muted rounded-md flex shrink-0 items-center justify-center text-xs overflow-hidden border border-border">
                    <img src={item.image.startsWith('http') ? item.image : `${'https://advanced-ecommerce-app-api-raviranjan.vercel.app'}${item.image}`} alt={item.name} className="object-cover w-full h-full" />
                  </div>
                  <Link href={`/product/${item._id}`} className="font-medium hover:text-primary transition-colors flex-1 line-clamp-2 sm:line-clamp-1">
                    {item.name}
                  </Link>
                </div>
                
                <div className="flex items-center justify-between sm:justify-end sm:space-x-6 w-full sm:w-auto">
                  <div className="text-lg font-bold w-24 sm:text-center">${item.price}</div>
                  
                  <div className="flex items-center bg-background border border-input rounded-md shadow-sm overflow-hidden h-8">
                    <button 
                      onClick={() => dispatch(addToCart({ ...item, qty: item.qty - 1 }))}
                      disabled={item.qty <= 1}
                      className="w-8 h-full flex items-center justify-center hover:bg-accent hover:text-accent-foreground cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-xs font-bold w-8 text-center border-x border-input h-full flex items-center justify-center">{item.qty}</span>
                    <button 
                      onClick={() => dispatch(addToCart({ ...item, qty: item.qty + 1 }))}
                      disabled={item.qty >= item.countInStock}
                      className="w-8 h-full flex items-center justify-center hover:bg-accent hover:text-accent-foreground cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  
                  <div className="w-auto sm:w-12 text-right">
                    <button
                      onClick={() => dispatch(removeFromCart(item._id))}
                      className="p-2 border border-red-200 text-red-500 bg-background hover:bg-red-50 dark:hover:bg-red-950/30 rounded-md transition-colors cursor-pointer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      
      <div className="md:col-span-1">
        <div className="border rounded-lg p-6 bg-card text-card-foreground shadow-sm">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Order Summary</h2>
          <div className="flex justify-between mb-2 text-muted-foreground">
            <span>Items ({cartItems.reduce((acc: any, item: any) => acc + item.qty, 0)}):</span>
            <span>${cartItems.reduce((acc: any, item: any) => acc + item.qty * item.price, 0).toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2 text-muted-foreground">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between mb-4 text-muted-foreground border-b pb-4">
            <span>Platform Fee:</span>
            <span>$2.99</span>
          </div>
          
          <div className="mb-4">
            <div className="flex">
              <input type="text" placeholder="Coupon code" className="w-full p-2 border border-input rounded-l-md bg-background text-sm outline-none focus:border-primary" />
              <button className="bg-secondary text-secondary-foreground px-3 py-2 rounded-r-md text-sm font-medium border border-l-0 border-input hover:bg-secondary/80 transition-colors">Apply</button>
            </div>
          </div>
          
          <div className="flex justify-between mb-6 font-bold text-xl">
            <span>Items:</span>
            <span>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span>
          </div>
          <div className="flex justify-between mb-4 font-bold text-lg border-b pb-4">
            <span>Total:</span>
            <span>${(cartItems.reduce((acc: any, item: any) => acc + item.qty * item.price, 0) + 2.99).toFixed(2)}</span>
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
  );
}
