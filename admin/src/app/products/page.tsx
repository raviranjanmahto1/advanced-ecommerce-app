'use client';

import { useGetProductsQuery } from '@/lib/redux/adminApiSlice';
import { Plus, Edit, Trash2, Package } from 'lucide-react';

export default function ProductsPage() {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Products</h1>
        <button className="bg-primary text-primary-foreground flex items-center justify-center px-4 py-2 rounded-md hover:opacity-90 transition-opacity w-full sm:w-auto cursor-pointer">
          <Plus size={16} className="mr-2" /> Add Product
        </button>
      </div>

      <div className="rounded-md border bg-card text-card-foreground shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center flex flex-col items-center text-muted-foreground">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
            Loading products...
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-500 bg-red-50 dark:bg-red-950/20 m-4 rounded-lg">Error loading products. Check backend.</div>
        ) : products && products.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-muted/50 border-b">
                <tr>
                  <th className="px-3 md:px-4 py-2 font-medium whitespace-nowrap">ID</th>
                  <th className="px-3 md:px-4 py-2 font-medium min-w-[150px]">NAME</th>
                  <th className="px-3 md:px-4 py-2 font-medium">PRICE</th>
                  <th className="px-3 md:px-4 py-2 font-medium hidden sm:table-cell">CATEGORY</th>
                  <th className="px-3 md:px-4 py-2 font-medium hidden md:table-cell">BRAND</th>
                  <th className="px-3 md:px-4 py-2 font-medium text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="px-3 md:px-4 py-2 font-mono text-xs text-muted-foreground">{product._id.substring(0, 6)}...</td>
                    <td className="px-3 md:px-4 py-2 font-medium">
                      <div className="line-clamp-2">{product.name}</div>
                      {/* Show hidden columns on mobile inside the name cell */}
                      <div className="sm:hidden text-xs text-muted-foreground mt-1">{product.category}</div>
                    </td>
                    <td className="px-3 md:px-4 py-2 font-semibold">${product.price}</td>
                    <td className="px-3 md:px-4 py-2 hidden sm:table-cell">{product.category}</td>
                    <td className="px-3 md:px-4 py-2 hidden md:table-cell">{product.brand}</td>
                    <td className="px-3 md:px-4 py-2 text-right">
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
              <Package className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">No products found</h3>
            <p className="text-muted-foreground mt-1 mb-6 text-sm">Get started by creating a new product.</p>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition-opacity flex items-center cursor-pointer">
              <Plus size={16} className="mr-2" /> Add Product
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
