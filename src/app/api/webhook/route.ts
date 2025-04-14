import { NextResponse, type NextRequest } from "next/server";
import { getUserByEmail } from "@/data/user";
import { stripe } from "@/lib/stripe";
import db from "@/lib/db";

export async function POST(request: NextRequest) {
	const body = await request.text();
	// const response = JSON.parse(body);
	// console.log(response)

	const signature = request.headers.get("Stripe-Signature");

	let event;
	try {
		event = stripe.webhooks.constructEvent(
			body,
			signature!,
			process.env.STRIPE_WEBHOOK_SECRET!
		);

		if (event.type === "checkout.session.completed") {
			const session = event.data.object;
			if (!session.customer_details?.email)
				return NextResponse.json(
					{ error: "Failed while verifying email" },
					{ status: 500 }
				);

			const user = await getUserByEmail(session.customer_details?.email);
			if (!user)
				return NextResponse.json(
					{ error: "Failed while verifying user" },
					{ status: 500 }
				);

			const credits = session.metadata?.credits;
			if (!credits)
				return NextResponse.json(
					{ error: "Failed while verifying number of credits" },
					{ status: 500 }
				);

			await db.user.update({
				where: {
					id: user.id,
				},
				data: {
					credits: {
						increment: Number(credits),
					},
				},
			});
		}

		return NextResponse.json(
			{ success: "Credits added" },
			{ status: 200 }
		);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: `Webhook signature verification failed: ${error}` },
			{ status: 400 }
		);
	}
}
