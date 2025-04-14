"use server";

import { auth } from "@/auth";
import db from "@/lib/db";

export const deleteNotification = async (notificationId: string) => {
	const session = await auth();

	if (!session) return { error: "Not Authorized" };

	await db.notification.delete({
		where: {
			id: notificationId,
		},
	});

	return { success: "Notification deleted" };
};
