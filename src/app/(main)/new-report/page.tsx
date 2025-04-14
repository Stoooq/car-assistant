import { auth } from "@/auth";
import { DashboardShell } from "@/components/dashboard-shell";
import { NewReportForm } from "@/components/new-report/new-report-form";
import { getAllCars } from "@/data/car";
import { getCarList } from "@/data/car-list";

export default async function NewReportPage() {
	const session = await auth()
	const user = session?.user

	if (!user) return

	const cars = await getAllCars(user.id!)

	const carList = await getCarList()

	return (
		<DashboardShell
			title="New Report"
			description="Create a new vehicle diagnostic report"
			icon="plus"
		>
			<div className="space-y-6">
				<div className="space-y-1">
					<h2 className="text-2xl font-semibold tracking-tight">
						Vehicle Details
					</h2>
					<p className="text-sm text-muted-foreground">
						Enter your vehicle information and describe the issue you&apos;re
						experiencing.
					</p>
				</div>
				<NewReportForm cars={cars!} carList={carList!} />
			</div>
		</DashboardShell>
	);
}
