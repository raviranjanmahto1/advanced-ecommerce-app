'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { saveShippingAddress } from '@/lib/redux/slices/cartSlice';

export default function ShippingPage() {
  const { shippingAddress } = useSelector((state: RootState) => state.cart);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');
  
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!userInfo) {
      router.push('/login?redirect=shipping');
    }
  }, [userInfo, router]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    router.push('/payment');
  };

  if (!userInfo) return null;

  return (
    <div className="max-w-md mx-auto py-10 px-4">
      <div className="flex items-center mb-8 space-x-2">
        <div className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-bold">1</div>
        <span className="font-medium text-sm">Shipping</span>
        <div className="flex-1 h-px bg-border"></div>
        <div className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs font-bold">2</div>
        <span className="font-medium text-sm text-muted-foreground">Payment</span>
        <div className="flex-1 h-px bg-border"></div>
        <div className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs font-bold">3</div>
        <span className="font-medium text-sm text-muted-foreground">Review</span>
      </div>

      <h1 className="text-2xl font-bold mb-6">Shipping Address</h1>
      <form onSubmit={submitHandler} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2.5 border border-input rounded-md bg-background"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-2.5 border border-input rounded-md bg-background"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Postal Code</label>
          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className="w-full p-2.5 border border-input rounded-md bg-background"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Country</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full p-2.5 border border-input rounded-md bg-background"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground p-2.5 mt-4 rounded-md font-medium hover:bg-primary/90 transition-colors"
        >
          Continue to Payment
        </button>
      </form>
    </div>
  );
}
