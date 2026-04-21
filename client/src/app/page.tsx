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

  if (isLoading) return <div className="text-center py-10">Loading products...</div>;
  if (error) return <div className="text-center text-red-500 py-10">Error loading products.</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 tracking-tight">Latest Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.map((product) => (
          <div key={product._id} className="group border rounded-lg overflow-hidden flex flex-col bg-card text-card-foreground">
            <Link href={`/product/${product._id}`} className="block h-64 relative overflow-hidden bg-muted">
               <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                 {/* Fallback if no image - usually you'd use Next Image */}
                 <span className="text-sm">Image: {product.name}</span>
               </div>
            </Link>
            <div className="p-4 flex flex-col flex-grow">
              <Link href={`/product/${product._id}`}>
                <h2 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{product.name}</h2>
              </Link>
              <div className="flex items-center justify-between mt-auto pt-4">
                <span className="text-xl font-bold">${product.price}</span>
              </div>
            </div>
          </div>
        ))}
        
        {(!products || products.length === 0) && (
          <div className="col-span-full text-center text-muted-foreground py-10">
            No products found. Start the backend server and add some data!
          </div>
        )}
      </div>
    </div>
  );
}
