import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
	Bell,
	Files,
	LayoutDashboard,
	Settings2,
	Sparkles,
} from "lucide-react";
import Link from "next/link";
import { SidebarCarGroup } from "./sidebar-cars-group";
import { SidebarFooterContent } from "./sidebar-footer";
import { SidebarHeaderContent } from "./sidebar-header";
import { getAllCars } from "@/data/car";
import { SidebarCredits } from "./sidebar-credits";
import { getNewNotificationsByUserId } from "@/data/notifications";
import { getCarList } from "@/data/car-list";
import { auth } from "@/auth";

const items = [
	{
		title: "Dashboard",
		url: "/dashboard",
		icon: LayoutDashboard,
	},
	{
		title: "New report",
		url: "/new-report",
		icon: Sparkles,
	},
	{
		title: "Reports",
		url: "/reports",
		icon: Files,
	},
	{
		title: "Notifications",
		url: "/notifications",
		icon: Bell,
	},
	{
		title: "Settings",
		url: "/settings",
		icon: Settings2,
	},
];

export async function AppSidebar() {
	const session = await auth();
	const user = session?.user;

	if (!user) {
		return <>No User Yet</>;
	}

	const cars = await getAllCars(user.id!);

	const carList = await getCarList()

	const notifications = await getNewNotificationsByUserId(user.id!);

	const notificationAmount = notifications?.length;

	return (
		<Sidebar collapsible="icon">
			<SidebarHeader className="p-3">
				<SidebarHeaderContent />
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Credits</SidebarGroupLabel>
					<SidebarCredits credits={user.credits} />
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupLabel>Application</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
									{notificationAmount! > 0 && item.title === "Notifications" ? (
										<SidebarMenuBadge>{notificationAmount}</SidebarMenuBadge>
									) : (
										""
									)}
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupLabel>Your Cars</SidebarGroupLabel>
					<SidebarCarGroup cars={cars ? cars : []} carList={carList!} />
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarFooterContent user={user} />
			</SidebarFooter>
		</Sidebar>
	);
}
