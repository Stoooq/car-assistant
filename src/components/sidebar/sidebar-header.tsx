"use client"

import { useEffect, useState } from "react";
import { useSidebar } from "../ui/sidebar";
import Link from "next/link";
import { Bot } from "lucide-react";

export function SidebarHeaderContent() {
	const { state } = useSidebar();
	const [showText, setShowText] = useState(false);

	useEffect(() => {
		if (state === "expanded") {
			const timer = setTimeout(() => setShowText(true), 100);
			return () => clearTimeout(timer);
		} else {
			setShowText(false);
		}
	}, [state]);

	return (
		<Link href="/" className="flex items-center gap-4 h-8">
			<div className="flex items-center justify-center">
				<Bot className="text-blue-600" />
			</div>
			<span
				className={`font-semibold text-lg transition-opacity ${
					showText ? "opacity-100" : "opacity-0"
				} ${state === "collapsed" ? "hidden" : ""}`}
			>
				Car Assistant
			</span>
		</Link>
	);
}