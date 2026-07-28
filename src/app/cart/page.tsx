"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const { items, removeItem, updateQuantity, getCartTotal, addItem } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const total = getCartTotal();
  const subtotal = total;
  const shipping = 2500; // Mock shipping cost in Naira
  const orderTotal = subtotal > 0 ? subtotal + shipping : 0;

  // Temporary function to mock add items for demonstration
  const handleDemoAdd = () => {
    addItem({
      id: "1",
      name: "BEGINARS - ALTER EGO",
      price: 18000,
      image: "/images/brown_alter_ego_tee.png",
      quantity: 1,
      size: "L",
      color: "Brown"
    });
    addItem({
      id: "2",
      name: "BEGINARS - ALTER EGO",
      price: 18000,
      image: "/images/white_alter_ego_tee.png",
      quantity: 1,
      size: "M",
      color: "White"
    });
  };

  if (!mounted) return <div className="min-h-screen bg-[#050505]" />;

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex flex-col mb-10">
          <h1 className="text-3xl font-bold tracking-tighter uppercase mb-2">Shopping Cart</h1>
          <p className="text-zinc-400 text-sm">{items.length} ITEMS SELECTED</p>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-zinc-900/30 rounded-2xl border border-zinc-800">
            <h2 className="text-xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-zinc-400 mb-8 text-center max-w-md">
              Looks like you haven't added anything to your cart yet. Explore our latest drops and find your next favorite piece.
            </p>
            <div className="flex gap-4">
              <Button asChild className="bg-white text-black hover:bg-zinc-200">
                <Link href="/shop">Continue Shopping</Link>
              </Button>
              <Button variant="outline" onClick={handleDemoAdd} className="border-zinc-700 hover:bg-zinc-800 text-zinc-300">
                Load Demo Items
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}-${item.color}`} className="flex flex-col sm:flex-row gap-6 p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
                  <div className="relative w-full sm:w-32 aspect-square rounded-lg bg-zinc-800 overflow-hidden flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  
                  <div className="flex flex-col flex-1 justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-sm tracking-widest uppercase mb-1">{item.name}</h3>
                        <p className="text-zinc-400 text-xs mb-3">Color: {item.color} | Size: {item.size}</p>
                        <p className="font-bold text-lg">NGN {item.price.toLocaleString()}</p>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-400 transition-colors p-2 -mr-2 -mt-2"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-4 sm:mt-0">
                      <div className="flex items-center border border-zinc-700 rounded-md">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-zinc-900/80 rounded-xl border border-zinc-800 p-6 sticky top-24">
                <h3 className="font-bold tracking-widest uppercase mb-6 text-sm">Order Summary</h3>
                
                <div className="space-y-4 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Subtotal ({items.length} items)</span>
                    <span className="font-medium">NGN {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Shipping</span>
                    <span className="font-medium">Calculated at checkout</span>
                  </div>
                </div>
                
                <div className="border-t border-zinc-800 pt-4 mb-8">
                  <div className="flex justify-between items-end">
                    <span className="font-bold uppercase tracking-widest text-sm">Total</span>
                    <span className="font-bold text-2xl text-[#D4AF37]">NGN {subtotal.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Button asChild className="w-full bg-white text-black hover:bg-zinc-200 h-12 font-bold uppercase tracking-widest text-xs">
                    <Link href="/checkout">Proceed to Checkout</Link>
                  </Button>
                  <Button asChild variant="ghost" className="w-full h-12 text-zinc-400 hover:text-white hover:bg-zinc-800 font-bold uppercase tracking-widest text-xs">
                    <Link href="/shop">Continue Shopping</Link>
                  </Button>
                </div>
              </div>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
}
