"use client";

import { DashboardShell } from "@/components/dashboard-shell";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

interface ElementType {
	id: string;
	title: string;
	description: string;
}

export default function NewReportPage() {
	const [elements, setElements] = useState<ElementType[]>([]);

	const addElement = () => {
		const id = "id" + Math.random().toString(16).slice(2);
		const newElement = {
			id: id,
			title: "cos",
			description: "des",
		};
		setElements((prev) => [...prev, newElement]);
	};

	const deleteElement = () => {
		setElements((prev) => [...prev.slice(1)]);
	};

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

				<div className="space-y-6">
					<motion.div>
						<Card>
							<CardHeader>
								<CardTitle>test1</CardTitle>
								<CardDescription>des1</CardDescription>
							</CardHeader>
							<CardContent>
								<button onClick={() => addElement()}>kliknij</button>
								<AnimatePresence>
									{elements.map((element) => (
										<motion.div
											layout
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
											key={element.id}
											className="h-20 bg-slate-100"
										>
											{element.title}
											<button onClick={() => deleteElement()}>
												<X />
											</button>
										</motion.div>
									))}
								</AnimatePresence>
							</CardContent>
						</Card>
					</motion.div>
					<Card>
						<CardHeader>
							<CardTitle>test2</CardTitle>
							<CardDescription>des2</CardDescription>
						</CardHeader>
						<CardContent>content</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>test3</CardTitle>
							<CardDescription>des3</CardDescription>
						</CardHeader>
						<CardContent>content</CardContent>
					</Card>
				</div>
			</div>
		</DashboardShell>
	);
}
