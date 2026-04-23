'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { ShoppingCart, User, Sun, Moon, Menu, X, ArrowLeft, Search, Heart, Package, Settings, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { logout } from '@/lib/redux/slices/authSlice';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();
  
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const { wishlistItems } = useSelector((state: RootState) => state.wishlist);

  useEffect(() => setMounted(true), []);

  const logoutHandler = () => {
    dispatch(logout());
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const isProductPage = pathname.startsWith('/product/');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <nav className="border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-12">
          
          <div className="flex items-center">
            {/* Mobile Back Button - only show if not on home page */}
            {isProductPage && (
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
            {/* Desktop Search */}
            <div className="relative flex items-center">
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.form 
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 200, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleSearch}
                    className="overflow-hidden mr-2"
                  >
                    <input 
                      type="text"
                      autoFocus
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full p-1.5 px-3 border border-input rounded-md bg-background text-sm outline-none focus:border-primary"
                    />
                  </motion.form>
                )}
              </AnimatePresence>
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 border border-input bg-background rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
            </div>
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 border border-input bg-background rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            )}
            
            <Link href="/wishlist" className="relative p-2 border border-input bg-background rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer flex items-center transition-colors mr-4">
              <Heart size={20} />
              {wishlistItems.length > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={wishlistItems.length}
                  className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-[10px] font-bold leading-none text-red-100 transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full"
                >
                  {wishlistItems.length}
                </motion.span>
              )}
            </Link>
            <Link href="/cart" className="relative p-2 border border-input bg-background rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer flex items-center transition-colors">
              <ShoppingCart size={20} />
              {cartItems.length > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={cartItems.reduce((a, c) => a + (c.qty || 1), 0)}
                  className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-[10px] font-bold leading-none text-red-100 transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full"
                >
                  {cartItems.reduce((a, c) => a + (c.qty || 1), 0)}
                </motion.span>
              )}
            </Link>

            {userInfo ? (
              <div className="flex items-center space-x-3 ml-4 border-l pl-4">
                <div className="relative group">
                  <div className="flex items-center cursor-pointer text-sm font-medium hover:text-primary transition-colors">
                    {userInfo.name}
                  </div>
                  {/* Dropdown */}
                  <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-md shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
                    <Link href="/profile" className="flex items-center px-4 py-2.5 text-sm hover:bg-muted transition-colors">
                      <Settings size={16} className="mr-2 text-muted-foreground" /> Profile
                    </Link>
                    <Link href="/orders" className="flex items-center px-4 py-2.5 text-sm hover:bg-muted transition-colors">
                      <Package size={16} className="mr-2 text-muted-foreground" /> My Orders
                    </Link>
                    <button onClick={logoutHandler} className="w-full flex items-center px-4 py-2.5 text-sm hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 transition-colors text-left border-t border-border">
                      <LogOut size={16} className="mr-2 text-muted-foreground group-hover:text-red-600" /> Logout
                    </button>
                  </div>
                </div>
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
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-1.5 mr-2 border border-input bg-background rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors"
            >
              <Search size={18} />
            </button>
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
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={cartItems.reduce((a, c) => a + (c.qty || 1), 0)}
                  className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-red-100 transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full"
                >
                  {cartItems.reduce((a, c) => a + (c.qty || 1), 0)}
                </motion.span>
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

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t overflow-hidden"
          >
            <form onSubmit={handleSearch} className="p-3">
              <div className="flex">
                <input 
                  type="text"
                  autoFocus
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-2 border border-input rounded-l-md bg-background text-sm outline-none focus:border-primary"
                />
                <button type="submit" className="bg-primary text-primary-foreground px-4 rounded-r-md text-sm font-medium">Go</button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t overflow-hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {userInfo ? (
              <>
                <div className="px-3 py-2 text-sm font-medium border-b border-border mb-2 text-muted-foreground">
                  Account: <span className="font-bold text-foreground">{userInfo.name}</span>
                </div>
                <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center px-3 py-2.5 rounded-md text-base font-medium hover:bg-accent mb-1 text-muted-foreground hover:text-foreground">
                  <Settings size={20} className="mr-3" /> Profile
                </Link>
                <Link href="/orders" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center px-3 py-2.5 rounded-md text-base font-medium hover:bg-accent mb-1 text-muted-foreground hover:text-foreground">
                  <Package size={20} className="mr-3" /> My Orders
                </Link>
                <Link href="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between px-3 py-2.5 rounded-md text-base font-medium hover:bg-accent mb-1 text-muted-foreground hover:text-foreground">
                  <div className="flex items-center">
                    <Heart size={20} className="mr-3" /> Wishlist
                  </div>
                  {wishlistItems.length > 0 && (
                    <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                      {wishlistItems.length}
                    </span>
                  )}
                </Link>
                <button onClick={logoutHandler} className="w-full flex items-center px-3 py-2.5 rounded-md text-base font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors mt-2 border-t border-border">
                  <LogOut size={20} className="mr-3" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between px-3 py-2.5 rounded-md text-base font-medium hover:bg-accent mb-1">
                  <div className="flex items-center">
                    <Heart size={20} className="mr-2 text-muted-foreground" /> Wishlist
                  </div>
                  {wishlistItems.length > 0 && (
                    <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                      {wishlistItems.length}
                    </span>
                  )}
                </Link>
                <Link 
                  href="/login" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-accent"
                >
                  <User size={20} className="mr-2" /> Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
