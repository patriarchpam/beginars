"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Eye, ShoppingBag, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  hoverImage?: string;
  isNew?: boolean;
  isOutOfStock?: boolean;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <motion.div 
      className="group relative flex flex-col gap-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-muted">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {product.isOutOfStock && (
            <Badge variant="destructive" className="font-semibold shadow-sm">Out of Stock</Badge>
          )}
          {product.isNew && !product.isOutOfStock && (
            <Badge className="bg-primary text-primary-foreground font-semibold shadow-sm">New</Badge>
          )}
          {discount > 0 && !product.isOutOfStock && (
            <Badge variant="secondary" className="font-semibold text-destructive shadow-sm">-{discount}%</Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-3 right-3 z-10 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:text-destructive hover:bg-background"
        >
          <Heart className="h-4 w-4" />
          <span className="sr-only">Add to wishlist</span>
        </Button>

        {/* Images */}
        <Link href={`/product/${product.id}`} className="block h-full w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={`object-cover transition-opacity duration-500 ${isHovered && product.hoverImage ? "opacity-0" : "opacity-100"}`}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          {product.hoverImage && (
            <Image
              src={product.hoverImage}
              alt={`${product.name} alternate view`}
              fill
              className={`object-cover transition-opacity duration-500 absolute inset-0 ${isHovered ? "opacity-100" : "opacity-0"}`}
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          )}
        </Link>

        {/* Quick Actions */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <Button size="sm" variant="secondary" className="h-9 px-4 rounded-full shadow-md bg-background/90 hover:bg-background text-xs font-semibold backdrop-blur-md">
            <Eye className="mr-2 h-3.5 w-3.5" />
            Quick View
          </Button>
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-1.5 px-1 mt-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{product.category}</span>
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-accent text-accent" />
            <span className="text-xs font-medium">{product.rating.toFixed(1)}</span>
            <span className="text-xs text-muted-foreground">({product.reviews})</span>
          </div>
        </div>
        
        <Link href={`/product/${product.id}`} className="group-hover:text-primary transition-colors">
          <h3 className="font-semibold text-sm uppercase tracking-wide line-clamp-1">{product.name}</h3>
        </Link>

        <div className="flex items-center gap-2 mt-1 mb-3">
          <span className="font-bold text-lg">NGN {product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">NGN {product.originalPrice.toLocaleString()}</span>
          )}
        </div>
        
        <Button 
          size="sm" 
          className="w-full rounded-md text-xs font-bold uppercase tracking-widest bg-primary text-primary-foreground hover:bg-primary/90"
          disabled={product.isOutOfStock}
          asChild
        >
          <Link href={`/product/${product.id}`}>
            {product.isOutOfStock ? "SOLD OUT" : "SELECT OPTIONS"}
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}
