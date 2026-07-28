"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem } = useCartStore();
  
  const [selectedSize, setSelectedSize] = useState("L");
  const [selectedColor, setSelectedColor] = useState("Brown");
  const [quantity, setQuantity] = useState(1);

  // Mock product data
  const product = {
    id: params.id as string || "1",
    name: "BEGINARS - ALTER EGO",
    price: 18000,
    image: "/images/brown_alter_ego_tee.png",
    description: "Heavyweight cotton t-shirt featuring our signature ALTER EGO graffiti print. Cut heavy, printed bold. This is a limited numbered run.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Brown", "White", "Black"]
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
      size: selectedSize,
      color: selectedColor
    });
    router.push("/cart");
  };

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
              <p className="text-2xl font-bold text-[#D4AF37] mb-4">NGN {product.price.toLocaleString()}</p>
              <p className="text-zinc-400 text-sm leading-relaxed">{product.description}</p>
            </div>
            
            {/* Color Selection */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-3">Color: {selectedColor}</h3>
              <div className="flex gap-3">
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

            {/* Size Selection */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-3">Size: {selectedSize}</h3>
              <div className="flex gap-3">
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
                className="w-full h-14 bg-white text-black hover:bg-zinc-200 font-bold uppercase tracking-widest text-sm"
              >
                Add to Cart
              </Button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
