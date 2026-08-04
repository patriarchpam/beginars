"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Lock, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  // Allow public access to login and signup pages
  const isPublicRoute = pathname === "/login" || pathname === "/signup" || pathname === "/forgot-password";

  if (isPublicRoute) {
    return <>{children}</>;
  }

  // Show loading spinner while checking Supabase auth status
  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6">
        <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-white/10 border-t-white animate-spin" />
          <span className="font-black text-xs tracking-tighter">B</span>
        </div>
        <p className="text-zinc-500 text-xs tracking-widest uppercase animate-pulse">
          Authenticating Collective Access...
        </p>
      </div>
    );
  }

  // If user is not logged in, render the Exclusive Splash Gate
  if (!user) {
    return (
      <div className="min-h-screen bg-[#050505] text-white relative flex flex-col justify-between overflow-hidden">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1600&auto=format&fit=crop"
            alt="BEGINARS Collective"
            fill
            className="object-cover opacity-20 filter grayscale blur-xs scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-[#050505]" />
        </div>

        {/* Top Header */}
        <header className="relative z-10 container mx-auto px-6 py-8 flex justify-between items-center">
          <Link href="/login" className="text-2xl font-black tracking-tighter uppercase">
            BEGINARS <span className="text-[10px] bg-white text-black px-1.5 py-0.5 align-top ml-1 font-mono">EST.2026</span>
          </Link>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800 text-[11px] text-zinc-400 font-mono">
            <Lock className="w-3 h-3 text-[#D4AF37]" />
            GATED ACCESS
          </div>
        </header>

        {/* Main Splash Content */}
        <main className="relative z-10 container mx-auto px-6 py-12 flex flex-col items-center text-center max-w-3xl my-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-[#D4AF37] mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              MEMBERS ONLY STORE & LOOKBOOK
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase mb-6 leading-[1.05]">
              BEGIN TO<br />WEAR IT LOUD.
            </h1>

            <p className="text-zinc-400 text-sm sm:text-base md:text-lg max-w-xl mb-10 leading-relaxed">
              Full catalog access, numbered drop releases, collections, and lookbooks are restricted exclusively to registered members of the BEGINARS collective.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md">
              <Button
                asChild
                className="w-full sm:w-1/2 h-14 bg-white text-black hover:bg-zinc-200 font-bold uppercase tracking-wider text-xs rounded-md shadow-xl"
              >
                <Link href="/login" className="flex items-center justify-center gap-2">
                  Log In <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="w-full sm:w-1/2 h-14 border-zinc-700 text-white hover:bg-zinc-800 font-bold uppercase tracking-wider text-xs rounded-md"
              >
                <Link href="/signup" className="flex items-center justify-center gap-2">
                  Sign Up <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Locked Preview Grid Teaser */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full mt-16 pt-10 border-t border-zinc-800/80"
          >
            <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-6">
              🔒 Locked Drop Preview (001 / 2026)
            </p>
            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto opacity-40 filter blur-[2px] pointer-events-none">
              <div className="aspect-square bg-zinc-900 rounded-lg border border-zinc-800 relative overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=300" alt="Drop 1" fill className="object-cover" />
              </div>
              <div className="aspect-square bg-zinc-900 rounded-lg border border-zinc-800 relative overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=300" alt="Drop 2" fill className="object-cover" />
              </div>
              <div className="aspect-square bg-zinc-900 rounded-lg border border-zinc-800 relative overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=300" alt="Drop 3" fill className="object-cover" />
              </div>
            </div>
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="relative z-10 container mx-auto px-6 py-6 text-center text-xs text-zinc-600 border-t border-zinc-900 font-mono">
          © 2026 BEGINARS COLLECTIVE. ALL RIGHTS RESERVED.
        </footer>
      </div>
    );
  }

  // If user is logged in, render the full application
  return <>{children}</>;
}
