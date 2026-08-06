"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ProductCard, type Product } from "@/components/product/ProductCard";
import { FilterSidebar } from "@/components/product/FilterSidebar";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/auth-context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ShopPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const supabase = createClient();
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching products:", error);
      } else if (data) {
        setProducts(data);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Guest Banner */}
      {!user && (
        <div className="mb-6 flex items-center justify-between bg-zinc-900 border border-zinc-700 rounded-xl px-5 py-4">
          <p className="text-sm text-zinc-300">
            <span className="font-semibold text-white">Browsing as guest.</span> Sign in to add items to your cart and checkout.
          </p>
          <div className="flex gap-3 ml-4 shrink-0">
            <Button asChild size="sm" variant="outline" className="border-zinc-600 text-xs">
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild size="sm" className="bg-white text-black hover:bg-zinc-200 text-xs">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      )}
      {/* Page Header */}
      <div className="mb-8 md:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">All Products</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Discover our complete collection of premium essentials. Ethically made, beautifully designed.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Sidebar */}
        <FilterSidebar />

        {/* Product Grid Area */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex justify-between items-center mb-6 hidden lg:flex">
            <p className="text-sm text-muted-foreground font-medium">
              Showing {products.length} products
            </p>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Sort by:</span>
              <Select defaultValue="newest">
                <SelectTrigger className="w-[180px] bg-background">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest Arrivals</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <p className="font-bold uppercase tracking-widest text-zinc-500 animate-pulse">Loading Collection...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10 mb-12">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
              {products.length === 0 && (
                <div className="col-span-full py-12 text-center text-zinc-500">
                  No products found. Add some to your Supabase database!
                </div>
              )}
            </div>
          )}

          {/* Pagination/Load More */}
          {!loading && products.length > 0 && (
            <div className="flex justify-center border-t border-border pt-12">
              <Button size="lg" variant="outline" className="px-12 rounded-full h-12">
                Load More
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
