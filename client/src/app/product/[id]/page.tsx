'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter, useParams } from 'next/navigation';
import { apiSlice } from '@/lib/redux/slices/apiSlice';
import { addToCart } from '@/lib/redux/slices/cartSlice';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart } from 'lucide-react';

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

  if (isLoading) return <div className="text-center py-20 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mr-3"></div> Loading product...</div>;
  if (error) return <div className="text-center text-red-500 py-10 bg-red-50 p-4 rounded-lg">Error loading product details.</div>;
  if (!product) return <div className="text-center py-10">Product not found.</div>;

  return (
    <div className="pb-12 md:pb-20">
      <Link href="/" className="inline-flex items-center text-sm font-medium mb-4 md:mb-6 hover:text-primary transition-colors bg-muted px-3 py-1.5 rounded-md">
        <ArrowLeft size={16} className="mr-2" /> Back to Products
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
        <div className="md:col-span-1 lg:col-span-1 border rounded-xl bg-muted overflow-hidden aspect-square md:aspect-auto md:h-[400px] lg:h-[500px] flex items-center justify-center relative">
          {product.image ? (
            <img 
              src={product.image.startsWith('http') ? product.image : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${product.image}`}
              alt={product.name}
              className="object-cover w-full h-full"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://placehold.co/600x600/png?text=No+Image';
              }}
            />
          ) : (
            <span className="text-muted-foreground">Product Image</span>
          )}
        </div>
        
        <div className="md:col-span-1 lg:col-span-1 space-y-4 md:space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-2">{product.name}</h1>
            <div className="flex items-center text-sm text-muted-foreground mb-4">
              <span className="text-yellow-500 mr-1">★</span> {product.rating} ({product.numReviews} reviews) 
              <span className="mx-2">•</span> 
              Brand: {product.brand}
            </div>
          </div>
          <div className="border-y py-4">
            <span className="text-2xl md:text-3xl font-semibold text-primary">${product.price}</span>
          </div>
          <div>
            <h3 className="font-medium mb-2 text-lg">Description</h3>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          </div>
        </div>
        
        <div className="md:col-span-2 lg:col-span-1">
          <div className="border rounded-xl p-5 md:p-6 bg-card shadow-sm space-y-4 sticky top-24">
            <div className="flex justify-between border-b pb-3">
              <span className="text-muted-foreground">Price:</span>
              <span className="font-bold text-lg">${product.price}</span>
            </div>
            
            <div className="flex justify-between border-b pb-3">
              <span className="text-muted-foreground">Status:</span>
              <span className={`font-medium ${product.countInStock > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}>
                {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
              </span>
            </div>

            {product.countInStock > 0 && (
              <div className="flex justify-between items-center border-b pb-3">
                <span className="text-muted-foreground">Quantity:</span>
                <select
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="p-2 border rounded-md bg-background font-medium w-24 focus:ring-2 focus:ring-primary focus:outline-none"
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
              className="w-full bg-primary text-primary-foreground py-3.5 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 transition-colors mt-6 flex items-center justify-center text-lg shadow-sm"
            >
              <ShoppingCart className="mr-2" size={20} /> Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
