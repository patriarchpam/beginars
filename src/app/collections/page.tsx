"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const collections = [
  {
    id: "summer-edit",
    title: "The Summer Edit",
    description: "Lightweight fabrics and breezy silhouettes designed for the warmer months.",
    image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=1200&auto=format&fit=crop",
    href: "/shop?collection=summer",
    align: "left"
  },
  {
    id: "essentials",
    title: "Core Essentials",
    description: "The foundation of a modern wardrobe. Timeless pieces you'll wear year-round.",
    image: "https://images.unsplash.com/photo-1489987707023-afc7e8798e01?q=80&w=1200&auto=format&fit=crop",
    href: "/shop?collection=essentials",
    align: "right"
  },
  {
    id: "evening",
    title: "Evening Wear",
    description: "Elevated looks for your most important events. Elegant, refined, unforgettable.",
    image: "https://images.unsplash.com/photo-1566206091558-f622e6900fdf?q=80&w=1200&auto=format&fit=crop",
    href: "/shop?collection=evening",
    align: "left"
  }
];

export default function CollectionsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="pt-16 pb-12 md:pt-24 md:pb-16 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">Collections</h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Explore our thoughtfully curated edits. Each collection tells a story through premium materials and expert craftsmanship.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Collections List */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-24 md:space-y-32">
          {collections.map((collection, index) => (
            <div 
              key={collection.id} 
              className={`flex flex-col gap-8 md:gap-16 items-center ${collection.align === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'}`}
            >
              <motion.div 
                className="w-full md:w-1/2"
                initial={{ opacity: 0, x: collection.align === 'right' ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <Link href={collection.href} className="block relative aspect-[4/5] md:aspect-square overflow-hidden rounded-2xl group">
                  <Image
                    src={collection.image}
                    alt={collection.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500" />
                </Link>
              </motion.div>
              
              <motion.div 
                className="w-full md:w-1/2 flex flex-col justify-center max-w-lg mx-auto"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">{collection.title}</h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {collection.description}
                </p>
                <Button size="lg" className="w-fit h-12 px-8 rounded-full" render={<Link href={collection.href} />}>
                  Explore Collection <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
