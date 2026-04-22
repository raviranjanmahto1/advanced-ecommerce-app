'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { setCredentials } from '@/lib/redux/slices/authSlice';
import { apiSlice } from '@/lib/redux/slices/apiSlice';
import Loader from '@/components/ui/Loader';
import { toast } from 'sonner';

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation<any, any>({
      query: (data) => ({
        url: '/api/users/profile',
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

const { useUpdateProfileMutation } = extendedApi;

export default function ProfilePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const router = useRouter();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [router, userInfo]);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success('Profile Updated Successfully');
      } catch (err: any) {
        toast.error(err?.data?.message || 'Failed to update profile');
      }
    }
  };

  if (!userInfo) return <Loader />;

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">User Profile</h1>
      
      <div className="bg-card border border-border rounded-lg shadow-sm p-6">
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 border border-input rounded-md bg-background outline-none focus:border-primary transition-colors text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 border border-input rounded-md bg-background outline-none focus:border-primary transition-colors text-sm"
            />
          </div>
          <div className="pt-4 border-t border-border mt-4">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Change Password</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5 text-muted-foreground">New Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Leave blank to keep current password"
                  className="w-full p-2.5 border border-input rounded-md bg-background outline-none focus:border-primary transition-colors text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Leave blank to keep current password"
                  className="w-full p-2.5 border border-input rounded-md bg-background outline-none focus:border-primary transition-colors text-sm"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="mt-6 bg-primary text-primary-foreground px-6 py-2.5 rounded-md font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  );
}
