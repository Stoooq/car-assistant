"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Bot } from "lucide-react";
import Link from "next/link";
import { NewPasswordSchema } from "@/schemas";

export default function NewPasswordPage() {
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof NewPasswordSchema>) {
    console.log(values);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-100 to-white dark:from-zinc-900 dark:to-zinc-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full z-20">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/20 mb-4">
            <Bot className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold">Create new password</h1>
          <p className="text-zinc-600 dark:text-zinc-300 mt-2">
            Enter your new password below
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-800/50 rounded-xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-700">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Update Password
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <Link
              href="/sign-in"
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}