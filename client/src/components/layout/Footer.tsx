import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-card text-card-foreground border-t mt-12 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">E-Shop Advanced</h3>
            <p className="text-muted-foreground text-sm">
              Your premium destination for the latest electronics, gadgets, and tech accessories.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/cart" className="hover:text-primary transition-colors">Shopping Cart</Link></li>
              <li><Link href="/login" className="hover:text-primary transition-colors">Login / Register</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><span className="hover:text-primary transition-colors cursor-pointer">Track Order</span></li>
              <li><span className="hover:text-primary transition-colors cursor-pointer">Returns & Exchanges</span></li>
              <li><span className="hover:text-primary transition-colors cursor-pointer">Contact Us</span></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Newsletter</h3>
            <p className="text-muted-foreground text-sm mb-2">Subscribe to get special offers and updates.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Email address" 
                className="p-2 text-sm border rounded-l-md w-full bg-background outline-none focus:border-primary"
              />
              <button className="bg-primary text-primary-foreground px-3 py-2 rounded-r-md text-sm hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} E-Shop Advanced. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
