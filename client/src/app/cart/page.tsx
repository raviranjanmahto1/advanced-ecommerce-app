'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { addToCart, removeFromCart } from '@/lib/redux/slices/cartSlice';
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
          <div className="p-4 bg-muted rounded-md text-muted-foreground">
            Your cart is empty <Link href="/" className="text-primary hover:underline font-medium">Go Back</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="w-16 h-16 bg-muted rounded flex items-center justify-center text-xs">Image</div>
                  <Link href={`/product/${item._id}`} className="font-medium hover:underline flex-1">
                    {item.name}
                  </Link>
                </div>
                <div className="w-24 text-center font-bold">${item.price}</div>
                <div className="w-24">
                  <select
                    value={item.qty}
                    onChange={(e) => dispatch(addToCart({ ...item, qty: Number(e.target.value) }))}
                    className="w-full p-2 border rounded-md bg-background cursor-pointer"
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-16 text-right">
                  <button
                    onClick={() => dispatch(removeFromCart(item._id))}
                    className="p-2 border border-red-200 text-red-500 bg-background hover:bg-red-50 dark:hover:bg-red-950/30 rounded-md transition-colors cursor-pointer"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="md:col-span-1">
        <div className="border rounded-lg p-6 bg-card text-card-foreground shadow-sm">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Items:</span>
            <span>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span>
          </div>
          <div className="flex justify-between mb-4 font-bold text-lg border-b pb-4">
            <span>Total:</span>
            <span>${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</span>
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
