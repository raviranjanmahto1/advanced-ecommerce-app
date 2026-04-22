'use client';

import { apiSlice } from '@/lib/redux/slices/apiSlice';
import Image from 'next/image';
import Link from 'next/link';

// Inject products endpoint
const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<any[], void>({
      query: () => '/api/products',
      providesTags: ['Product'],
    }),
  }),
});

const { useGetProductsQuery } = extendedApi;

export default function Home() {
  const { data: products, isLoading, error } = useGetProductsQuery();

  if (isLoading) return <div className="text-center py-20 text-muted-foreground flex justify-center items-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mr-3"></div> Loading products...</div>;
  if (error) return <div className="text-center text-red-500 py-10 bg-red-50 dark:bg-red-950/20 rounded-lg mt-8 p-4">Error loading products. Make sure the backend server is running.</div>;

  return (
    <div className="pb-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight px-2">Latest Products</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {products?.map((product) => (
          <div key={product._id} className="group border rounded-xl overflow-hidden flex flex-col bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-200">
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
                   <span className="text-sm">Image: {product.name}</span>
                 </div>
               )}
            </Link>
            <div className="p-3 flex flex-col flex-grow">
              <Link href={`/product/${product._id}`}>
                <h2 className="text-base md:text-lg font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-2">{product.name}</h2>
              </Link>
              <div className="text-xs text-muted-foreground mb-2 flex items-center">
                 <span className="text-yellow-500 mr-1">★</span> {product.rating} ({product.numReviews} reviews)
              </div>
              <div className="flex items-center justify-between mt-auto pt-3 border-t">
                <span className="text-lg md:text-xl font-bold">${product.price}</span>
              </div>
            </div>
          </div>
        ))}
        
        {(!products || products.length === 0) && (
          <div className="col-span-full text-center text-muted-foreground py-16 bg-muted/30 rounded-xl border border-dashed">
            <p className="text-lg font-medium mb-2">No products found</p>
            <p className="text-sm">Start the backend server and run the seeder to add some data!</p>
          </div>
        )}
      </div>
    </div>
  );
}
