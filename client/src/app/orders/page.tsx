'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { apiSlice } from '@/lib/redux/slices/apiSlice';
import Loader from '@/components/ui/Loader';
import { Package, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyOrders: builder.query<any[], void>({
      query: () => '/api/orders/myorders',
    }),
  }),
});

const { useGetMyOrdersQuery } = extendedApi;

export default function MyOrdersPage() {
  const router = useRouter();
  const { userInfo } = useSelector((state: RootState) => state.auth);
  
  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
    }
  }, [router, userInfo]);

  const { data: orders, isLoading, error } = useGetMyOrdersQuery(undefined, {
    skip: !userInfo,
  });

  if (isLoading) return <Loader text="Loading your orders..." />;
  if (!userInfo) return null;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 min-h-[60vh]">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">My Orders</h1>
      
      {error ? (
        <div className="bg-red-50 dark:bg-red-950/20 text-red-500 p-4 rounded-md border border-red-200">
          Failed to load orders.
        </div>
      ) : !orders || orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 bg-muted/30 rounded-xl border border-dashed text-center">
          <Package size={48} className="mb-4 text-muted-foreground opacity-20" />
          <h2 className="text-xl font-medium mb-2">No orders found</h2>
          <p className="text-sm text-muted-foreground mb-6">You haven't placed any orders yet.</p>
          <Link href="/products" className="bg-primary text-primary-foreground px-6 py-2.5 rounded-md font-medium hover:opacity-90 transition-opacity">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="border border-border rounded-lg bg-card overflow-hidden">
              <div className="bg-muted/50 p-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex gap-6 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-0.5">Order Placed</p>
                    <p className="font-medium">{order.createdAt.substring(0, 10)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-0.5">Total</p>
                    <p className="font-medium">${order.totalPrice.toFixed(2)}</p>
                  </div>
                </div>
                <div className="text-sm">
                  <p className="text-muted-foreground mb-0.5 text-right sm:text-left">Order ID</p>
                  <p className="font-mono">{order._id}</p>
                </div>
              </div>
              <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    order.isDelivered ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                  }`}>
                    {order.isDelivered ? 'Delivered' : 'Processing'}
                  </span>
                  <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    order.isPaid ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {order.isPaid ? 'Paid' : 'Not Paid'}
                  </span>
                </div>
                <button className="flex items-center text-sm font-medium text-primary hover:underline">
                  View Details <ExternalLink size={14} className="ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
