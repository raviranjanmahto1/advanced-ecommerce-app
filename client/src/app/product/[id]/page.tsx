'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter, useParams } from 'next/navigation';
import { apiSlice } from '@/lib/redux/slices/apiSlice';
import { addToCart } from '@/lib/redux/slices/cartSlice';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, Sparkles } from 'lucide-react';

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductDetails: builder.query<any, string>({
      query: (id) => `/api/products/${id}`,
      providesTags: ['Product'],
    }),
    getProducts: builder.query<any[], void>({
      query: () => '/api/products',
      providesTags: ['Product'],
    }),
  }),
});

const { useGetProductDetailsQuery, useGetProductsQuery } = extendedApi;

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const router = useRouter();

  const { data: product, isLoading, error } = useGetProductDetailsQuery(id);
  const { data: allProducts } = useGetProductsQuery();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    router.push('/cart');
  };

  if (isLoading) return <div className="min-h-[60vh] flex flex-col items-center justify-center text-muted-foreground"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4"></div><p>Loading product...</p></div>;
  if (error) return <div className="text-center text-red-500 py-10 bg-red-50 p-4 rounded-lg">Error loading product details.</div>;
  if (!product) return <div className="text-center py-10">Product not found.</div>;

  // Filter out current product and grab same category or random
  const relatedProducts = allProducts 
    ? allProducts
        .filter((p) => p._id !== product._id)
        .sort((a, b) => a.category === product.category ? -1 : 1)
        .slice(0, 4)
    : [];

  return (
    <div className="pb-6">
      <Link href="/" className="inline-flex items-center text-sm font-medium mb-4 md:mb-6 border border-input hover:bg-accent hover:text-accent-foreground transition-colors bg-background px-3 py-1.5 rounded-md cursor-pointer ml-2 sm:ml-0">
        <ArrowLeft size={16} className="mr-2" /> Back to Products
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 px-2 sm:px-0">
        <div className="md:col-span-1 lg:col-span-1 border rounded-md bg-muted overflow-hidden aspect-square md:aspect-auto md:h-[400px] lg:h-[500px] flex items-center justify-center relative">
          {product.image ? (
            <img 
              src={product.image.startsWith('http') ? product.image : `${'https://advanced-ecommerce-app-api-raviranjan.vercel.app'}${product.image}`}
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
        
        <div className="md:col-span-1 lg:col-span-1 space-y-3 md:space-y-4">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-1">{product.name}</h1>
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <span className="text-yellow-500 mr-1">★</span> {product.rating} ({product.numReviews} reviews) 
              <span className="mx-2">•</span> 
              Brand: {product.brand}
            </div>
          </div>
          <div className="border-y py-3">
            <span className="text-2xl md:text-3xl font-semibold text-primary">${product.price}</span>
          </div>
          <div>
            <h3 className="font-medium mb-1 text-base">Description</h3>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{product.description}</p>
          </div>
        </div>
        
        <div className="md:col-span-2 lg:col-span-1">
          <div className="border rounded-md p-4 md:p-5 bg-card shadow-sm space-y-3 sticky top-24">
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Price:</span>
              <span className="font-bold text-lg">${product.price}</span>
            </div>
            
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Status:</span>
              <span className={`font-medium ${product.countInStock > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}>
                {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
              </span>
            </div>

            {product.countInStock > 0 && (
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-muted-foreground">Quantity:</span>
                <select
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="p-1.5 border rounded-md bg-background font-medium w-20 focus:ring-2 focus:ring-primary focus:outline-none cursor-pointer"
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
              className="w-full bg-primary text-primary-foreground py-2 rounded-md font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors mt-4 flex items-center justify-center shadow-sm"
            >
              <ShoppingCart className="mr-2" size={18} /> Add To Cart
            </button>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 px-2 sm:px-0">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight flex items-center mb-6 border-b pb-2">
            <Sparkles className="mr-2 text-primary" size={24} /> You Might Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
            {relatedProducts.map((p) => (
              <div key={p._id} className="group border rounded-md overflow-hidden flex flex-col bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-200">
                <Link href={`/product/${p._id}`} className="block relative aspect-square w-full overflow-hidden bg-muted">
                   {p.image ? (
                     <img 
                       src={p.image.startsWith('http') ? p.image : `${'https://advanced-ecommerce-app-api-raviranjan.vercel.app'}${p.image}`}
                       alt={p.name}
                       className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                       onError={(e) => {
                         (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/png?text=No+Image';
                       }}
                     />
                   ) : (
                     <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                       <span className="text-xs text-center p-2">Image: {p.name}</span>
                     </div>
                   )}
                </Link>
                <div className="p-3 flex flex-col flex-grow">
                  <Link href={`/product/${p._id}`}>
                    <h3 className="text-sm md:text-base font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-2 leading-tight">{p.name}</h3>
                  </Link>
                  <div className="flex items-center justify-between mt-auto pt-2 border-t">
                    <span className="text-base md:text-lg font-bold">${p.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
