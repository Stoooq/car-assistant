import Link from "next/link";
import { SidebarContent, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { Wallet } from "lucide-react";

export function SidebarCredits({ credits }: { credits: number }) {
	return (
		<SidebarContent>
			<SidebarMenu>
				<SidebarMenuItem>
					<SidebarMenuButton asChild>
						<Link href={"/pricing"}>
							<Wallet />
							<span>Credits Available</span>
						</Link>
					</SidebarMenuButton>
					<SidebarMenuBadge>{credits}</SidebarMenuBadge>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarContent>
	);
}
