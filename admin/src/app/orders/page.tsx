'use client';

import { useGetOrdersQuery, useDeliverOrderMutation } from '@/lib/redux/adminApiSlice';
import { ShoppingCart, CheckCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminOrdersPage() {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  const [deliverOrder, { isLoading: isDelivering }] = useDeliverOrderMutation();

  const handleDeliver = async (id: string) => {
    try {
      await deliverOrder(id).unwrap();
      toast.success('Order marked as delivered');
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to update order');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Orders</h1>
      </div>

      <div className="rounded-md border bg-card text-card-foreground shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center flex flex-col items-center text-muted-foreground">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
            Loading orders...
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-500 bg-red-50 dark:bg-red-950/20 m-4 rounded-lg">Error loading orders. Check backend.</div>
        ) : orders && orders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-muted/50 border-b">
                <tr>
                  <th className="px-4 md:px-6 py-3 font-medium whitespace-nowrap">ID</th>
                  <th className="px-4 md:px-6 py-3 font-medium">USER</th>
                  <th className="px-4 md:px-6 py-3 font-medium">DATE</th>
                  <th className="px-4 md:px-6 py-3 font-medium">TOTAL</th>
                  <th className="px-4 md:px-6 py-3 font-medium">PAID</th>
                  <th className="px-4 md:px-6 py-3 font-medium">DELIVERED</th>
                  <th className="px-4 md:px-6 py-3 font-medium text-right">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="px-4 md:px-6 py-4 font-mono text-xs text-muted-foreground">{order._id.substring(0, 8)}...</td>
                    <td className="px-4 md:px-6 py-4 font-medium">{order.user && order.user.name}</td>
                    <td className="px-4 md:px-6 py-4 text-muted-foreground">{order.createdAt.substring(0, 10)}</td>
                    <td className="px-4 md:px-6 py-4 font-bold">${order.totalPrice.toFixed(2)}</td>
                    <td className="px-4 md:px-6 py-4">
                      {order.isPaid ? (
                        <div className="flex items-center text-emerald-600 dark:text-emerald-400">
                          <CheckCircle size={16} className="mr-1.5" /> <span className="hidden sm:inline">{order.paidAt.substring(0, 10)}</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-red-500">
                          <Clock size={16} className="mr-1.5" /> <span className="hidden sm:inline">Not Paid</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      {order.isDelivered ? (
                        <div className="flex items-center text-emerald-600 dark:text-emerald-400">
                          <CheckCircle size={16} className="mr-1.5" /> <span className="hidden sm:inline">{order.deliveredAt.substring(0, 10)}</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-amber-500">
                          <Clock size={16} className="mr-1.5" /> <span className="hidden sm:inline">Pending</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-right">
                      {!order.isDelivered && (
                         <button 
                           onClick={() => handleDeliver(order._id)}
                           disabled={isDelivering}
                           className="bg-primary text-primary-foreground px-3 py-1.5 rounded-md text-xs font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 cursor-pointer whitespace-nowrap"
                         >
                           Mark Delivered
                         </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <ShoppingCart className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">No orders found</h3>
            <p className="text-muted-foreground mt-1 text-sm">When customers place orders, they will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
