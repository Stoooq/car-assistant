import { Report } from "@prisma/client";
import { Badge } from "./ui/badge";

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

export function ReportBadge({ report }: { report: Report }) {
	return (
		<Badge
			variant="secondary"
			className={statusInfo[report.status as keyof typeof statusInfo].styles}
		>
			{statusInfo[report.status as keyof typeof statusInfo].text}
		</Badge>
	);
}
