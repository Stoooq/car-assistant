import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Car, Report } from "@prisma/client";
import dayjs from "dayjs";
import { ReportBadge } from "../report-badge";

const statusInfo = {
	PENDING: {
		text: "Pending",
		styles: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500",
	},
	COMPLETED: {
		text: "Completed",
		styles:
			"bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500",
	},
	IN_REVIEW: {
		text: "In Review",
		styles:
			"bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500",
	},
};

export function ReportsTable({
	reports,
}: {
	reports: (Report & { car: Car })[];
}) {
	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Report ID</TableHead>
						<TableHead>Vehicle</TableHead>
						<TableHead>Problem</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Date</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{reports.map((report) => (
						<TableRow key={report.id}>
							<TableCell className="font-mono">#{report.id}</TableCell>
							<TableCell>
								{report.car.brand} {report.car.model}
							</TableCell>
							<TableCell className="max-w-xs truncate">
								{report.issueText}
							</TableCell>
							<TableCell>
								<ReportBadge report={report} />
							</TableCell>
							<TableCell>
								{dayjs(report.createdAt).format("YYYY-MM-DD HH:mm")}
							</TableCell>
							<TableCell>
								<Button
									variant="outline"
									size="sm"
									disabled={report.status === "PENDING"}
								>
									<Link href={`/report/${report.id}`}>View Details</Link>
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
