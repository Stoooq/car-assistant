"only server";

import db from "@/lib/db";

export const getNotificationsByUserId = async (userId: string) => {
	try {
		const notifications = await db.notification.findMany({
			where: { userId },
			orderBy: { createdAt: "desc" },
		});
		return notifications;
	} catch {
		return null;
	}
};

export const getNewNotificationsByUserId = async (userId: string) => {
	try {
		const notifications = await db.notification.findMany({
			where: { userId, seen: false },
			orderBy: { createdAt: "desc" },
		});
		return notifications;
	} catch {
		return null;
	}
};
