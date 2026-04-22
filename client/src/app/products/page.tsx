'use client';

import { apiSlice } from '@/lib/redux/slices/apiSlice';
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

export default function AllProductsPage() {
  const { data: products, isLoading, error } = useGetProductsQuery();

  if (isLoading) return <div className="min-h-[60vh] flex flex-col items-center justify-center text-muted-foreground"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4"></div><p>Loading products...</p></div>;
  if (error) return <div className="text-center text-red-500 py-10 bg-red-50 dark:bg-red-950/20 rounded-lg mt-8 p-4">Error loading products.</div>;

  return (
    <div className="pb-10 pt-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 tracking-tight px-2 sm:px-0">All Products</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 px-2 sm:px-0">
        {products?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
        
        {(!products || products.length === 0) && (
          <div className="col-span-full text-center text-muted-foreground py-16 bg-muted/30 rounded-xl border border-dashed mx-2 sm:mx-0">
            <p className="text-lg font-medium mb-2">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
}
