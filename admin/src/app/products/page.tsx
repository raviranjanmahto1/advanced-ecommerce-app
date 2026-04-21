'use client';

import { useGetProductsQuery } from '@/lib/redux/adminApiSlice';
import { Plus, Edit, Trash2, Package } from 'lucide-react';

export default function ProductsPage() {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        <button className="bg-primary text-primary-foreground flex items-center px-4 py-2 rounded-md hover:opacity-90 transition-opacity">
          <Plus size={16} className="mr-2" /> Add Product
        </button>
      </div>

      <div className="rounded-md border bg-card text-card-foreground shadow-sm">
        {isLoading ? (
          <div className="p-8 text-center text-muted-foreground">Loading products...</div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">Error loading products. Check backend.</div>
        ) : products && products.length > 0 ? (
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-muted/50 border-b">
              <tr>
                <th className="px-6 py-3 font-medium">ID</th>
                <th className="px-6 py-3 font-medium">NAME</th>
                <th className="px-6 py-3 font-medium">PRICE</th>
                <th className="px-6 py-3 font-medium">CATEGORY</th>
                <th className="px-6 py-3 font-medium">BRAND</th>
                <th className="px-6 py-3 font-medium text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{product._id.substring(0, 8)}...</td>
                  <td className="px-6 py-4 font-medium">{product.name}</td>
                  <td className="px-6 py-4">${product.price}</td>
                  <td className="px-6 py-4">{product.category}</td>
                  <td className="px-6 py-4">{product.brand}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-md transition-colors">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-12 text-center flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <Package className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">No products found</h3>
            <p className="text-muted-foreground mt-1 mb-4">Get started by creating a new product.</p>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition-opacity">
              Add Product
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
