"use client";

// import { Link, useNavigate } from 'react-router';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Wallet } from "lucide-react";
import { toast } from "sonner";
import React, { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../schema";

export function LoginPage() {
  const { isPending, mutate } = useLogin();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: authProp) => {
    console.log("pareds dataa", data);

    const parsed = loginSchema.safeParse(data);
    
    if (!parsed.success) {
      alert("invalid credentials ");
    }

    mutate(parsed.data!);
  };
  return (
    <div className="w-full min-h-[90vh] flex items-center justify-center bg-white dark:bg-gray-950">
      <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-500">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2 group cursor-pointer">
            <Wallet className="h-10 w-10 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-2xl font-semibold tracking-tight">
              ExpenseTracker
            </span>
          </div>
        </div>

        {/* Card */}
        <Card className="shadow-xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg transition-all duration-300 hover:shadow-2xl">
          <CardHeader>
            <CardTitle className="text-xl">Welcome back</CardTitle>
            <CardDescription className="text-gray-500">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="john@example.com"
                  className="focus-visible:ring-2 focus-visible:ring-blue-500 transition"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <span className="text-xs text-blue-600 hover:underline cursor-pointer">
                    Forgot?
                  </span>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  placeholder="••••••••"
                  className="focus-visible:ring-2 focus-visible:ring-blue-500 transition"
                />
              </div>

              {/* Button */}
              <div className="flex justify-center items-center">
                <Button
                  type="submit"
                  className="w-64 bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Sign in
                </Button>
              </div>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 px-2 text-sm text-gray-500">
                Or continue with
              </span>
            </div>

            {/* OAuth */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-all hover:scale-[1.02]"
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  {/* same svg */}
                </svg>
                Google
              </Button>

              <Button
                variant="outline"
                className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-all hover:scale-[1.02]"
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  {/* same svg */}
                </svg>
                GitHub
              </Button>
            </div>

            {/* Footer */}
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition"
              >
                Sign up
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
