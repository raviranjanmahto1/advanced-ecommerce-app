'use client';

import { DollarSign, Package, ShoppingCart, Users } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { label: 'Total Revenue', value: '$45,231.89', icon: DollarSign, trend: '+20.1%' },
    { label: 'Orders', value: '+2350', icon: ShoppingCart, trend: '+180.1%' },
    { label: 'Products', value: '12,234', icon: Package, trend: '+19%' },
    { label: 'Active Users', value: '+573', icon: Users, trend: '+201' },
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="rounded-xl border bg-card text-card-foreground shadow-sm p-4">
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-sm font-medium">{stat.label}</h3>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex flex-col">
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-emerald-500 font-medium">{stat.trend}</span> from last month
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm col-span-4 p-4">
          <div className="flex flex-col space-y-1.5 pb-4">
            <h3 className="font-semibold leading-none tracking-tight">Overview</h3>
          </div>
          <div className="h-[300px] flex items-center justify-center bg-muted/50 rounded-md border border-dashed">
            <span className="text-muted-foreground">Chart Placeholder (Recharts)</span>
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm col-span-3 p-4">
          <div className="flex flex-col space-y-1.5 pb-4">
            <h3 className="font-semibold leading-none tracking-tight">Recent Sales</h3>
            <p className="text-sm text-muted-foreground">You made 265 sales this month.</p>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div key={i} className="flex items-center">
                <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center font-semibold text-sm">
                  OM
                </div>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Olivia Martin</p>
                  <p className="text-sm text-muted-foreground">olivia.martin@email.com</p>
                </div>
                <div className="ml-auto font-medium">+$1,999.00</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
