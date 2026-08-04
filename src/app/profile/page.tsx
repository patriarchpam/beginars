"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";

export default function ProfilePage() {
  const router = useRouter();
  const { clearCart } = useCartStore();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    clearCart();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tighter uppercase mb-2">My Profile</h1>
          <p className="text-zinc-400 text-sm">Manage your account and view orders.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 space-y-2">
            <div className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-6">
              <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                JD
              </div>
              <h2 className="font-bold">John Doe</h2>
              <p className="text-sm text-zinc-400 mb-6">john@beginars.com</p>
              
              <nav className="space-y-1">
                <Link href="/profile" className="block px-3 py-2 text-sm font-medium bg-zinc-800 rounded-md">
                  Dashboard
                </Link>
                <Link href="#" className="block px-3 py-2 text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md">
                  Orders
                </Link>
                <Link href="#" className="block px-3 py-2 text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md">
                  Settings
                </Link>
              </nav>

              <div className="mt-8 pt-6 border-t border-zinc-800">
                <Button 
                  variant="ghost" 
                  className="w-full text-red-500 hover:text-red-400 hover:bg-red-500/10 justify-start" 
                  onClick={handleLogout}
                >
                  Log Out
                </Button>
              </div>
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-6">
              <h3 className="font-bold tracking-widest uppercase text-sm mb-4">Recent Orders</h3>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-zinc-500 mb-4 text-sm">You haven't placed any orders yet.</p>
                <Button asChild variant="outline" className="border-zinc-700">
                  <Link href="/shop">Start Shopping</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
