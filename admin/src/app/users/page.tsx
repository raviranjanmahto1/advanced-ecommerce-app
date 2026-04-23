'use client';

import { useGetUsersQuery } from '@/lib/redux/adminApiSlice';
import { Users, Edit, Trash2, Check, X } from 'lucide-react';

export default function AdminUsersPage() {
  const { data: users, isLoading, error } = useGetUsersQuery();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Users</h1>
      </div>

      <div className="rounded-md border bg-card text-card-foreground shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center flex flex-col items-center text-muted-foreground">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
            Loading users...
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-500 bg-red-50 dark:bg-red-950/20 m-4 rounded-lg">Error loading users. Check backend.</div>
        ) : users && users.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-muted/50 border-b">
                <tr>
                  <th className="px-4 md:px-6 py-3 font-medium whitespace-nowrap">ID</th>
                  <th className="px-4 md:px-6 py-3 font-medium">NAME</th>
                  <th className="px-4 md:px-6 py-3 font-medium">EMAIL</th>
                  <th className="px-4 md:px-6 py-3 font-medium">ADMIN</th>
                  <th className="px-4 md:px-6 py-3 font-medium text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="px-4 md:px-6 py-4 font-mono text-xs text-muted-foreground">{user._id.substring(0, 8)}...</td>
                    <td className="px-4 md:px-6 py-4 font-medium">{user.name}</td>
                    <td className="px-4 md:px-6 py-4">
                      <a href={`mailto:${user.email}`} className="text-blue-500 hover:underline">{user.email}</a>
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      {user.isAdmin ? (
                        <Check size={18} className="text-emerald-500" />
                      ) : (
                        <X size={18} className="text-red-500" />
                      )}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-1 md:space-x-2">
                        <button className="p-1.5 md:p-2 border border-blue-200 text-blue-500 bg-background hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-md transition-colors cursor-pointer">
                          <Edit size={16} />
                        </button>
                        <button className="p-1.5 md:p-2 border border-red-200 text-red-500 bg-background hover:bg-red-50 dark:hover:bg-red-950/30 rounded-md transition-colors cursor-pointer">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">No users found</h3>
          </div>
        )}
      </div>
    </div>
  );
}
