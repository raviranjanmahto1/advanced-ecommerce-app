'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, useParams } from 'next/navigation';
import { apiSlice } from '@/lib/redux/slices/apiSlice';
import { addToCart } from '@/lib/redux/slices/cartSlice';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, Sparkles, Heart, Star, MessageSquare } from 'lucide-react';
import { RootState } from '@/lib/redux/store';
import { toast } from 'sonner';
import { toggleWishlist } from '@/lib/redux/slices/wishlistSlice';
import { addRecentItem } from '@/lib/redux/slices/recentSlice';
import Loader from '@/components/ui/Loader';

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

const { useGetProductDetailsQuery, useGetProductsQuery, useCreateReviewMutation } = extendedApi;

export default function ProductPage() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  const params = useParams();
  const id = params.id as string;
  
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const { data: product, isLoading, error } = useGetProductDetailsQuery(id);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [createReview, { isLoading: isReviewLoading }] = useCreateReviewMutation();
  const { data: allProducts } = useGetProductsQuery();
  const { wishlistItems } = useSelector((state: RootState) => state.wishlist);
  const isWishlisted = wishlistItems?.some((i: any) => i._id === id);

  // Track as recently viewed
  useEffect(() => {
    if (product) {
      dispatch(addRecentItem(product));
    }
  }, [product, dispatch]);

  const submitReviewHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createReview({ productId: id, rating, comment }).unwrap();
      toast.success('Review submitted successfully!');
      setRating(5);
      setComment('');
      setShowReviewForm(false);
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to submit review');
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    router.push('/cart');
  };

  if (!isMounted || isLoading) return <Loader text="Loading product..." />;
  if (error) return <div className="text-center text-red-500 py-10 bg-red-50 dark:bg-red-950/20 p-4 rounded-lg">Error loading product details.</div>;
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
      <Link href="/" className="hidden md:inline-flex items-center text-sm font-medium mb-4 md:mb-6 border border-input hover:bg-accent hover:text-accent-foreground transition-colors bg-background px-3 py-1.5 rounded-md cursor-pointer ml-2 sm:ml-0">
        <ArrowLeft size={16} className="mr-2" /> Back to Products
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 px-3 sm:px-0">
        <div className="md:col-span-1 lg:col-span-1 border border-border rounded-md bg-muted overflow-hidden aspect-square md:aspect-auto md:h-[400px] lg:h-[500px] flex items-center justify-center relative">
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
          <div className="border-y border-border py-3">
            <span className="text-2xl md:text-3xl font-semibold text-primary">${product.price}</span>
          </div>
          <div>
            <h3 className="font-medium mb-1 text-base">Description</h3>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{product.description}</p>
          </div>
        </div>
        
        <div className="md:col-span-2 lg:col-span-1">
          <div className="border border-border rounded-md p-4 md:p-5 bg-card shadow-sm space-y-3 sticky top-24">
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Price:</span>
              <span className="font-bold text-lg">${product.price}</span>
            </div>
            
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Status:</span>
              <span className={`font-medium ${product.countInStock > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}>
                {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
              </span>
            </div>

            {product.countInStock > 0 && (
              <div className="flex justify-between items-center border-b border-border pb-4">
                <span className="text-muted-foreground font-medium">Quantity:</span>
                <div className="flex items-center border border-input rounded-md bg-background">
                  <button 
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="px-3 py-1.5 hover:bg-accent hover:text-accent-foreground text-muted-foreground transition-colors cursor-pointer rounded-l-md border-r border-input"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 font-bold text-center w-12">{qty}</span>
                  <button 
                    onClick={() => setQty(Math.min(product.countInStock, qty + 1))}
                    className="px-3 py-1.5 hover:bg-accent hover:text-accent-foreground text-muted-foreground transition-colors cursor-pointer rounded-r-md border-l border-input"
                  >
                    +
                  </button>
                </div>
              </div>
            )}
            
            <div className="space-y-2 mt-4 pt-2">
              <button
                onClick={addToCartHandler}
                disabled={product.countInStock === 0}
                className="w-full bg-primary text-primary-foreground py-2.5 rounded-md font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors flex items-center justify-center shadow-sm"
              >
                <ShoppingCart className="mr-2" size={18} /> Add To Cart
              </button>
              
              <button
                onClick={() => { addToCartHandler(); router.push('/cart'); }}
                disabled={product.countInStock === 0}
                className="w-full bg-secondary text-secondary-foreground py-2.5 rounded-md font-semibold hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors flex items-center justify-center border border-border"
              >
                Buy Now
              </button>
              
              <button
                onClick={() => {
                  dispatch(toggleWishlist(product));
                  // Optionally add a toast here
                }}
                className="w-full bg-background text-foreground py-2.5 rounded-md font-semibold hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors flex items-center justify-center border border-input"
              >
                <Heart className="mr-2" size={18} /> {isWishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
              </button>
            </div>
          </div>
        </div>
      </div>

            {/* Reviews Section */}
      <div className="mt-12 px-3 sm:px-0 border-t border-border pt-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight flex items-center">
            <MessageSquare className="mr-2 text-primary" size={24} /> Customer Reviews
          </h2>
          {userInfo ? (
            <button 
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium text-sm hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
            >
              {showReviewForm ? 'Cancel' : 'Write a Review'}
            </button>
          ) : (
            <Link href="/login" className="bg-secondary text-secondary-foreground border border-border px-4 py-2 rounded-md font-medium text-sm hover:bg-accent transition-colors cursor-pointer shadow-sm">
              Login to Review
            </Link>
          )}
        </div>
        {showReviewForm && userInfo && (
          <div className="bg-muted/30 border border-border rounded-md p-4 md:p-6 mb-6">
            <h3 className="font-bold mb-4">Write a Customer Review</h3>
            <form onSubmit={submitReviewHandler} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Rating</label>
                <select 
                  value={rating} 
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full sm:w-auto p-2 border border-input rounded-md bg-background outline-none focus:border-primary cursor-pointer"
                >
                  <option value="5">5 - Excellent</option>
                  <option value="4">4 - Very Good</option>
                  <option value="3">3 - Good</option>
                  <option value="2">2 - Fair</option>
                  <option value="1">1 - Poor</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Comment</label>
                <textarea 
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                  rows={3}
                  className="w-full p-2 border border-input rounded-md bg-background outline-none focus:border-primary resize-none"
                  placeholder="What did you like or dislike?"
                ></textarea>
              </div>
              <button 
                type="submit" 
                disabled={isReviewLoading}
                className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
              >
                {isReviewLoading ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </div>
        )}
        
        {product.reviews && product.reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {product.reviews.map((review: any) => (
              <div key={review._id || review.name} className="border border-border rounded-md p-4 bg-card shadow-sm">
                <div className="flex items-center justify-between mb-2 border-b border-border pb-2">
                  <span className="font-semibold">{review.name}</span>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className={i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground opacity-30"} />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground text-sm italic">"{review.comment}"</p>
                {review.createdAt && (
                  <span className="text-xs text-muted-foreground opacity-50 block mt-2">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-muted/30 p-8 rounded-md text-center border border-dashed border-border">
            <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
          </div>
        )}
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 px-3 sm:px-0">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight flex items-center mb-6 border-b border-border pb-2">
            <Sparkles className="mr-2 text-primary" size={24} /> You Might Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
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
