"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard, type Product } from "@/components/product/ProductCard";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [latestDrops, setLatestDrops] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(4);

      if (error) {
        console.error("Error fetching latest products:", error);
      } else if (data) {
        setLatestDrops(data);
      }
      setLoading(false);
    };

    fetchLatestProducts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-white">
      {/* Hero Section */}
      <section className="relative w-full pt-32 pb-16 lg:pt-40 lg:pb-24 px-6 md:px-12 lg:px-20 border-b border-zinc-800">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col max-w-xl"
          >
            <h1 className="text-[3.5rem] leading-[1.05] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[6rem] font-black tracking-tighter uppercase mb-6 font-sans">
              BEGIN TO<br />WEAR<br />IT LOUD.
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base md:text-lg max-w-md mb-10 leading-relaxed">
              Tees and crop tops. Cut heavy, printed bold and released in numbered runs. When it's gone, it's gone.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <Button 
                size="lg" 
                className="w-full sm:w-auto h-12 sm:h-14 px-8 bg-white text-black hover:bg-zinc-200 font-bold uppercase tracking-wider text-xs sm:text-sm rounded-sm"
                asChild
              >
                <Link href="/shop">SHOP COLLECTION</Link>
              </Button>
              <Button 
                size="lg" 
                variant="ghost" 
                className="w-full sm:w-auto h-12 sm:h-14 px-8 text-white hover:bg-zinc-800 font-bold uppercase tracking-wider text-xs sm:text-sm rounded-sm"
                asChild
              >
                <Link href="/lookbook">
                  VIEW LOOKBOOK <Plus className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Right Content - Hero Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative w-full aspect-[4/3] lg:aspect-[16/11] rounded-2xl overflow-hidden bg-[#D4C3A3]/20 flex items-center justify-center"
          >
            <Image
              src="/images/hero_character.png"
              alt="Beginars Character"
              fill
              className="object-cover object-center opacity-90"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

        </div>
      </section>

      {/* Latest Drops Section */}
      <section className="w-full py-12 md:py-20 px-6 md:px-12 lg:px-20 bg-[#050505]">
        <div className="max-w-[1440px] mx-auto">
          
          <div className="flex justify-between items-end mb-10 border-b border-zinc-800 pb-4">
            <h2 className="text-xl md:text-2xl font-bold tracking-widest uppercase">Latest Drops</h2>
            <Link 
              href="/shop" 
              className="text-xs md:text-sm font-bold tracking-widest uppercase text-zinc-400 hover:text-white transition-colors"
            >
              VIEW ALL IN SHOP
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <p className="font-bold uppercase tracking-widest text-zinc-500 animate-pulse">Loading Drops...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 gap-y-12">
              {latestDrops.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
              {latestDrops.length === 0 && (
                <p className="col-span-full text-zinc-500 text-center py-10">No products available.</p>
              )}
            </div>
          )}
          
        </div>
      </section>
      
    </div>
  );
}
