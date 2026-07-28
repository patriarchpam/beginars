"use client";

import React from "react";
import { ProductCard, type Product } from "@/components/product/ProductCard";
import { FilterSidebar } from "@/components/product/FilterSidebar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown } from "lucide-react";

// Extended mock data for the shop page
const shopProducts: Product[] = [
  {
    id: "1",
    name: "Minimalist Wool Coat",
    price: 299.00,
    originalPrice: 350.00,
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=600&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1515347619252-c430fae3d1ba?q=80&w=600&auto=format&fit=crop",
    isNew: true,
    category: "Outerwear"
  },
  {
    id: "2",
    name: "Premium Cotton T-Shirt",
    price: 45.00,
    rating: 4.9,
    reviews: 856,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=600&auto=format&fit=crop",
    category: "Essentials"
  },
  {
    id: "3",
    name: "Leather Crossbody Bag",
    price: 185.00,
    rating: 4.7,
    reviews: 92,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=600&auto=format&fit=crop",
    category: "Accessories"
  },
  {
    id: "4",
    name: "Classic Denim Jacket",
    price: 120.00,
    originalPrice: 150.00,
    rating: 4.6,
    reviews: 215,
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=600&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1601333144130-8cbb312386b6?q=80&w=600&auto=format&fit=crop",
    isOutOfStock: true,
    category: "Outerwear"
  },
  {
    id: "5",
    name: "Tailored Linen Trousers",
    price: 110.00,
    rating: 4.5,
    reviews: 64,
    image: "https://images.unsplash.com/photo-1594938298596-70f56fb3cecb?q=80&w=600&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1594938328870-9323eb2a2025?q=80&w=600&auto=format&fit=crop",
    category: "Bottoms"
  },
  {
    id: "6",
    name: "Cashmere Turtleneck",
    price: 195.00,
    rating: 4.9,
    reviews: 342,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=600&auto=format&fit=crop",
    isNew: true,
    category: "Knitwear"
  },
  {
    id: "7",
    name: "Oversized Silk Shirt",
    price: 145.00,
    originalPrice: 180.00,
    rating: 4.7,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?q=80&w=600&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1598554889165-8139a49f2883?q=80&w=600&auto=format&fit=crop",
    category: "Tops"
  },
  {
    id: "8",
    name: "Structured Tote",
    price: 250.00,
    rating: 4.8,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=600&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1591561954231-15822361d764?q=80&w=600&auto=format&fit=crop",
    category: "Accessories"
  }
];

export default function ShopPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
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
            <p className="text-sm text-muted-foreground font-medium">Showing {shopProducts.length} products</p>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10 mb-12">
            {shopProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination/Load More */}
          <div className="flex justify-center border-t border-border pt-12">
            <Button size="lg" variant="outline" className="px-12 rounded-full h-12">
              Load More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
