"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { usePaystackPayment } from "react-paystack";
import { useCartStore } from "@/store/useCartStore";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

const checkoutSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  address: z.string().min(5, "Delivery address is required"),
  state: z.string().min(2, "State is required"),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutClient() {
  const [mounted, setMounted] = useState(false);
  const { items, getCartTotal, clearCart } = useCartStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const subtotal = getCartTotal();
  const shipping = 2500;
  const total = subtotal > 0 ? subtotal + shipping : 0;

  // Paystack configuration
  const config = {
    reference: (new Date()).getTime().toString(),
    email: getValues("email") || "guest@example.com",
    amount: total * 100, // Paystack amount is in kobo
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "pk_test_placeholder",
    currency: "NGN",
  };

  const initializePayment = usePaystackPayment(config);

  const saveOrderToHistory = async (reference: string) => {
    try {
      // Get current user if any
      const { data: { user } } = await supabase.auth.getUser();
      
      const orderData = {
        user_id: user?.id || null,
        customer_email: getValues("email"),
        customer_name: getValues("fullName"),
        total_amount: total,
        items: items, // Save the cart items as JSON
        paystack_reference: reference,
        status: 'paid'
      };

      const { error } = await supabase
        .from('orders')
        .insert([orderData]);

      if (error) {
        console.error("Error saving order to history:", error);
      } else {
        console.log("Order saved to history successfully!");
      }
    } catch (err) {
      console.error("Failed to save order", err);
    }
  };

  const onSuccess = async (reference: any) => {
    console.log("Payment successful!", reference);
    
    // Save the order to Supabase history
    await saveOrderToHistory(reference.reference || "mock_ref");
    
    // Clear cart and go to success page
    clearCart();
    router.push("/checkout/success");
  };

  const onClose = () => {
    console.log("Payment closed.");
  };

  const onSubmit = (data: CheckoutFormValues) => {
    console.log("Checkout data:", data);
    
    // Check if we are still using the placeholder key
    if (config.publicKey === "pk_test_placeholder_key_replace_me" || !config.publicKey) {
      alert("⚠️ Paystack is currently using a placeholder key.\n\nTo make this live, please add your real Paystack Test Public Key to the .env.local file.\n\nFor now, we will simulate a successful payment so you can see the success page!");
      
      // Simulate success and save to history
      setTimeout(async () => {
        await saveOrderToHistory(`mock_${Date.now()}`);
        clearCart();
        router.push("/checkout/success");
      }, 1500);
      return;
    }

    // Initialize Paystack popup with real keys
    initializePayment({ onSuccess, onClose });
  };

  if (!mounted) return <div className="min-h-screen bg-[#050505]" />;

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex flex-col mb-10">
          <h1 className="text-3xl font-bold tracking-tighter uppercase mb-2">Checkout</h1>
          <p className="text-zinc-400 text-sm flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            SECURE TRANSACTION
          </p>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-zinc-900/30 rounded-2xl border border-zinc-800">
            <h2 className="text-xl font-bold mb-4">Your cart is empty</h2>
            <Button asChild className="bg-white text-black hover:bg-zinc-200">
              <Link href="/shop">Return to Shop</Link>
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Buyer's Information */}
            <div className="lg:col-span-2">
              <div className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-6 sm:p-8">
                <h3 className="font-bold tracking-widest uppercase mb-8 text-sm">Buyer's Information</h3>
                
                <div className="space-y-6">
                  <div>
                    <label htmlFor="fullName" className="block text-xs text-zinc-400 mb-2">Full Name</label>
                    <input
                      id="fullName"
                      {...register("fullName")}
                      className={`w-full bg-zinc-950 border ${errors.fullName ? 'border-red-500' : 'border-zinc-800'} rounded-md h-12 px-4 text-sm text-white focus:outline-none focus:border-zinc-500 transition-colors`}
                      placeholder="John Doe"
                    />
                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs text-zinc-400 mb-2">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      {...register("email")}
                      className={`w-full bg-zinc-950 border ${errors.email ? 'border-red-500' : 'border-zinc-800'} rounded-md h-12 px-4 text-sm text-white focus:outline-none focus:border-zinc-500 transition-colors`}
                      placeholder="john@beginars.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs text-zinc-400 mb-2">Phone Number</label>
                    <input
                      id="phone"
                      {...register("phone")}
                      className={`w-full bg-zinc-950 border ${errors.phone ? 'border-red-500' : 'border-zinc-800'} rounded-md h-12 px-4 text-sm text-white focus:outline-none focus:border-zinc-500 transition-colors`}
                      placeholder="+234 812 345 6789"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-xs text-zinc-400 mb-2">Delivery Address</label>
                    <input
                      id="address"
                      {...register("address")}
                      className={`w-full bg-zinc-950 border ${errors.address ? 'border-red-500' : 'border-zinc-800'} rounded-md h-12 px-4 text-sm text-white focus:outline-none focus:border-zinc-500 transition-colors`}
                      placeholder="14, Broad Street, Marina"
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="state" className="block text-xs text-zinc-400 mb-2">State</label>
                    <select
                      id="state"
                      {...register("state")}
                      className={`w-full bg-zinc-950 border ${errors.state ? 'border-red-500' : 'border-zinc-800'} rounded-md h-12 px-4 text-sm text-white focus:outline-none focus:border-zinc-500 transition-colors appearance-none`}
                    >
                      <option value="">Select State</option>
                      <option value="Lagos">Lagos State</option>
                      <option value="Abuja">Abuja (FCT)</option>
                      <option value="Rivers">Rivers State</option>
                    </select>
                    {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Order Totals */}
            <div className="lg:col-span-1">
              <div className="bg-zinc-900/80 rounded-xl border border-zinc-800 p-6 sticky top-24">
                <h3 className="font-bold tracking-widest uppercase mb-6 text-sm">Order Totals</h3>
                
                <div className="space-y-4 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Subtotal ({items.length} items)</span>
                    <span className="font-medium">NGN {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Shipping</span>
                    <span className="font-medium">NGN {shipping.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="border-t border-zinc-800 pt-4 mb-8">
                  <div className="flex justify-between items-end">
                    <span className="font-bold uppercase tracking-widest text-sm">Total due</span>
                    <span className="font-bold text-2xl text-[#D4AF37]">NGN {total.toLocaleString()}</span>
                  </div>
                </div>
                
                <Button type="submit" className="w-full bg-white text-black hover:bg-zinc-200 h-12 font-bold uppercase tracking-widest text-xs">
                  Proceed to Payment
                </Button>
                
                <div className="mt-4 text-center">
                  <Link href="/cart" className="text-xs text-zinc-500 hover:text-white transition-colors underline-offset-4 hover:underline">
                    Return to Cart
                  </Link>
                </div>
              </div>
            </div>
            
          </form>
        )}
      </div>
    </div>
  );
}
