import {
	Bell,
	CreditCardIcon,
	FileText,
	LayoutDashboard,
	Plus,
	Settings,
	User,
} from "lucide-react";
import { ReactNode } from "react";
import { Breadcrumb } from "./breadcrumb";

interface DashboardShellProps {
	children: ReactNode;
	title: string;
	description: string;
	icon:
		| "fileText"
		| "settings"
		| "user"
		| "plus"
		| "bell"
		| "dashboard"
		| "creditCard";
}

const icons = {
	fileText: FileText,
	settings: Settings,
	user: User,
	plus: Plus,
	bell: Bell,
	dashboard: LayoutDashboard,
	creditCard: CreditCardIcon,
};

export function DashboardShell({
	children,
	title,
	description,
	icon,
}: DashboardShellProps) {
	const Icon = icons[icon];

	return (
		<div className="flex-1 space-y-8 p-8 pt-3 container mx-auto">
			<Breadcrumb />
			<div className="flex items-center justify-between space-y-2">
				<div className="flex items-center space-x-4">
					<div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
						<Icon className="h-6 w-6 text-blue-600" />
					</div>
					<div>
						<h2 className="text-3xl font-bold tracking-tight">{title}</h2>
						<p className="text-muted-foreground">{description}</p>
					</div>
				</div>
			</div>
			<div className="space-y-4">{children}</div>
		</div>
	);
}
