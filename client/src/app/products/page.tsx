'use client';

import { apiSlice } from '@/lib/redux/slices/apiSlice';
import ProductCard from '@/components/ui/ProductCard';
import { useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import Loader from '@/components/ui/Loader';

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<any[], void>({
      query: () => '/api/products',
      providesTags: ['Product'],
    }),
  }),
});

const { useGetProductsQuery } = extendedApi;

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialSort = searchParams.get('sort') || 'default';
  const searchQuery = searchParams.get('search') || '';
  
  const [sort, setSort] = useState(initialSort);
  const { data: products, isLoading, error } = useGetProductsQuery();

  let filteredProducts = products ? [...products] : [];
  
  if (searchQuery) {
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (sort === 'newest') {
    filteredProducts = filteredProducts.reverse();
  } else if (sort === 'price_asc') {
    filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sort === 'price_desc') {
    filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    filteredProducts = filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  if (isLoading) return <Loader text="Loading catalog..." />;
  if (error) return <div className="text-center text-red-500 py-10 bg-red-50 dark:bg-red-950/20 rounded-lg mt-8 p-4">Error loading products.</div>;

  return (
    <div className="pb-10 pt-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 md:mb-8 px-2 sm:px-0 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          {searchQuery ? `Search: "${searchQuery}"` : 'All Products'}
          <span className="text-sm font-normal text-muted-foreground ml-3">({filteredProducts.length} items)</span>
        </h1>
        
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-muted-foreground">Sort by:</label>
          <select 
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="p-2 border border-input rounded-md bg-background text-sm cursor-pointer outline-none focus:border-primary"
          >
            <option value="default">Featured</option>
            <option value="newest">Newest Arrivals</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 px-2 sm:px-0">
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
        
        {filteredProducts.length === 0 && (
          <div className="col-span-full text-center text-muted-foreground py-16 bg-muted/30 rounded-xl border border-dashed mx-2 sm:mx-0">
            <p className="text-lg font-medium mb-2">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AllProductsPage() {
  return (
    <Suspense fallback={<Loader text="Loading search..." />}>
      <ProductsContent />
    </Suspense>
  );
}
