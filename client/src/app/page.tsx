'use client';

import { apiSlice } from '@/lib/redux/slices/apiSlice';
import Link from 'next/link';
import HeroCarousel from '@/components/ui/HeroCarousel';
import { ArrowRight, Star, TrendingUp, Clock } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<any[], void>({
      query: () => '/api/products',
      providesTags: ['Product'],
    }),
  }),
});

const { useGetProductsQuery } = extendedApi;

const ProductGrid = ({ products, title, icon: Icon, linkText = "View All" }: { products: any[], title: string, icon: any, linkText?: string }) => (
  <div className="mb-12">
    <div className="flex items-center justify-between mb-4 px-2 sm:px-0">
      <h2 className="text-xl md:text-2xl font-bold tracking-tight flex items-center">
        <Icon className="mr-2 text-primary" size={24} /> {title}
      </h2>
      <Link href="/products" className="text-sm font-medium text-primary hover:underline flex items-center">
        {linkText} <ArrowRight size={16} className="ml-1" />
      </Link>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 px-2 sm:px-0">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  </div>
);

export default function Home() {
  const { data: products, isLoading, error } = useGetProductsQuery();

  if (isLoading) return <div className="min-h-[60vh] flex flex-col items-center justify-center text-muted-foreground"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4"></div><p>Loading products...</p></div>;
  if (error) return <div className="text-center text-red-500 py-10 bg-red-50 dark:bg-red-950/20 rounded-lg mt-8 p-4">Error loading products. Make sure the backend server is running.</div>;

  const trendingProducts = products ? [...products].sort((a, b) => b.rating - a.rating).slice(0, 4) : [];
  const latestProducts = products ? [...products].reverse().slice(0, 8) : [];
  const recentlyViewed = products ? [...products].sort(() => 0.5 - Math.random()).slice(0, 4) : []; // mock random for demo

  return (
    <div className="pb-4">
      <HeroCarousel />
      
      {(!products || products.length === 0) ? (
        <div className="text-center text-muted-foreground py-16 bg-muted/30 rounded-xl border border-dashed mx-2 sm:mx-0">
          <p className="text-lg font-medium mb-2">No products found</p>
          <p className="text-sm">Start the backend server and run the seeder to add some data!</p>
        </div>
      ) : (
        <>
          {trendingProducts.length > 0 && <ProductGrid products={trendingProducts} title="Trending Now" icon={TrendingUp} />}
          {latestProducts.length > 0 && <ProductGrid products={latestProducts} title="New Arrivals" icon={Clock} />}
          {recentlyViewed.length > 0 && <ProductGrid products={recentlyViewed} title="Recently Viewed" icon={Star} linkText="Clear History" />}
        </>
      )}
    </div>
  );
}
