'use client';

import { apiSlice } from '@/lib/redux/slices/apiSlice';
import Link from 'next/link';
import HeroCarousel from '@/components/ui/HeroCarousel';
import { ArrowRight, Star, TrendingUp, Clock } from 'lucide-react';

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
      <Link href="#" className="text-sm font-medium text-primary hover:underline flex items-center">
        {linkText} <ArrowRight size={16} className="ml-1" />
      </Link>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 px-2 sm:px-0">
      {products.map((product) => (
        <div key={product._id} className="group border rounded-md overflow-hidden flex flex-col bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-200">
          <Link href={`/product/${product._id}`} className="block relative aspect-square w-full overflow-hidden bg-muted">
             {product.image ? (
               <img 
                 src={product.image.startsWith('http') ? product.image : `${'https://advanced-ecommerce-app-api-raviranjan.vercel.app'}${product.image}`}
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
            </div>
          </div>
        </div>
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
