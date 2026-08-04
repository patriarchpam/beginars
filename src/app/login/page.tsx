"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [isUnconfirmed, setIsUnconfirmed] = React.useState(false);
  const [resendSuccess, setResendSuccess] = React.useState(false);
  const [resendLoading, setResendLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setErrorMsg(null);
    setIsUnconfirmed(false);
    setResendSuccess(false);

    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        if (error.message.toLowerCase().includes("email not confirmed")) {
          setIsUnconfirmed(true);
          setErrorMsg("Your email address has not been confirmed yet.");
        } else {
          setErrorMsg(error.message);
        }
        return;
      }

      router.push("/profile");
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendConfirmation = async () => {
    const email = getValues("email");
    if (!email) {
      alert("Please enter your email address above.");
      return;
    }
    setResendLoading(true);
    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: email,
      });
      if (error) {
        alert(error.message);
      } else {
        setResendSuccess(true);
      }
    } catch (err: any) {
      alert(err.message || "Failed to resend confirmation email.");
    } finally {
      setResendLoading(false);
    }
  };

  const [showPassword, setShowPassword] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(true);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white text-black pt-16 md:pt-0">
      {/* Left Column - Image & Branding & Member Perks */}
      <div className="relative w-full md:w-1/2 h-[45vh] md:h-screen hidden md:block">
        <Image
          src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800&auto=format&fit=crop"
          alt="Beginars Collective"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
        <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
          <Link href="/" className="text-white text-2xl font-black tracking-tighter uppercase">
            BEGINARS <span className="text-[10px] bg-white text-black px-1.5 py-0.5 align-top ml-1 font-mono">EST.2026</span>
          </Link>
          
          <div className="space-y-6">
            <h2 className="text-white text-3xl font-black tracking-tight uppercase leading-tight">
              A Collective Of Heavy Silhouettes & Bold Statements.
            </h2>
            <div className="space-y-3 text-xs font-medium text-zinc-300">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px]">✓</span>
                Instant access to private drops & numbered releases
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px]">✓</span>
                Persistent order history & real-time tracking
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px]">✓</span>
                Exclusive access to volume campaign lookbooks
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Enhanced Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 min-h-[calc(100vh-4rem)] md:min-h-screen">
        <div className="w-full max-w-md space-y-8">
          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-100 border border-zinc-200 text-[10px] font-mono tracking-widest uppercase text-zinc-600 mb-4">
              🔒 MEMBER PORTAL
            </span>
            <h1 className="text-3xl font-black tracking-tighter uppercase mb-2">Welcome Back</h1>
            <p className="text-zinc-500 text-sm">Enter your registered credentials to access your account.</p>
          </div>

          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-md text-sm space-y-2">
              <p className="font-semibold">{errorMsg}</p>
              {isUnconfirmed && (
                <div className="pt-2 border-t border-red-200/60 text-xs text-zinc-700 space-y-2">
                  <p>
                    Please check your inbox/spam for the confirmation link from Supabase.
                  </p>
                  {resendSuccess ? (
                    <p className="text-emerald-600 font-bold">
                      ✓ Confirmation email resent! Check your inbox.
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendConfirmation}
                      disabled={resendLoading}
                      className="font-bold underline text-black hover:text-zinc-700 cursor-pointer"
                    >
                      {resendLoading ? "Resending..." : "Click here to resend confirmation email"}
                    </button>
                  )}
                  <p className="text-[11px] text-zinc-500 italic pt-1">
                    💡 Dev Tip: To allow immediate login without email verification, turn off <strong>Confirm Email</strong> in your Supabase Dashboard under <em>Authentication → Providers → Email</em>.
                  </p>
                </div>
              )}
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
                placeholder="john@example.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="block text-xs font-bold uppercase tracking-widest text-zinc-900">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-xs text-zinc-500 hover:text-black transition-colors"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className={`w-full bg-zinc-50 border ${errors.password ? 'border-red-500' : 'border-zinc-200'} rounded-md h-12 px-4 text-sm focus:outline-none focus:border-black transition-colors`}
                placeholder="••••••••"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-zinc-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-zinc-300 text-black focus:ring-black"
                />
                Remember me
              </label>
              <Link href="/forgot-password" className="text-zinc-500 hover:text-black font-medium transition-colors">
                Forgot Password?
              </Link>
            </div>

            <Button disabled={isLoading} type="submit" className="w-full bg-black text-white hover:bg-zinc-800 h-12 font-bold uppercase tracking-widest text-xs">
              {isLoading ? "Authenticating..." : "Log In"}
            </Button>

            <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-xs">
              <span className="text-zinc-500">Not a member yet?</span>
              <Link href="/signup" className="font-bold text-black underline-offset-4 hover:underline">
                Sign Up as a BEGINAR →
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
