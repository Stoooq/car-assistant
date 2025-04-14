"use server";

import { auth } from "@/auth";
import db from "@/lib/db";

export const deleteCar = async (carId: string) => {
	const session = await auth();

	if (!session) return { error: "Not Authorized" };

	await db.report.deleteMany({
		where: {
			carId,
		},
	});

	await db.car.delete({
		where: {
			id: carId,
		},
	});

	return { success: "Car deleted" };
};
