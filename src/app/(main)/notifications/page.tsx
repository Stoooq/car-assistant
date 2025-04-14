import { auth } from "@/auth";
import { DashboardShell } from "@/components/dashboard-shell";
import NotificationsList from "@/components/notifications/notifications-list";
import { getNotificationsByUserId } from "@/data/notifications";

export default async function NotificationsPage() {
	const session = await auth();
	const user = session?.user;

	if (!user) return;

	const notifications = await getNotificationsByUserId(user.id!);

	return (
		<DashboardShell
			title="Notification"
			description="Manage your notifications"
			icon="bell"
		>
			<div className="space-y-6">
				{/* <div className="space-y-1">
					<h2 className="text-2xl font-semibold tracking-tight">
						Account Settings
					</h2>
					<p className="text-sm text-muted-foreground">
						Manage your account settings and set email preferences.
					</p>
				</div> */}
				<NotificationsList notifications={notifications!} />
			</div>
		</DashboardShell>
	);
}
