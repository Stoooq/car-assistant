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
import { LoginSchema } from "@/schemas";
import { useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import { signInAction } from "@/actions/sign-in";
import { useRouter } from "next/navigation";

export default function SignInPage() {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const { toast } = useToast();

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	function onSubmit(values: z.infer<typeof LoginSchema>) {
		startTransition(() => {
			signInAction(values)
				.then((data) => {
					if (data?.error) {
						toast({
							variant: "destructive",
							title: data.error,
						});
					}
					if (data?.success) {
						toast({
							variant: "default",
							title: data.success,
						});
						router.push("/dashboard");
					}
					form.reset();
				})
				.catch(() => {
					toast({
						variant: "destructive",
						title: "Something went wrong",
					});
				});
		});
	}

	return (
		<div className="min-h-screen bg-gradient-to-b from-zinc-100 to-white dark:from-zinc-900 dark:to-zinc-800 flex items-center justify-center p-4">
			<div className="max-w-md w-full z-20">
				<div className="relative">
					<div className="flex flex-col items-center text-center mb-8">
						<div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/20 mb-4">
							<Bot className="w-6 h-6 text-blue-600" />
						</div>
						<h1 className="text-3xl font-bold">Welcome back</h1>
						<p className="text-zinc-600 dark:text-zinc-300 mt-2">
							Sign in to your AutoBot Assistant account
						</p>
					</div>
				</div>

				<div className="bg-white dark:bg-zinc-800/50 rounded-xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-700">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input placeholder="john.doe@example.com" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												type="password"
												placeholder="••••••••"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="text-right">
								<Link
									href="/reset-password"
									className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
								>
									Forgot password?
								</Link>
							</div>

							<Button type="submit" className="w-full" disabled={isPending}>
								Sign In
							</Button>
						</form>
					</Form>

					<div className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
						Don&apos;t have an account?{" "}
						<Link
							href="/sign-up"
							className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
						>
							Sign up
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
