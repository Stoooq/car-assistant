"use client";

import { emailVerification } from "@/actions/email-verification";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

export default function EmailVerificationPage() {
	const searchParams = useSearchParams();
	const token = searchParams.get("token");

	const onSubmit = useCallback(() => {
		if (!token) {
			return;
		}
		emailVerification(token);
	}, [token]);

	useEffect(() => {
		onSubmit();
	}, [onSubmit]);

	return (
		<div className="min-h-screen bg-gradient-to-b from-zinc-100 to-white dark:from-zinc-900 dark:to-zinc-800 flex items-center justify-center p-4">
			<div className="max-w-md w-full z-20">
				<div className="flex flex-col items-center text-center mb-8">
					{status === "success" ? (
						<>
							<div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mb-4">
								<CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-500" />
							</div>
							<h1 className="text-3xl font-bold">Email Verified!</h1>
							<p className="text-zinc-600 dark:text-zinc-300 mt-2">
								Your email has been successfully verified. You can now access
								all features of AutoBot Assistant.
							</p>
						</>
					) : (
						<>
							<div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-4">
								<XCircle className="w-8 h-8 text-red-600 dark:text-red-500" />
							</div>
							<h1 className="text-3xl font-bold">Verification Failed</h1>
							<p className="text-zinc-600 dark:text-zinc-300 mt-2">
								The verification link appears to be invalid or has expired.
								Please request a new verification email.
							</p>
						</>
					)}
				</div>

				<div className="bg-white dark:bg-zinc-800/50 rounded-xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-700">
					{status === "success" ? (
						<div className="space-y-4">
							<Link href="/report">
								<Button className="w-full">Start Using AutoBot</Button>
							</Link>
						</div>
					) : (
						<div className="space-y-4">
							<Button className="w-full" variant="outline">
								Resend Verification Email
							</Button>
							<div className="text-center">
								<Link
									href="/sign-in"
									className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
								>
									Back to Sign In
								</Link>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
