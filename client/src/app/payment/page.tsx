'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { savePaymentMethod } from '@/lib/redux/slices/cartSlice';
import { CreditCard, Wallet } from 'lucide-react';

export default function PaymentPage() {
  const { shippingAddress, paymentMethod: defaultPaymentMethod } = useSelector((state: RootState) => state.cart);
  const [paymentMethod, setPaymentMethod] = useState(defaultPaymentMethod || 'PayPal');
  
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!shippingAddress.address) {
      router.push('/shipping');
    }
  }, [shippingAddress, router]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    router.push('/placeorder');
  };

  return (
    <div className="max-w-md mx-auto py-10 px-4">
      <div className="flex items-center mb-8 space-x-2">
        <div className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-bold">1</div>
        <span className="font-medium text-sm text-primary">Shipping</span>
        <div className="flex-1 h-px bg-primary/50"></div>
        <div className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-bold">2</div>
        <span className="font-medium text-sm">Payment</span>
        <div className="flex-1 h-px bg-border"></div>
        <div className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs font-bold">3</div>
        <span className="font-medium text-sm text-muted-foreground">Review</span>
      </div>

      <h1 className="text-2xl font-bold mb-6">Payment Method</h1>
      <form onSubmit={submitHandler} className="space-y-4">
        
        <label className={`border border-border p-4 rounded-lg flex items-center cursor-pointer transition-colors ${paymentMethod === 'PayPal' ? 'bg-primary/5 border-primary' : 'hover:bg-muted/50'}`}>
          <input
            type="radio"
            name="paymentMethod"
            value="PayPal"
            checked={paymentMethod === 'PayPal'}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mr-3 w-4 h-4 text-primary accent-primary"
          />
          <Wallet className="mr-3 text-muted-foreground" />
          <span className="font-medium">PayPal or Credit Card</span>
        </label>
        
        <label className={`border border-border p-4 rounded-lg flex items-center cursor-pointer transition-colors ${paymentMethod === 'Stripe' ? 'bg-primary/5 border-primary' : 'hover:bg-muted/50'}`}>
          <input
            type="radio"
            name="paymentMethod"
            value="Stripe"
            checked={paymentMethod === 'Stripe'}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mr-3 w-4 h-4 text-primary accent-primary"
          />
          <CreditCard className="mr-3 text-muted-foreground" />
          <span className="font-medium">Stripe</span>
        </label>

        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground p-2.5 mt-6 rounded-md font-medium hover:bg-primary/90 transition-colors"
        >
          Continue to Review
        </button>
      </form>
    </div>
  );
}
