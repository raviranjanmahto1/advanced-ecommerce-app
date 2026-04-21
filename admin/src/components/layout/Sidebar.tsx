'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/products', label: 'Products', icon: Package },
    { href: '/orders', label: 'Orders', icon: ShoppingCart },
    { href: '/users', label: 'Users', icon: Users },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "w-64 border-r bg-card h-screen fixed top-0 left-0 z-50 transition-transform duration-200 ease-in-out md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-16 flex items-center justify-between border-b px-6">
          <h1 className="font-bold text-xl tracking-tight text-primary">Admin Portal</h1>
          <button 
            onClick={onClose}
            className="p-2 rounded-md hover:bg-accent md:hidden text-muted-foreground"
          >
            <X size={20} />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/');
            
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => {
                  if (window.innerWidth < 768) {
                    onClose();
                  }
                }}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2.5 rounded-md transition-colors",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-accent hover:text-accent-foreground text-muted-foreground"
                )}
              >
                <Icon size={20} />
                <span className="font-medium">{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
