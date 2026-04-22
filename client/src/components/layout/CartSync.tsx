'use client';

import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { apiSlice } from '@/lib/redux/slices/apiSlice';

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    syncCart: builder.mutation<any, any>({
      query: (cartItems) => ({
        url: '/api/cart',
        method: 'POST',
        body: { cartItems }
      }),
    }),
  }),
});

export default function CartSync() {
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [syncCart] = extendedApi.useSyncCartMutation();
  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (userInfo) {
      // Sync to backend whenever cart changes and user is logged in
      syncCart(cartItems).catch(console.error);
    }
  }, [cartItems, userInfo, syncCart]);

  return null;
}
