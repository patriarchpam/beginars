"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Eye, Sparkles, X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const lookbookItems = [
  {
    id: "look-01",
    title: "LOOK 01 — HEAVY OVERSIDE TEE",
    category: "RUN 001",
    description: "450GSM combed cotton with dropped shoulders, raw hems, and high-density chest print.",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop",
    productId: "heavyweight-oversized-tee",
    price: "NGN 45,000",
    tags: ["450GSM", "Oversized", "Drop 01"],
  },
  {
    id: "look-02",
    title: "LOOK 02 — ARCHIVE HOODIE",
    category: "CAMPAIGN '26",
    description: "Double-layered hood with distressed ribbing and signature BEGINARS vintage wash finish.",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop",
    productId: "signature-black-hoodie",
    price: "NGN 65,000",
    tags: ["Vintage Wash", "Fleece", "Limited"],
  },
  {
    id: "look-03",
    title: "LOOK 03 — REBEL CROP TOP",
    category: "RUN 001",
    description: "Cropped boxy fit crafted from organic heavy rib knit with screenprinted slogan detail.",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop",
    productId: "raw-edge-crop-top",
    price: "NGN 35,000",
    tags: ["Rib Knit", "Cropped", "Womens"],
  },
  {
    id: "look-04",
    title: "LOOK 04 — MONOCHROME JACKET",
    category: "OUTERWEAR",
    description: "Structured canvas utility jacket featuring matte black hardware and hidden wrist pockets.",
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1000&auto=format&fit=crop",
    productId: "utility-cargo-pants",
    price: "NGN 85,000",
    tags: ["Utility", "Outerwear", "Heavyweight"],
  },
  {
    id: "look-05",
    title: "LOOK 05 — URBAN CARGO SILHOUETTE",
    category: "BOTTOMS",
    description: "Multi-pocket tactical trousers cut from durable ripstop cotton with adjustable ankle toggles.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop",
    productId: "utility-cargo-pants",
    price: "NGN 55,000",
    tags: ["Tactical", "Ripstop", "Adjustable"],
  },
  {
    id: "look-06",
    title: "LOOK 06 — STATEMENT SWEATSHIRT",
    category: "RUN 002",
    description: "Pre-shrunk French terry crewneck with tonal embroidery and reinforced collar structure.",
    image: "https://images.unsplash.com/photo-1578681994506-b8f463449011?q=80&w=1000&auto=format&fit=crop",
    productId: "heavyweight-oversized-tee",
    price: "NGN 50,000",
    tags: ["French Terry", "Tonal", "Essentials"],
  },
];

export default function LookbookPage() {
  const [selectedLook, setSelectedLook] = useState<typeof lookbookItems[0] | null>(null);

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-[#D4AF37] mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            EDITORIAL CAMPAIGN — VOL. 01 (2026)
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase mb-6 font-sans">
            LOOKBOOK
          </h1>
          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
            Raw textures, heavy cottons, and unapologetic cuts. Explore our latest campaign imagery shot on location.
          </p>
        </div>

        {/* Lookbook Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {lookbookItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative bg-zinc-900/40 rounded-2xl border border-zinc-800 overflow-hidden flex flex-col"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-950">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Badge Header */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                  <span className="px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-widest uppercase text-white">
                    {item.category}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#D4AF37] bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-[#D4AF37]/20">
                    {item.price}
                  </span>
                </div>

                {/* Quick View Overlay Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                  <button
                    onClick={() => setSelectedLook(item)}
                    className="bg-white text-black px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-2xl hover:bg-zinc-200 transition-transform transform hover:scale-105 cursor-pointer"
                  >
                    <Eye className="w-4 h-4" /> Inspect Look
                  </button>
                </div>

                {/* Bottom Card Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {item.tags.map((t) => (
                      <span key={t} className="text-[10px] text-zinc-400 bg-white/5 px-2 py-0.5 rounded">
                        #{t}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg font-bold uppercase tracking-tight text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2">{item.description}</p>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="p-4 bg-zinc-950/80 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-500">{item.id}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 text-white flex items-center gap-1.5"
                  render={<Link href={`/product/${item.productId}`} />}
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37]" /> Shop Item
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal Inspector */}
        <AnimatePresence>
          {selectedLook && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLook(null)}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative grid grid-cols-1 md:grid-cols-2"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedLook(null)}
                  className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/60 border border-white/10 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Modal Image */}
                <div className="relative aspect-[3/4] w-full bg-black">
                  <Image
                    src={selectedLook.image}
                    alt={selectedLook.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Modal Content */}
                <div className="p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest block mb-2">
                      {selectedLook.category}
                    </span>
                    <h2 className="text-2xl font-black uppercase tracking-tight mb-4">
                      {selectedLook.title}
                    </h2>
                    <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                      {selectedLook.description}
                    </p>

                    <div className="space-y-3 mb-6 border-t border-b border-zinc-800 py-4">
                      <div className="flex justify-between text-xs">
                        <span className="text-zinc-500 uppercase font-mono">Price</span>
                        <span className="font-bold text-[#D4AF37]">{selectedLook.price}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-zinc-500 uppercase font-mono">Fit</span>
                        <span className="font-medium text-white">Boxy / Oversized</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-zinc-500 uppercase font-mono">Fabric</span>
                        <span className="font-medium text-white">100% Organic Heavy Cotton</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button
                      className="w-full bg-white text-black hover:bg-zinc-200 h-12 font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2"
                      render={<Link href={`/product/${selectedLook.productId}`} />}
                    >
                      <ShoppingBag className="w-4 h-4" /> View Product Details
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
