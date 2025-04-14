import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SessionProvider } from "next-auth/react";

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<SessionProvider>
				<SidebarProvider>
					<AppSidebar />
					<SidebarTrigger />
					{children}
				</SidebarProvider>
		</SessionProvider>
	);
}
