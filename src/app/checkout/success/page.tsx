"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";

export default function CheckoutSuccessPage() {
  useEffect(() => {
    // Trigger confetti on successful mount
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#ffffff", "#D4AF37", "#000000"]
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#ffffff", "#D4AF37", "#000000"]
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center pt-16">
      <div className="container mx-auto px-4 max-w-lg text-center">
        <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800 p-8 sm:p-12 flex flex-col items-center">
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          
          <h1 className="text-3xl font-black tracking-tighter uppercase mb-4">Payment Successful!</h1>
          <p className="text-zinc-400 mb-8 leading-relaxed">
            Your order has been confirmed. You will receive an email shortly with your order details and tracking information.
          </p>
          
          <div className="w-full space-y-4">
            <Button asChild className="w-full bg-white text-black hover:bg-zinc-200 h-12 font-bold uppercase tracking-widest text-xs">
              <Link href="/shop">Continue Shopping</Link>
            </Button>
            <Button asChild variant="outline" className="w-full border-zinc-700 hover:bg-zinc-800 text-white h-12 font-bold uppercase tracking-widest text-xs">
              <Link href="/profile">View Orders</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
