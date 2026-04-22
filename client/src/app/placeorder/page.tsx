'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { clearCartItems } from '@/lib/redux/slices/cartSlice';
import { apiSlice } from '@/lib/redux/slices/apiSlice';
import Link from 'next/link';
import { toast } from 'sonner';
import Loader from '@/components/ui/Loader';

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<any, any>({
      query: (order) => ({
        url: '/api/orders',
        method: 'POST',
        body: order,
      }),
    }),
  }),
});

const { useCreateOrderMutation } = extendedApi;

export default function PlaceOrderPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      router.push('/shipping');
    } else if (!cart.paymentMethod) {
      router.push('/payment');
    }
  }, [cart.shippingAddress, cart.paymentMethod, router]);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  // Calculate prices
  const itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Number((0.08 * itemsPrice).toFixed(2));
  const totalPrice = Number((itemsPrice + shippingPrice + taxPrice).toFixed(2));

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      }).unwrap();
      
      dispatch(clearCartItems());
      toast.success('Order placed successfully!');
      router.push('/orders');
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to place order');
    }
  };

  if (cart.cartItems.length === 0) {
    return <div className="text-center py-20">Your cart is empty</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex items-center mb-8 space-x-2 max-w-md mx-auto">
        <div className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-bold">1</div>
        <span className="font-medium text-sm text-primary">Shipping</span>
        <div className="flex-1 h-px bg-primary/50"></div>
        <div className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-bold">2</div>
        <span className="font-medium text-sm text-primary">Payment</span>
        <div className="flex-1 h-px bg-primary/50"></div>
        <div className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-bold">3</div>
        <span className="font-medium text-sm">Review</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-lg p-5 shadow-sm">
            <h2 className="text-lg font-bold mb-3">Shipping Details</h2>
            <p className="text-muted-foreground text-sm">
              <span className="font-medium text-foreground">Address: </span>
              {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-5 shadow-sm">
            <h2 className="text-lg font-bold mb-3">Payment Method</h2>
            <p className="text-muted-foreground text-sm">
              <span className="font-medium text-foreground">Method: </span>
              {cart.paymentMethod}
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-5 shadow-sm">
            <h2 className="text-lg font-bold mb-4">Order Items</h2>
            <div className="space-y-3">
              {cart.cartItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-muted rounded-md overflow-hidden border border-border">
                      <img src={item.image.startsWith('http') ? item.image : `${process.env.NEXT_PUBLIC_API_URL || 'https://advanced-ecommerce-app-api-raviranjan.vercel.app'}${item.image}`} alt={item.name} className="object-cover w-full h-full" />
                    </div>
                    <Link href={`/product/${item._id}`} className="text-sm font-medium hover:text-primary transition-colors line-clamp-1">
                      {item.name}
                    </Link>
                  </div>
                  <div className="text-sm font-medium text-right shrink-0">
                    {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="bg-card border border-border rounded-lg p-5 shadow-sm sticky top-24">
            <h2 className="text-lg font-bold mb-4 border-b border-border pb-3">Order Summary</h2>
            
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between text-muted-foreground">
                <span>Items</span>
                <span>${itemsPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>${shippingPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Tax</span>
                <span>${taxPrice.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="flex justify-between font-bold text-lg border-t border-border pt-3 mb-6">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            {error && <div className="text-red-500 text-sm mb-4">Failed to place order.</div>}

            <button
              onClick={placeOrderHandler}
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground py-2.5 rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center"
            >
              {isLoading ? <Loader /> : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
