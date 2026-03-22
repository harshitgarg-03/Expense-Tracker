"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useSignup } from "../../hooks/useSignup";
import { signupSchema } from "../../schema";

export function SignUpPage() {
  const { mutate, isPending } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: authProp) => {
    const parsed = signupSchema.safeParse(data);

    if (!parsed.success) {
      alert("invalid input ");
    }

    mutate(parsed.data!);
  };

  return (
    <div className="h-auto flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 px-4">
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
        <Card className="shadow-xl border border-gray-200 dark:border-gray-800 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 transition-all duration-300 hover:shadow-2xl">
          <CardHeader>
            <CardTitle className="text-xl">Create an account</CardTitle>
            <CardDescription>
              Get started with your expense tracking
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  {...register("name")}
                  className="focus-visible:ring-2 focus-visible:ring-blue-500 transition"
                />
                {errors.name && (
                  <p className="text-sm text-red-500 animate-pulse">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  {...register("email")}
                  className="focus-visible:ring-2 focus-visible:ring-blue-500 transition"
                />
                {errors.email && (
                  <p className="text-sm text-red-500 animate-pulse">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                  className="focus-visible:ring-2 focus-visible:ring-blue-500 transition"
                />
                {errors.password && (
                  <p className="text-sm text-red-500 animate-pulse">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Button */}
              <div className="flex justify-center items-center">
                <Button
                  type="submit"
                  className="w-64 bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  disabled={isPending}
                >
                  {isPending ? "Creating account..." : "Create account"}
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
                disabled={isPending}
                className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-all hover:scale-[1.02]"
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  {/* svg same */}
                </svg>
                Google
              </Button>

              <Button
                variant="outline"
                disabled={isPending}
                className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-all hover:scale-[1.02]"
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  {/* svg same */}
                </svg>
                GitHub
              </Button>
            </div>

            {/* Footer */}
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition"
              >
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
