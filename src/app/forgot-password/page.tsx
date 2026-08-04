"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);
    setErrorMsg(null);
    setIsSuccess(false);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        setErrorMsg(error.message);
        return;
      }

      setIsSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white text-black pt-16 md:pt-0">
      {/* Left Branding */}
      <div className="relative w-full md:w-1/2 h-[40vh] md:h-screen hidden md:block">
        <Image
          src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800&auto=format&fit=crop"
          alt="Beginars Collective"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
          <Link href="/" className="text-white text-2xl font-black tracking-tighter uppercase">
            BEGINARS <span className="text-[10px] bg-white text-black px-1 py-0.5 align-top ml-1">EST.2026</span>
          </Link>
          <p className="text-white text-sm md:text-base font-medium max-w-sm">
            Reset your credentials to regain access to your account and orders.
          </p>
        </div>
      </div>

      {/* Right Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 min-h-[calc(100vh-4rem)] md:min-h-screen">
        <div className="w-full max-w-md space-y-8">
          <div>
            <Link href="/login" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-black mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Login
            </Link>
            <h1 className="text-3xl font-black tracking-tighter uppercase mb-2">Reset Password</h1>
            <p className="text-zinc-500 text-sm">Enter your email address and we'll send you a password reset link.</p>
          </div>

          {isSuccess ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-xl space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <h3 className="font-bold text-sm">Reset Link Sent!</h3>
              </div>
              <p className="text-xs text-emerald-700 leading-relaxed">
                If an account exists with that email, a password reset link has been dispatched to your inbox. Check your email to proceed.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {errorMsg && (
                <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-md text-sm">
                  {errorMsg}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-zinc-900 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className={`w-full bg-zinc-50 border ${errors.email ? 'border-red-500' : 'border-zinc-200'} rounded-md h-12 px-4 text-sm focus:outline-none focus:border-black transition-colors`}
                  placeholder="Enter your email"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>

              <Button
                disabled={isLoading}
                type="submit"
                className="w-full bg-black text-white hover:bg-zinc-800 h-12 font-bold uppercase tracking-widest text-xs"
              >
                {isLoading ? "Sending Link..." : "Send Reset Link"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
