'use client';

import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { addToCart, removeFromCart } from '@/lib/redux/slices/cartSlice';
import { Plus, Minus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProductCard({ product }: { product: any }) {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state: RootState) => state.cart);
  
  const cartItem = cartItems.find(item => item._id === product._id);
  const qtyInCart = cartItem ? cartItem.qty : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(addToCart({ ...product, qty: 1 }));
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    if (qtyInCart < product.countInStock) {
      dispatch(addToCart({ ...product, qty: qtyInCart + 1 }));
    }
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    if (qtyInCart > 1) {
      dispatch(addToCart({ ...product, qty: qtyInCart - 1 }));
    } else {
      dispatch(removeFromCart(product._id));
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="group border rounded-md overflow-hidden flex flex-col bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-200 relative"
    >
      
      <Link href={`/product/${product._id}`} className="block relative aspect-square w-full overflow-hidden bg-muted">
         {product.image ? (
           <img 
             src={product.image.startsWith('http') ? product.image : `${process.env.NEXT_PUBLIC_API_URL || 'https://advanced-ecommerce-app-api-raviranjan.vercel.app'}${product.image}`}
             alt={product.name}
             className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
             onError={(e) => {
               (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/png?text=No+Image';
             }}
           />
         ) : (
           <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
             <span className="text-xs text-center p-2">Image: {product.name}</span>
           </div>
         )}
      </Link>
      <div className="p-3 flex flex-col flex-grow">
        <Link href={`/product/${product._id}`}>
          <h3 className="text-sm md:text-base font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-2 leading-tight">{product.name}</h3>
        </Link>
        <div className="text-[10px] sm:text-xs text-muted-foreground mb-2 flex items-center">
           <span className="text-yellow-500 mr-1">★</span> {product.rating} <span className="hidden sm:inline">({product.numReviews})</span>
        </div>
        <div className="flex items-center justify-between mt-auto pt-2 border-t">
          <span className="text-base md:text-lg font-bold">${product.price}</span>
          
          <div className="flex items-center">
            {qtyInCart === 0 ? (
              <button 
                onClick={handleAddToCart}
                disabled={product.countInStock === 0}
                className="w-8 h-8 rounded-md border border-input flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed bg-background"
                aria-label="Add to cart"
              >
                <Plus size={16} />
              </button>
            ) : (
              <div className="flex items-center bg-background border border-input rounded-md shadow-sm overflow-hidden h-8">
                <button 
                  onClick={handleDecrement}
                  className="w-7 h-full flex items-center justify-center hover:bg-accent hover:text-accent-foreground cursor-pointer"
                >
                  <Minus size={14} />
                </button>
                <span className="text-xs font-bold w-6 text-center border-x border-input h-full flex items-center justify-center">{qtyInCart}</span>
                <button 
                  onClick={handleIncrement}
                  disabled={qtyInCart >= product.countInStock}
                  className="w-7 h-full flex items-center justify-center hover:bg-accent hover:text-accent-foreground cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
