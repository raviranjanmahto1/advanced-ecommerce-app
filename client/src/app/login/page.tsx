'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { setCredentials } from '@/lib/redux/slices/authSlice';
import { addToCart } from '@/lib/redux/slices/cartSlice';
import { apiSlice } from '@/lib/redux/slices/apiSlice';
import Link from 'next/link';
import { motion } from 'framer-motion';

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<any, void>({
      query: () => '/api/cart',
    }),
    login: builder.mutation({
      query: (data) => ({
        url: '/api/users/auth',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

const { useLoginMutation, useLazyGetCartQuery } = extendedApi;

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch();
  const router = useRouter();
  
  const [login, { isLoading, error }] = useLoginMutation();
  const [getCart] = useLazyGetCartQuery();
  const { userInfo } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (userInfo) {
      router.push('/');
    }
  }, [userInfo, router]);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      
      // Fetch user's saved cart from DB upon login
      try {
        const cartData = await getCart().unwrap();
        if (cartData && cartData.length > 0) {
           cartData.forEach((item: any) => dispatch(addToCart(item)));
        }
      } catch (e) {
        console.error('Failed to fetch cart on login', e);
      }
      dispatch(setCredentials({ ...res }));
      router.push('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-md w-full border border-border rounded-xl p-6 md:p-8 bg-card shadow-sm"
    >
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-center">Welcome Back</h1>
      <p className="text-muted-foreground text-center mb-6 text-sm">Sign in to access your orders and wishlist</p>
      {error && <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">{(error as any)?.data?.message || 'Login failed'}</div>}
      <form onSubmit={submitHandler} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md bg-background"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md bg-background"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary text-primary-foreground p-2.5 mt-2 rounded-md font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors shadow-sm"
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
      <div className="mt-4 text-sm text-center">
        New Customer? <Link href="/register" className="text-primary hover:underline">Register</Link>
      </div>
    </motion.div>
    </div>
  );
}
