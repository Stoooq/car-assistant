"use server";

import { auth } from "@/auth";
import db from "@/lib/db";

export const createNotification = async (
	title: string,
	description: string
) => {
	const session = await auth();

	if (!session) return { error: "Not Authorized" };

	const user = session.user;

	await db.notification.create({
		data: {
			userId: user.id!,
			seen: false,
			title,
			description,
		},
	});

	return { success: "Notification created" };
};
