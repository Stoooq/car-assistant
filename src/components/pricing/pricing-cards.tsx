"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Check, Zap } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";

const tiers = [
	{
		name: "Starter",
		description: "Perfect for occasional diagnostics",
		price: "€9",
		priceId: "price_1QTUCTJzRKoVo1vS75bZV0GE",
		credits: 5,
		features: [
			"5 AI-powered diagnostic reports",
			"Email support",
		],
		popular: false,
	},
	{
		name: "Pro",
		description: "Ideal for regular maintenance",
		price: "€29",
		priceId: "price_1QTUEiJzRKoVo1vS3aIBg3gD",
		credits: 20,
		features: [
			"20 AI-powered diagnostic reports",
			"Email support",
			"Extension for part recommendations",
		],
		popular: true,
	},
	{
		name: "Business",
		description: "Best for automotive professionals",
		price: "€59",
		priceId: "price_1QTUF5JzRKoVo1vSpnI4q9wF",
		credits: 50,
		features: [
			"50 AI-powered diagnostic reports",
			"Email support",
			"Extension for part recommendations",
			"Priority support",
		],
		popular: false,
	},
];

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined)
	throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export function PricingCards() {
  const router = useRouter()

	const handlePurchase = async (e: FormEvent<HTMLFormElement>, priceId: string, credits: number) => {
    e.preventDefault()
		const response = await fetch("/api/checkout", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ priceId, credits }),
		});
    const data = await response.json()
    router.push(data.url)
	};

	return (
		<div className="grid md:grid-cols-3 gap-8">
			{tiers.map((tier) => (
				<form key={tier.name} onSubmit={(e) => handlePurchase(e, tier.priceId, tier.credits)}>
					<Card
						className={`relative ${
							tier.popular
								? "border-blue-600 dark:border-blue-500 shadow-lg"
								: ""
						}`}
					>
						{tier.popular && (
							<div className="absolute -top-4 left-1/2 -translate-x-1/2">
								<div className="bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full flex items-center gap-1">
									<Zap className="w-4 h-4" />
									Most Popular
								</div>
							</div>
						)}

						<CardHeader>
							<CardTitle className="text-2xl">{tier.name}</CardTitle>
							<CardDescription>{tier.description}</CardDescription>
						</CardHeader>

						<CardContent className="space-y-6">
							<div className="space-y-2">
								<span className="text-4xl font-bold">{tier.price}</span>
								<p className="text-sm text-muted-foreground">
									{tier.credits} diagnostic credits
								</p>
							</div>

							<ul className="space-y-3">
								{tier.features.map((feature) => (
									<li key={feature} className="flex items-start gap-2">
										<Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
										<span className="text-muted-foreground">{feature}</span>
									</li>
								))}
							</ul>
						</CardContent>

						<CardFooter>
							<Button
								type="submit"
								className={`w-full ${
									tier.popular ? "bg-blue-600 hover:bg-blue-700" : ""
								}`}
							>
								Get Started
							</Button>
						</CardFooter>
					</Card>
				</form>
			))}
		</div>
	);
}
