import { auth } from "@/auth";
import { DashboardShell } from "@/components/dashboard-shell";
import { DashboardOverview } from "@/components/dashboard/overview";
import { getLastReport } from "@/data/report";

export default async function DashboardPage() {
  const session = await auth()
	const user = session?.user

	if (!user) return

  const lastReport = await getLastReport(user.id!)

  return (
    <DashboardShell
      title="Dashboard"
      description="Overview of your vehicle diagnostics and account status"
      icon="dashboard"
    >
      <DashboardOverview lastReport={lastReport!} credits={user.credits!}/>
    </DashboardShell>
  );
}