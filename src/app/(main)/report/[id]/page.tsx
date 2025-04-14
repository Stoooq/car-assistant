import { DashboardShell } from "@/components/dashboard-shell";
import { ReportDetails } from "@/components/reports/report-details";
import { getReportByReportId } from "@/data/report";

export default async function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  const reportId = (await params).id;

  const report = await getReportByReportId(reportId!)

  console.log(await params)
  console.log(report)

  return (
    <DashboardShell
      title={`Report #${report?.id}`}
      description="View detailed diagnostic report and AI analysis"
      icon="fileText"
    >
      <ReportDetails report={report!} />
    </DashboardShell>
  );
}