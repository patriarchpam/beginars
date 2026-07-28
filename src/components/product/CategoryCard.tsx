"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  title: string;
  image: string;
  href: string;
  itemCount?: number;
  className?: string;
}

export function CategoryCard({ title, image, href, itemCount, className = "" }: CategoryCardProps) {
  return (
    <Link href={href} className={`group block relative overflow-hidden rounded-2xl ${className}`}>
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 z-10" />
      
      <motion.div 
        className="w-full h-full relative"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </motion.div>

      <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 z-20 flex flex-col justify-end h-full">
        <h3 className="text-white text-2xl sm:text-3xl font-bold tracking-tight mb-2">
          {title}
        </h3>
        
        <div className="flex items-center gap-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <span className="text-white/90 font-medium text-sm">
            {itemCount ? `${itemCount} Items` : "Shop Now"}
          </span>
          <div className="h-8 w-8 rounded-full bg-white text-primary flex items-center justify-center">
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
