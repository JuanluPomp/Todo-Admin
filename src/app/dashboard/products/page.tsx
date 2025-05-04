
import { ProductCard } from '@/features/cart/components/product-cart'
import { products } from '@/features/cart/utils/products'
import React from 'react'

export default function ProductsPage() {
  return (
    <div className=' container mx-auto border border-slate-300 p-4 bg-slate-200 shadow-xl rounded-md'>
        <h1 className=' text-center text-2xl my-5'>Products Page</h1>
        <div className=' grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 py-5'>
            {products.map(product => (
                <ProductCard
                    key={product.id}
                    product={product}
                />
            ))}
        </div>
    </div>
  )
}
