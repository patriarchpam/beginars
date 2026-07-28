"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col mb-16 md:mb-24 text-center"
        >
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6">
            BEGIN TO WEAR IT LOUD.
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            We are more than just a brand. BEGINARS is a collective of heavy silhouettes, raw designs, and bold statements.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold tracking-widest uppercase text-[#D4AF37]">The Story</h2>
            <p className="text-zinc-300 leading-relaxed">
              Founded in 2026, BEGINARS was born out of a desire to break away from the mundane. We believe that streetwear isn't just about what you wear, it's about how loud you can be without saying a word.
            </p>
            <p className="text-zinc-300 leading-relaxed">
              Every drop is a numbered run. Cut heavy and printed bold. When it's gone, it's gone. We don't do restocks because true exclusivity means owning a piece of a moment in time.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-full aspect-square md:aspect-[4/5] rounded-xl overflow-hidden bg-zinc-900"
          >
            <Image
              src="/images/beginars_studio.png"
              alt="Beginars Studio"
              fill
              className="object-cover opacity-80 mix-blend-luminosity"
            />
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center p-12 rounded-2xl bg-zinc-900/50 border border-zinc-800"
        >
          <h2 className="text-xl font-bold tracking-widest uppercase mb-4">Our Commitment</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            We are committed to delivering premium quality garments that stand the test of time. No shortcuts. Just raw, unfiltered design crafted for those who aren't afraid to stand out.
          </p>
        </motion.div>

      </div>
    </div>
  );
}
