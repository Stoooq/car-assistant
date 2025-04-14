import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const priceId = body.priceId;
		const credits = body.credits;

		if (!priceId) {
			return NextResponse.json(
				{ error: "Price ID is required" },
				{ status: 400 }
			);
		}

		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			line_items: [
				{
					price: priceId,
					quantity: 1,
				},
			],
			mode: "payment",
			success_url: `http://localhost:3000/dashboard?success=true`, //?request.headers.get('origin')
			cancel_url: `http://localhost:3000/dashboard?canceled=true`,
			metadata: {
				credits: credits,
			},
		});
		return NextResponse.json({ url: session.url });
	} catch (error) {
		console.error(`Error creating Stripe session: ${error}`);
		return NextResponse.json(
			{ error: "Unable to create session" },
			{ status: 500 }
		);
	}
}
