"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { type Product } from "@/components/product/ProductCard";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem } = useCartStore();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", params.id)
        .single();

      if (error) {
        console.error("Error fetching product:", error);
      } else if (data) {
        setProduct(data as Product);
        // Set defaults if available
        if (data.sizes && data.sizes.length > 0) setSelectedSize(data.sizes[0]);
        if (data.colors && data.colors.length > 0) setSelectedColor(data.colors[0]);
      }
      setLoading(false);
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    // Ensure size and color are selected if they are required options
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert("Please select a size");
      return;
    }
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      alert("Please select a color");
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
      size: selectedSize || undefined,
      color: selectedColor || undefined
    });
    router.push("/cart");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">
        <p className="font-bold uppercase tracking-widest text-zinc-500 animate-pulse">Loading Product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white gap-4">
        <p className="font-bold uppercase tracking-widest text-zinc-500">Product not found</p>
        <Button onClick={() => router.push("/shop")} variant="outline" className="text-black">Return to Shop</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Image */}
          <div className="relative w-full aspect-[4/5] bg-zinc-900 rounded-xl overflow-hidden">
            <Image 
              src={product.image} 
              alt={product.name} 
              fill 
              className="object-cover"
              priority
            />
          </div>
          
          {/* Details */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <h1 className="text-3xl font-black tracking-tighter uppercase mb-2">{product.name}</h1>
              <div className="flex items-center gap-3 mb-4">
                <p className="text-2xl font-bold text-[#D4AF37]">NGN {product.price.toLocaleString()}</p>
                {product.original_price && (
                  <p className="text-lg text-zinc-500 line-through">NGN {product.original_price.toLocaleString()}</p>
                )}
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">{product.description}</p>
            </div>
            
            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest mb-3">Color: {selectedColor}</h3>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map(color => (
                    <button 
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border text-sm font-medium transition-colors ${
                        selectedColor === color 
                          ? 'border-white bg-white text-black' 
                          : 'border-zinc-800 text-zinc-400 hover:border-zinc-600'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest mb-3">Size: {selectedSize}</h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => (
                    <button 
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 border flex items-center justify-center text-sm font-medium transition-colors ${
                        selectedSize === size 
                          ? 'border-white bg-white text-black' 
                          : 'border-zinc-800 text-zinc-400 hover:border-zinc-600'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-3">Quantity</h3>
              <div className="flex items-center w-32 h-12 border border-zinc-800 rounded-md overflow-hidden">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex-1 h-full flex items-center justify-center bg-zinc-900 hover:bg-zinc-800 transition-colors"
                >-</button>
                <span className="w-12 text-center text-sm font-medium">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex-1 h-full flex items-center justify-center bg-zinc-900 hover:bg-zinc-800 transition-colors"
                >+</button>
              </div>
            </div>
            
            {/* Action */}
            <div className="pt-4">
              <Button 
                onClick={handleAddToCart}
                disabled={product.is_out_of_stock}
                className="w-full h-14 bg-white text-black hover:bg-zinc-200 font-bold uppercase tracking-widest text-sm"
              >
                {product.is_out_of_stock ? "SOLD OUT" : "Add to Cart"}
              </Button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
