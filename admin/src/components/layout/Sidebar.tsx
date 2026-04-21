'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, X, DatabaseBackup } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSeedDatabaseMutation } from '@/lib/redux/adminApiSlice';
import { toast } from 'sonner';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [seedDatabase, { isLoading: isSeeding }] = useSeedDatabaseMutation();

  const links = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/products', label: 'Products', icon: Package },
    { href: '/orders', label: 'Orders', icon: ShoppingCart },
    { href: '/users', label: 'Users', icon: Users },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  const handleSeedDatabase = async () => {
    try {
      const result = await seedDatabase().unwrap();
      toast.success(result.message || 'Database seeded successfully!');
      if (window.innerWidth < 768) {
        onClose();
      }
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to seed database');
    }
  };

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
        "w-64 border-r bg-card h-screen fixed top-0 left-0 z-50 transition-transform duration-200 ease-in-out md:translate-x-0 flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-16 flex items-center justify-between border-b px-6 shrink-0">
          <h1 className="font-bold text-xl tracking-tight text-primary">Admin Portal</h1>
          <button 
            onClick={onClose}
            className="p-2 rounded-md hover:bg-accent md:hidden text-muted-foreground"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
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
        
        {/* Danger Zone Actions */}
        <div className="p-4 border-t mt-auto shrink-0 space-y-2">
          <h3 className="text-xs uppercase font-bold text-muted-foreground mb-2 px-2">Dev Tools</h3>
          <button
            onClick={handleSeedDatabase}
            disabled={isSeeding}
            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-md transition-colors bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 dark:bg-amber-500/20 dark:text-amber-400 dark:hover:bg-amber-500/30 disabled:opacity-50"
          >
            {isSeeding ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
            ) : (
              <DatabaseBackup size={20} />
            )}
            <span className="font-medium">{isSeeding ? 'Seeding...' : 'Seed Database'}</span>
          </button>
        </div>
      </div>
    </>
  );
}
