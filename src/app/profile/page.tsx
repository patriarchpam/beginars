"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import { useOrderStore } from "@/store/useOrderStore";
import { ShoppingBag, Package, Calendar, CreditCard, LogOut } from "lucide-react";

interface Order {
  id: string;
  paystack_reference: string;
  customer_name: string;
  customer_email: string;
  total_amount: number;
  status: string;
  items: any[];
  created_at: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();
  const { clearCart } = useCartStore();
  const localOrders = useOrderStore((state) => state.orders);
  const clearOrders = useOrderStore((state) => state.clearOrders);
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
      return;
    }

    if (user) {
      fetchUserOrders();
    }
  }, [user, loading, router]);

  const fetchUserOrders = async () => {
    setOrdersLoading(true);
    let dbOrders: Order[] = [];
    try {
      if (user?.id) {
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (!error && data) {
          dbOrders = data;
        }
      }
    } catch (err) {
      console.warn("Notice: Unable to query Supabase orders:", err);
    } finally {
      // Merge DB orders and local persistent orders, deduplicating by paystack_reference
      const map = new Map<string, Order>();
      
      // Filter local orders so users ONLY see their own orders
      const userLocalOrders = localOrders.filter((ord) => {
        const matchesUserId = user?.id && ord.user_id === user.id;
        const matchesEmail =
          user?.email &&
          ord.customer_email?.toLowerCase() === user.email.toLowerCase();
        return Boolean(matchesUserId || matchesEmail);
      });

      // Add user's local orders first
      userLocalOrders.forEach((ord) => {
        if (ord.paystack_reference) {
          map.set(ord.paystack_reference, ord as Order);
        }
      });
      
      // Add DB orders (overwrites or supplements)
      dbOrders.forEach((ord) => {
        if (ord.paystack_reference) {
          map.set(ord.paystack_reference, ord);
        }
      });

      const combined = Array.from(map.values()).sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      setOrders(combined);
      setOrdersLoading(false);
    }
  };

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    await signOut();
    clearCart();
    clearOrders();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          <p className="text-zinc-500 text-sm">Loading your account...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const initials = user.email
    ? user.email.substring(0, 2).toUpperCase()
    : "BE";

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tighter uppercase mb-2">My Profile</h1>
          <p className="text-zinc-400 text-sm">Manage your account and view past orders.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="col-span-1 space-y-2">
            <div className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-6">
              <div className="w-16 h-16 bg-zinc-800 border border-zinc-700 rounded-full flex items-center justify-center text-xl font-bold mb-4 text-[#D4AF37]">
                {initials}
              </div>
              <h2 className="font-bold truncate">{user.email?.split("@")[0]}</h2>
              <p className="text-xs text-zinc-400 mb-6 truncate">{user.email}</p>

              <nav className="space-y-1">
                <div className="px-3 py-2 text-sm font-medium bg-zinc-800/80 rounded-md text-white flex items-center gap-2">
                  <Package className="w-4 h-4 text-zinc-400" /> Dashboard & Orders
                </div>
              </nav>

              <div className="mt-8 pt-6 border-t border-zinc-800">
                <Button
                  variant="ghost"
                  className="w-full text-red-400 hover:text-red-300 hover:bg-red-500/10 justify-start flex items-center gap-2"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" /> Log Out
                </Button>
              </div>
            </div>
          </div>

          {/* Main content - Order History */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold tracking-widest uppercase text-sm flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                  Order History ({orders.length})
                </h3>
              </div>

              {ordersLoading ? (
                <div className="py-12 flex justify-center text-zinc-500 text-sm">
                  Fetching your orders...
                </div>
              ) : orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-zinc-500 mb-4 text-sm">You haven't placed any orders yet.</p>
                  <Button asChild variant="outline" className="border-zinc-700 hover:bg-zinc-800">
                    <Link href="/shop">Start Shopping</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id || order.paystack_reference}
                      className="bg-zinc-950 rounded-lg border border-zinc-800 p-4 sm:p-5 transition-colors hover:border-zinc-700"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b border-zinc-800/60">
                        <div>
                          <p className="text-xs text-zinc-500 font-mono">Ref: {order.paystack_reference}</p>
                          <p className="text-xs text-zinc-400 flex items-center gap-1 mt-0.5">
                            <Calendar className="w-3 h-3" />
                            {new Date(order.created_at).toLocaleDateString("en-NG", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-500/10 text-green-400 border border-green-500/20">
                          {order.status || "paid"}
                        </span>
                      </div>

                      {/* Items */}
                      <div className="space-y-2 mb-3">
                        {Array.isArray(order.items) &&
                          order.items.map((item: any, idx: number) => (
                            <div key={idx} className="flex justify-between text-sm text-zinc-300">
                              <span>
                                {item.quantity}x {item.name} {item.size ? `(${item.size})` : ""}
                              </span>
                              <span className="text-zinc-400">
                                NGN {(item.price * item.quantity).toLocaleString()}
                              </span>
                            </div>
                          ))}
                      </div>

                      <div className="pt-2 flex justify-between items-center text-xs font-medium border-t border-zinc-900">
                        <span className="text-zinc-500 flex items-center gap-1">
                          <CreditCard className="w-3.5 h-3.5" /> Paystack Direct
                        </span>
                        <span className="text-[#D4AF37] font-bold text-sm">
                          NGN {Number(order.total_amount).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
