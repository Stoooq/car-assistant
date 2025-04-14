"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, CreditCard, FileText, Plus } from "lucide-react";
import Link from "next/link";
import { Car, Report } from "@prisma/client";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ReportBadge } from "../report-badge";

const notifications = [
	{
		id: 1,
		title: "Report Analysis Complete",
		message: "Your diagnostic report AI001 has been analyzed",
		time: "2 hours ago",
	},
	{
		id: 2,
		title: "Maintenance Reminder",
		message: "Time for your Toyota Camry's oil change",
		time: "1 day ago",
	},
];

export function DashboardOverview({
	lastReport,
	credits,
}: {
	lastReport: Report & { car: Car };
	credits: number;
}) {
	const { toast } = useToast();
	const router = useRouter();
	const searchParams = useSearchParams();
	const success = searchParams.get("success");
	const canceled = searchParams.get("canceled");

	useEffect(() => {
		if (success || canceled) {
			if (success) {
				toast({
					variant: "default",
					title: "Payment Successful",
					description: "Your payment has been processed successfully.",
				});
			}
			if (canceled) {
				toast({
					variant: "destructive",
					title: "Payment Canceled",
					description: "Your payment was not completed.",
				});
			}

			router.replace("/dashboard");
		}
	}, [success, canceled, router, toast]);

	return (
		<div className="grid gap-6 md:grid-cols-2">
			<Card className="md:col-span-2">
				<CardHeader>
					<div className="flex items-center justify-between">
						<div>
							<CardTitle>Recent Report</CardTitle>
							<CardDescription>
								Your most recent diagnostic report
							</CardDescription>
						</div>
						<Link href="/new-report">
							<Button size="sm" className="gap-2">
								<Plus className="h-4 w-4" />
								New Report
							</Button>
						</Link>
					</div>
				</CardHeader>
				<CardContent>
					{lastReport ? (
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<div className="space-y-1">
									<p className="text-sm font-medium">{lastReport.id}</p>
									<p className="text-lg font-semibold">
										{lastReport.car.brand} {lastReport.car.model}
									</p>
								</div>
								<ReportBadge report={lastReport} />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">
									{lastReport.issueText}
								</p>
							</div>
							<div className="flex items-center justify-between">
								<p className="text-sm text-muted-foreground">
									Created{" "}
									{dayjs(lastReport.createdAt).format("YYYY-MM-DD HH:mm")}
								</p>
								<Button
									variant="outline"
									size="sm"
									disabled={lastReport.status === "PENDING"}
								>
									<Link href={`/report/${lastReport.id}`}>View Details</Link>
								</Button>
							</div>
						</div>
					) : (
						<div className="flex flex-col items-center justify-center py-8 text-center">
							<FileText className="h-12 w-12 text-muted-foreground mb-4" />
							<p className="text-lg font-semibold mb-2">No Reports Yet</p>
							<p className="text-sm text-muted-foreground mb-4">
								Create your first diagnostic report to get started
							</p>
							<Link href="/new-report">
								<Button>Create Report</Button>
							</Link>
						</div>
					)}
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Bell className="h-5 w-5" />
						Notifications
					</CardTitle>
					<CardDescription>Recent updates and alerts</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{notifications.length > 0 ? (
							notifications.map((notification) => (
								<div
									key={notification.id}
									className="flex flex-col space-y-2 border-b last:border-0 pb-4 last:pb-0"
								>
									<div className="flex items-center justify-between">
										<p className="font-medium">{notification.title}</p>
										<span className="text-xs text-muted-foreground">
											{notification.time}
										</span>
									</div>
									<p className="text-sm text-muted-foreground">
										{notification.message}
									</p>
								</div>
							))
						) : (
							<div className="text-center py-6">
								<p className="text-muted-foreground">No new notifications</p>
							</div>
						)}
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<CreditCard className="h-5 w-5" />
						Diagnostic Credits
					</CardTitle>
					<CardDescription>Your remaining report credits</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-2xl font-bold">{credits}</p>
								<p className="text-sm text-muted-foreground">
									Credits Remaining
								</p>
							</div>
						</div>
						<Button variant="outline" className="w-full" asChild>
							<Link href={"/pricing"}>Get More Credits</Link>
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
