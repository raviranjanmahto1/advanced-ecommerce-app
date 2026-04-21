'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { ShoppingCart, User, Sun, Moon } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { logout } from '@/lib/redux/slices/authSlice';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const dispatch = useDispatch();
  
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { cartItems } = useSelector((state: RootState) => state.cart);

  useEffect(() => setMounted(true), []);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-xl font-bold tracking-tighter">
          E-Shop
        </Link>
        <div className="flex items-center space-x-4">
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-md hover:bg-accent"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}
          
          <Link href="/cart" className="relative p-2 rounded-md hover:bg-accent">
            <ShoppingCart size={20} />
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                {cartItems.reduce((a, c) => a + (c.qty || 1), 0)}
              </span>
            )}
          </Link>

          {userInfo ? (
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">{userInfo.name}</span>
              <button onClick={logoutHandler} className="text-sm text-muted-foreground hover:text-foreground">
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className="p-2 rounded-md hover:bg-accent flex items-center">
              <User size={20} className="mr-1" />
              <span className="text-sm font-medium">Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
