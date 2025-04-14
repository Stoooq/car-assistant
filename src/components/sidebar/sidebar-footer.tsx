"use client"

import { useEffect, useState } from "react";
import { ExtendedUser } from "../../../next-auth";
import { useSidebar } from "../ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogOut, PanelTop, User } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";

export function SidebarFooterContent({ user }: { user: ExtendedUser }) {
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
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="flex items-center w-full">
					<Avatar className="h-8 w-8">
						<AvatarImage src={user.image!} alt="user image" />
						<AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
					</Avatar>
					<div
						className={`ml-3 flex flex-col items-start transition-opacity ${
							showText ? "opacity-100" : "opacity-0"
						} ${state === "collapsed" ? "hidden" : ""}`}
					>
						<p className="text-sm font-medium">{user.name}</p>
						<p className="text-xs text-muted-foreground">{user.email}</p>
					</div>
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" className="w-56">
				<DropdownMenuItem>
					<User className="mr-2 h-4 w-4" />
					<Link href="/profile">Profile</Link>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<PanelTop className="mr-2 h-4 w-4" />
					<Link href="/">Homepage</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<LogOut className="mr-2 h-4 w-4" />
					<button onClick={() => signOut()}>Sign Out</button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}