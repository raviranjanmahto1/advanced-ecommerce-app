'use client';
import { useRef, useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { store } from './store';
import { syncAuthFromStorage } from './slices/authSlice';
import { syncCartFromStorage } from './slices/cartSlice';
import { syncWishlistFromStorage } from './slices/wishlistSlice';
import { syncRecentFromStorage } from './slices/recentSlice';

function StorageSync() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(syncAuthFromStorage());
    dispatch(syncCartFromStorage());
    dispatch(syncWishlistFromStorage());
    dispatch(syncRecentFromStorage());
  }, [dispatch]);

  return null;
}

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<typeof store>(null);
  if (!storeRef.current) {
    storeRef.current = store;
  }

  return (
    <Provider store={storeRef.current}>
      <StorageSync />
      {children}
    </Provider>
  );
}
