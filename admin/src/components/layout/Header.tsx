'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon, LogOut } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { logout } from '@/lib/redux/authSlice';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  
  const { adminInfo } = useSelector((state: RootState) => state.auth);

  useEffect(() => setMounted(true), []);

  const logoutHandler = () => {
    dispatch(logout());
    router.push('/login');
  };

  return (
    <header className="h-16 border-b bg-background flex items-center justify-between px-6 sticky top-0 z-10">
      <div></div>
      <div className="flex items-center space-x-4">
        {mounted && (
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-md hover:bg-accent"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        )}
        
        {adminInfo ? (
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium hidden sm:block">{adminInfo.name}</span>
            <button 
              onClick={logoutHandler} 
              className="p-2 rounded-md hover:bg-red-100 hover:text-red-600 text-muted-foreground transition-colors flex items-center"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
}
