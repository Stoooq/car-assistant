import { auth } from "@/auth";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bot, Cpu, Gauge, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Suspense } from "react";

const features = [
	{
		icon: <Bot className="w-6 h-6 text-blue-600" />,
		title: "AI-Powered Analysis",
		description:
			"Get instant, accurate diagnostics powered by advanced artificial intelligence",
	},
	{
		icon: <Cpu className="w-6 h-6 text-blue-600" />,
		title: "Smart Recommendations",
		description:
			"Receive detailed solutions and maintenance tips from our AI system",
	},
	{
		icon: <Gauge className="w-6 h-6 text-blue-600" />,
		title: "Real-time Monitoring",
		description:
			"Track your vehicle's diagnosis progress and get instant updates",
	},
];

export default async function Home() {
	// const { setTheme } = useTheme();
	const session = await auth();
	const user = session?.user;

	return (
		<main className="min-h-[calc(100vh-4rem)] pt-16">
			<Suspense fallback={"Loading..."}>
				<Navbar user={user || null} />
			</Suspense>
			<div className="container mx-auto px-4 py-16">
				<div className="flex flex-col items-center text-center space-y-8">
					<div className="relative">
						<div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 opacity-75 blur"></div>
						<div className="relative bg-white dark:bg-zinc-900 rounded-full p-4">
							<Bot className="w-12 h-12 text-blue-600" />
						</div>
					</div>

					<h1 className="text-4xl md:text-5xl font-bold tracking-tight">
						AI-Powered Car Diagnostics
					</h1>

					<p className="text-xl text-zinc-600 dark:text-zinc-300 max-w-2xl">
						Experience intelligent vehicle diagnostics with our AI assistant.
						Get instant insights and expert recommendations for your car
						problems.
					</p>

					<div className="flex flex-col sm:flex-row gap-4">
						<Link href="/report">
							<Button size="lg" className="gap-2">
								<Gauge className="w-4 h-4" />
								Start Diagnosis
							</Button>
						</Link>
						<Link href="/reports">
							<Button size="lg" variant="outline" className="gap-2">
								View Reports
							</Button>
						</Link>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline" size="icon">
									<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
									<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
									<span className="sr-only">Toggle theme</span>
								</Button>
							</DropdownMenuTrigger>
							{/* <DropdownMenuContent align="end">
								<DropdownMenuItem onClick={() => setTheme("light")}>
									Light
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setTheme("dark")}>
									Dark
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setTheme("system")}>
									System
								</DropdownMenuItem>
							</DropdownMenuContent> */}
						</DropdownMenu>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
						{features.map((feature, index) => (
							<div
								key={index}
								className="flex flex-col items-center p-6 rounded-xl bg-white dark:bg-zinc-800/50 shadow-sm border border-zinc-200 dark:border-zinc-700"
							>
								<div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mb-4">
									{feature.icon}
								</div>
								<h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
								<p className="text-zinc-600 dark:text-zinc-300">
									{feature.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</main>
	);
}
