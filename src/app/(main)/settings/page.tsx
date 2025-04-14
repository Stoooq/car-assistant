import { auth } from "@/auth";
import { DashboardShell } from "@/components/dashboard-shell";
import { SettingsTabs } from "@/components/settings/settings-tabs";

export default async function SettingsPage() {
  const session = await auth()
  const user = session?.user

  return (
    <DashboardShell
      title="Settings"
      description="Manage your account settings and preferences"
      icon="settings"
    >
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Account Settings</h2>
          <p className="text-sm text-muted-foreground">
            Manage your account settings and set email preferences.
          </p>
        </div>
        <SettingsTabs user={user!} />
      </div>
    </DashboardShell>
  );
}