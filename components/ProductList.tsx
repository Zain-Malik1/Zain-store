"use client";

import { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";

type ProductListProps = {
  products: Product[];
};

export default function ProductList({
  products,
}: ProductListProps) {
  return (
    <div className="flex flex-wrap gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}