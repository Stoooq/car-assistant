import { Button } from "@/components/ui/button";
import { DashboardShell } from "@/components/dashboard-shell";
import { ReportsTable } from "@/components/reports/reports-table";
import { Plus } from "lucide-react";
import Link from "next/link";
import { auth } from "@/auth";
import { getAllReports } from "@/data/report";

export default async function ReportsPage() {
  const session = await auth()
	const user = session?.user

	if (!user) return

  const reports = await getAllReports(user.id!)

  return (
    <DashboardShell
      title="Reports"
      description="View and manage your vehicle diagnostic reports"
      icon="fileText"
    >
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">All Reports</h2>
          <p className="text-sm text-muted-foreground">
            A list of all your diagnostic reports and their current status.
          </p>
        </div>
        <Link href="/new-report">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Report
          </Button>
        </Link>
      </div>
      <ReportsTable reports={reports!} />
    </DashboardShell>
  );
}