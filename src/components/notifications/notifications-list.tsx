"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Notification } from "@prisma/client";
import { X } from "lucide-react";
import { useEffect, useTransition } from "react";
import { updateNotification } from "@/actions/update-notification";
import { useRouter } from "next/navigation";
import { deleteNotification } from "@/actions/deleteNotification";
import { motion, AnimatePresence } from "motion/react";

export default function NotificationsList({
	notifications,
}: {
	notifications: Notification[];
}) {
	const [isPending, startTransition] = useTransition();

	const router = useRouter();

	useEffect(() => {
		const unseenNotifications = notifications.filter(
			(notification) => notification.seen === false
		);

		unseenNotifications.map((notification) => {
			updateNotification(notification);
		});
	}, [notifications]);

	const handleDelete = (notificationId: string) => {
		startTransition(() => {
			deleteNotification(notificationId).then(() => {
				router.refresh();
			});
		});
	};

	return (
		<>
			<AnimatePresence>
				{notifications.length > 0 ? (
					<>
						<AnimatePresence>
							{notifications.map((notification) => (
								<motion.div
									key={notification.id}
									exit={{ x: 60, opacity: 0 }}
									layout
								>
									<Card
										className={`flex ${notification.seen ? "bg-muted" : ""}`}
										key={notification.id}
									>
										<CardHeader>
											<CardTitle>{notification.title}</CardTitle>
											<CardDescription>
												{notification.description}
											</CardDescription>
										</CardHeader>
										<CardContent className="p-6 flex justify-end items-center flex-1">
											<button
												onClick={() => handleDelete(notification.id)}
												disabled={isPending}
											>
												<X />
											</button>
										</CardContent>
									</Card>
								</motion.div>
							))}
						</AnimatePresence>
					</>
				) : (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="flex justify-center text-muted-foreground"
					>
						You don&apos;t have any notificatins
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
