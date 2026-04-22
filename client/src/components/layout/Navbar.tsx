'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { ShoppingCart, User, Sun, Moon, Menu, X, ArrowLeft } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { logout } from '@/lib/redux/slices/authSlice';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();
  
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { cartItems } = useSelector((state: RootState) => state.cart);

  useEffect(() => setMounted(true), []);

  const logoutHandler = () => {
    dispatch(logout());
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const isHome = pathname === '/';

  return (
    <nav className="border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-12">
          
          <div className="flex items-center">
            {/* Mobile Back Button - only show if not on home page */}
            {!isHome && (
              <button 
                onClick={() => router.back()}
                className="md:hidden mr-3 p-1.5 border border-input bg-background rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors"
                aria-label="Go Back"
              >
                <ArrowLeft size={18} />
              </button>
            )}
            
            <Link href="/" className="text-xl font-bold tracking-tighter">
              E-Shop
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 border border-input bg-background rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            )}
            
            <Link href="/cart" className="relative p-2 border border-input bg-background rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer flex items-center transition-colors">
              <ShoppingCart size={20} />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                  {cartItems.reduce((a, c) => a + (c.qty || 1), 0)}
                </span>
              )}
            </Link>

            {userInfo ? (
              <div className="flex items-center space-x-3 ml-4 border-l pl-4">
                <span className="text-sm font-medium">{userInfo.name}</span>
                <button onClick={logoutHandler} className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login" className="p-2 border border-input bg-background rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer flex items-center ml-2 transition-colors">
                <User size={20} className="mr-1" />
                <span className="text-sm font-medium">Login</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-1.5 mr-2 border border-input bg-background rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}
            <Link href="/cart" className="relative p-1.5 mr-2 border border-input bg-background rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer flex items-center transition-colors">
              <ShoppingCart size={18} />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-red-100 transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                  {cartItems.reduce((a, c) => a + (c.qty || 1), 0)}
                </span>
              )}
            </Link>
            <button
              onClick={toggleMobileMenu}
              className="p-1.5 border border-input bg-background rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer focus:outline-none transition-colors"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {userInfo ? (
              <>
                <div className="px-3 py-2 text-sm font-medium border-b mb-2">
                  Signed in as: <span className="font-bold">{userInfo.name}</span>
                </div>
                <button 
                  onClick={logoutHandler} 
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                href="/login" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-accent"
              >
                <User size={20} className="mr-2" /> Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
