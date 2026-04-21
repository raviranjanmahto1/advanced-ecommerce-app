'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter, useParams } from 'next/navigation';
import { apiSlice } from '@/lib/redux/slices/apiSlice';
import { addToCart } from '@/lib/redux/slices/cartSlice';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductDetails: builder.query<any, string>({
      query: (id) => `/api/products/${id}`,
      providesTags: ['Product'],
    }),
  }),
});

const { useGetProductDetailsQuery } = extendedApi;

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const router = useRouter();

  const { data: product, isLoading, error } = useGetProductDetailsQuery(id);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    router.push('/cart');
  };

  if (isLoading) return <div className="text-center py-10">Loading product...</div>;
  if (error) return <div className="text-center text-red-500 py-10">Error loading product details.</div>;
  if (!product) return <div className="text-center py-10">Product not found.</div>;

  return (
    <div>
      <Link href="/" className="inline-flex items-center text-sm font-medium mb-6 hover:underline">
        <ArrowLeft size={16} className="mr-2" /> Go Back
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="md:col-span-1 lg:col-span-1 border rounded-lg bg-muted flex items-center justify-center h-96">
          <span className="text-muted-foreground">Product Image</span>
        </div>
        
        <div className="md:col-span-1 lg:col-span-1 space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="border-b pb-4">
            <span className="text-xl font-semibold">${product.price}</span>
          </div>
          <p className="text-muted-foreground">{product.description}</p>
        </div>
        
        <div className="md:col-span-2 lg:col-span-1">
          <div className="border rounded-lg p-6 bg-card shadow-sm space-y-4">
            <div className="flex justify-between border-b pb-2">
              <span>Price:</span>
              <span className="font-bold">${product.price}</span>
            </div>
            
            <div className="flex justify-between border-b pb-2">
              <span>Status:</span>
              <span className="font-medium">
                {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
              </span>
            </div>

            {product.countInStock > 0 && (
              <div className="flex justify-between items-center border-b pb-2">
                <span>Qty</span>
                <select
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="p-2 border rounded-md bg-background w-24"
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            <button
              onClick={addToCartHandler}
              disabled={product.countInStock === 0}
              className="w-full bg-primary text-primary-foreground py-3 rounded-md font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity mt-4"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
