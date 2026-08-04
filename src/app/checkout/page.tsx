"use client";

import dynamic from "next/dynamic";

// Dynamically import the checkout client component with SSR disabled
// This is necessary because react-paystack accesses the window object
const CheckoutClient = dynamic(() => import("./CheckoutClient"), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-[#050505]" />
});

export default function CheckoutPage() {
  return <CheckoutClient />;
}
