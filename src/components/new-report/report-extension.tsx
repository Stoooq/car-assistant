"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { LucideProps, ShoppingBag, Wrench } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type ExtensionType = "" | "parts" | "maintenance";

type ReportExtension = {
	id: ExtensionType;
	label: string;
	description: string;
	icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
	promptGuide: string;
};

const reportExtensions: ReportExtension[] = [
	{
		id: "parts",
		label: "Parts Recommendation",
		description:
			"Receive suggestions for replacement parts with pricing and compatibility",
		icon: ShoppingBag,
		promptGuide:
			"Specify any brand preferences, budget constraints, or specific part requirements",
	},
	{
		id: "maintenance",
		label: "Maintenance Plan",
		description: "Get a customized maintenance schedule and recommendations",
		icon: Wrench,
		promptGuide:
			"Include your typical driving conditions, maintenance history, and future plans",
	},
];

interface ReportExtensionProps {
	selectedExtensions: ExtensionType[];
	onExtensionChange: (extensions: ExtensionType[]) => void;
}

export function ReportExtension({
	selectedExtensions,
	onExtensionChange,
}: ReportExtensionProps) {
	const handleCheckboxChange = (extensionId: ExtensionType) => {
		const newExtension = selectedExtensions.includes(extensionId)
			? selectedExtensions.filter((id) => id !== extensionId)
			: [...selectedExtensions, extensionId];
		onExtensionChange(newExtension);
	};

	return (
		<div className="grid gap-6">
			{reportExtensions.map((extension) => {
				const Icon = extension.icon;
				return (
					<div
						key={extension.id}
						className="flex items-start space-x-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
					>
						<Checkbox
							id={extension.id}
							checked={selectedExtensions.includes(extension.id)}
							onCheckedChange={() => handleCheckboxChange(extension.id)}
							className="mt-1"
						/>
						<div className="grid gap-1.5">
							<div className="flex items-center gap-2">
								<Label
									htmlFor={extension.id}
									className="font-medium cursor-pointer"
								>
									<div className="flex items-center gap-2">
										<Icon className="h-4 w-4 text-muted-foreground" />
										{extension.label}
									</div>
								</Label>
							</div>
							<p className="text-sm text-muted-foreground">
								{extension.description}
							</p>
							{selectedExtensions.includes(extension.id) && (
								<p className="text-sm text-blue-600 dark:text-blue-400">
									Tip: {extension.promptGuide}
								</p>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
}
