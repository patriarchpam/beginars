"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      console.log("Attempting Supabase signup for:", data.email);
      const supabase = createClient();
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      console.log("Supabase signup result:", { authData, error });

      if (error) {
        if (error.message.toLowerCase().includes("rate limit exceeded")) {
          setErrorMsg(
            "Supabase email rate limit reached (too many confirmation emails sent). Please wait a few minutes, OR turn off 'Confirm Email' in your Supabase Dashboard under Authentication → Providers → Email to sign up instantly without rate limits."
          );
        } else {
          setErrorMsg(error.message);
        }
        return;
      }

      // Supabase returns empty identities array if user with this email already exists
      if (authData.user && authData.user.identities && authData.user.identities.length === 0) {
        setErrorMsg("An account with this email already exists. Please try logging in instead.");
        return;
      }

      if (authData.user) {
        if (authData.session) {
          // Auto-login (Confirm Email is OFF in Supabase)
          setSuccessMsg("Account created successfully! Redirecting...");
          setTimeout(() => {
            router.push("/profile");
          }, 1500);
        } else {
          // Email confirmation required (Confirm Email is ON in Supabase)
          setSuccessMsg("Account created! Please check your email to verify your account.");
          setTimeout(() => {
            router.push("/login");
          }, 3000);
        }
      } else {
        setErrorMsg("Unable to complete signup. Please verify your Supabase project credentials.");
      }
    } catch (err: any) {
      console.error("Signup exception:", err);
      setErrorMsg(err.message || "An error occurred during signup");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white text-black pt-16 md:pt-0">
      {/* Left Column - Image & Branding */}
      <div className="relative w-full md:w-1/2 h-[40vh] md:h-screen hidden md:block">
        {/* Placeholder image resembling a person in a hoodie with 'REBEL' */}
        <Image
          src="https://images.unsplash.com/photo-1578681994506-b8f463449011?q=80&w=800&auto=format&fit=crop"
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
            Join the collective. Early access to new drops and private campaigns.
          </p>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 min-h-[calc(100vh-4rem)] md:min-h-screen">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h1 className="text-3xl font-black tracking-tighter uppercase mb-2">Sign Up as a BEGINAR</h1>
            <p className="text-zinc-500 text-sm">Create your account to start ordering your favorites.</p>
          </div>

          {successMsg && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-md text-sm font-medium">
              {successMsg}
            </div>
          )}

          {errorMsg && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

            <div>
              <label htmlFor="password" className="block text-xs font-bold uppercase tracking-widest text-zinc-900 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register("password")}
                className={`w-full bg-zinc-50 border ${errors.password ? 'border-red-500' : 'border-zinc-200'} rounded-md h-12 px-4 text-sm focus:outline-none focus:border-black transition-colors`}
                placeholder="••••••••"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-xs font-bold uppercase tracking-widest text-zinc-900 mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword")}
                className={`w-full bg-zinc-50 border ${errors.confirmPassword ? 'border-red-500' : 'border-zinc-200'} rounded-md h-12 px-4 text-sm focus:outline-none focus:border-black transition-colors`}
                placeholder="••••••••"
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>

            <div className="flex justify-start text-xs">
              <Link href="/login" className="font-bold underline-offset-4 hover:underline">
                Already have an account? Log In
              </Link>
            </div>

            <Button disabled={isLoading} type="submit" className="w-full bg-black text-white hover:bg-zinc-800 h-12 font-bold uppercase tracking-widest text-xs">
              {isLoading ? "Loading..." : "Sign Up"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
