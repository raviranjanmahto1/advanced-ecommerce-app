'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { setCredentials } from '@/lib/redux/slices/authSlice';
import { apiSlice } from '@/lib/redux/slices/apiSlice';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: '/api/users',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

const { useRegisterMutation } = extendedApi;

function RegisterContent() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';
  
  const [register, { isLoading, error }] = useRegisterMutation();
  const { userInfo } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (userInfo) {
      router.push(redirect);
    }
  }, [userInfo, router]);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success(`Welcome, ${res.name}! Account created successfully.`);
        router.push(redirect);
      } catch (err: any) {
        toast.error(err?.data?.message || 'Failed to register');
      }
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full border border-border rounded-xl p-6 md:p-8 bg-card shadow-sm"
      >
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-center">Create an Account</h1>
        <p className="text-muted-foreground text-center mb-6 text-sm">Join E-Shop to track orders and save wishlists</p>
        
        
        
        
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 border border-input rounded-md bg-background outline-none focus:border-primary transition-colors text-sm"
              required
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 border border-input rounded-md bg-background outline-none focus:border-primary transition-colors text-sm"
              required
              placeholder="name@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2.5 border border-input rounded-md bg-background outline-none focus:border-primary transition-colors text-sm"
              required
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2.5 border border-input rounded-md bg-background outline-none focus:border-primary transition-colors text-sm"
              required
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-primary-foreground p-2.5 mt-4 rounded-md font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors shadow-sm"
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        <div className="mt-6 text-sm text-center text-muted-foreground pt-4 border-t">
          Already have an account? <Link href={`/login?redirect=${redirect}`} className="text-primary font-medium hover:underline ml-1 cursor-pointer">Login here</Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-[70vh] flex items-center justify-center">Loading...</div>}>
      <RegisterContent />
    </Suspense>
  );
}
