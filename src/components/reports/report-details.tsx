"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Bot, Car as CarIcon, Clock, MessageSquare, Send } from "lucide-react";
import { Car, Report } from "@prisma/client";
import { useToast } from "@/hooks/use-toast";
import dayjs from "dayjs";

export function ReportDetails({ report }: { report: Report & { car: Car } }) {
	const { toast } = useToast();

	const handleSubmitForReview = () => {
		toast({
			title: "Report Submitted",
			description:
				"Your report has been sent for review. You'll receive an email confirmation if approved.",
		});
	};

	return (
		<div className="grid gap-6">
			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div className="space-y-1">
							<CardTitle>Vehicle Information</CardTitle>
							<CardDescription>
								Details about the vehicle and reported issues
							</CardDescription>
						</div>
						<Badge
							variant="secondary"
							// className={statusStyles[reportData.status as keyof typeof statusStyles]}
						>
							{/* {reportData.status} */}
						</Badge>
					</div>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="flex items-start gap-4">
						<CarIcon className="h-5 w-5 mt-1 text-muted-foreground" />
						<div className="space-y-1">
							<p className="font-medium">
								{report.car.brand} {report.car.model}
							</p>
							<p className="text-sm text-muted-foreground">
								Current Mileage: {report.car.mileage}
							</p>
						</div>
					</div>

					<div className="flex items-start gap-4">
						<Clock className="h-5 w-5 mt-1 text-muted-foreground" />
						<div className="space-y-1">
							<p className="font-medium">Report Created</p>
							<p className="text-sm text-muted-foreground">
								{dayjs(report.createdAt).format("YYYY-MM-DD HH:mm")}
							</p>
						</div>
					</div>

					<Separator />

					<div className="space-y-4">
						<div>
							<h3 className="font-semibold mb-2">Problem Description</h3>
							<p className="text-muted-foreground">{report.issueText}</p>
						</div>

						<div>
							<h3 className="font-semibold mb-2">Symptoms</h3>
							<p className="text-muted-foreground">symptoms</p>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<div className="flex items-center space-x-4">
						<div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
							<Bot className="h-5 w-5 text-blue-600" />
						</div>
						<div>
							<CardTitle>AI Analysis</CardTitle>
							<CardDescription>
								Diagnostic analysis and recommendations
							</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					{report.aiResponse ? (
						<div className="prose prose-zinc dark:prose-invert max-w-none">
							<div className="whitespace-pre-wrap">{report.aiResponse}</div>
						</div>
					) : (
						<div className="text-center py-8">
							<MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
							<h3 className="font-semibold mb-2">Waiting for Analysis</h3>
							<p className="text-muted-foreground">
								Our AI is currently analyzing your report. This usually takes a
								few minutes.
							</p>
						</div>
					)}
				</CardContent>
				<CardFooter className="flex flex-col items-center space-y-2">
					<Button
						size="sm"
						className="gap-2"
						onClick={handleSubmitForReview}
						disabled={!report.aiResponse}
					>
						<Send className="h-4 w-4" />
						Submit for Review
					</Button>
					<p className="text-sm text-muted-foreground text-center">
						Your report will be reviewed by our automotive experts. If approved,
						you will receive a confirmation email with additional insights and
						recommendations.
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
