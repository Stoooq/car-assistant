"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bot, FileText, LogOut } from "lucide-react";
import Link from "next/link";
import { ExtendedUser } from "../../next-auth";
import { signOut } from "next-auth/react";

export function Navbar({ user }: { user: ExtendedUser | null }) {
	return (
		<header className="fixed top-0 left-0 right-0 border-b border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-xl z-50">
			<div className="container mx-auto px-4 h-16 flex items-center justify-between">
				<Link href="/" className="flex items-center space-x-2">
					<div className="flex items-center justify-center">
						<Bot className="h-6 w-6 text-blue-600" />
					</div>
					<span className="font-semibold text-lg">AutoBot Assistant</span>
				</Link>
				{user ? (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								className="relative h-10 w-10 rounded-full"
							>
								<Avatar className="h-8 w-8">
									<AvatarImage src={user.image!} alt="user image" />
									<AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
								</Avatar>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56" align="end">
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<Link href="/reports">
								<DropdownMenuItem className="cursor-pointer">
									<div className="flex items-center justify-center w-4 h-4 mr-2">
										<FileText className="h-4 w-4" />
									</div>
									<span>My Reports</span>
								</DropdownMenuItem>
							</Link>
							<DropdownMenuItem className="cursor-pointer text-red-600 dark:text-red-400">
								<LogOut className="mr-2 h-4 w-4" />
								<button onClick={() => signOut()}>Sign Out</button>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				) : (
					<div className="flex gap-4">
						<Button variant="link" asChild>
							<Link href="/sign-in">Sign in</Link>
						</Button>
						<Button variant="link" asChild>
							<Link href="/sign-up">Sign up</Link>
						</Button>
					</div>
				)}
			</div>
		</header>
	);
}
