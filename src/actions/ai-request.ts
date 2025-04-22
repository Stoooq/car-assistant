"use server";

import { auth } from "@/auth";
import { getCarByCarId } from "@/data/car";
import { newReportSchema } from "@/schemas";
import { z } from "zod";
// import { createOllama } from "ollama-ai-provider";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import db from "@/lib/db";
import { createNotification } from "./create-notification";
import { error } from "console";

// const ollama = createOllama();

export const aiRequest = async (
	values: z.infer<typeof newReportSchema>,
	reportId: string,
	credits: number
) => {
	const validation = newReportSchema.safeParse(values);
	if (!validation.success) return { error: "Invalid fields" };

	const { carId, description } = validation.data;

	const session = await auth();
	if (!session) return { error: "Not Authorized" };

	const user = session.user;

	const car = await getCarByCarId(carId);
	if (!car) return { error: "Car not found" };

	try {
		if (session.user.id === "cm9ll9mn80004lz70ybjidet6") {
			const { text } = await generateText({
				model: openai("gpt-4o"),
				prompt: `You are an experienced automotive mechanic with 20 years of experience. Your role is to provide accurate car diagnostics and suggest solutions. Based on the provided information:

Car Make: ${car?.brand}
Model: ${car?.model}
Year: ${car?.year}
Mileage: ${car?.mileage}
Problem Description: ${description}

Conduct the following analysis:

INITIAL DIAGNOSIS:

List 3-4 most likely causes of the described problem
Consider common issues specific to this model and year
Take into account the vehicle's mileage in your analysis

SOLUTION:

Provide detailed repair steps for each potential cause
Specify which repairs can be DIY and which require professional service
Estimate repair time frames

PARTS REPLACEMENT:

List specific parts that may need replacement
Provide approximate parts costs (price range)
Suggest both OEM parts and quality aftermarket alternatives

PREVENTION:

Advise how to prevent similar issues in the future
Suggest appropriate service intervals
Recommend specific maintenance products or fluids

ADDITIONAL NOTES:

Warn about potential consequences of ignoring the problem
Point out related components that should be checked
Recommend additional diagnostics if needed

Response should always be:
✓ Detailed yet understandable for non-mechanics
✓ Specific to the particular model
✓ Focused on practical solutions
✓ Including safety warnings and risks`,
			});

			await db.report.update({
				where: {
					id: reportId,
				},
				data: {
					status: "COMPLETED",
					aiResponse: text,
				},
			});

			await db.user.update({
				where: {
					id: user.id,
				},
				data: {
					credits: {
						decrement: Number(credits),
					},
				},
			});

			const notificationTitle = `Your ${car.brand} ${car.model} report was completed successfully`;

			const notificationDescription = `Report sent: ${description}`;

			await createNotification(notificationTitle, notificationDescription);

			return { success: "AI analysis completed" };
		} else {
			return { error: "Not Authorized" };
		}
	} catch (error) {
		console.error("AI Request failed:", error);
		return { error: "Failed to generate AI response" };
	}
};
