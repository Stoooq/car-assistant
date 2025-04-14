"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Car as CarIcon, Plus } from "lucide-react";
import { NewCarForm } from "../new-car-form";
import { Car, CarList } from "@prisma/client";
import { newReportSchema } from "@/schemas";
import { aiRequest } from "@/actions/ai-request";
import { createReport } from "@/actions/create-report";
import { ExtensionType, ReportExtension } from "./report-extension";
import { CreditCounter } from "./credit-counter";
import { motion, AnimatePresence } from "motion/react";

export function NewReportForm({ cars, carList }: { cars: Car[], carList: CarList[] }) {
	const [isPending, startTransition] = useTransition();

	const { toast } = useToast();

	const searchParams = useSearchParams();
	const carId = searchParams.get("carId");

	const router = useRouter();
	const [selectedVehicle, setSelectedVehicle] = useState<Car>();
	const [isSelectOpen, setIsSelectOpen] = useState(false);
	const [isCreateOpen, setIsCreateOpen] = useState(false);
	const [selectedExtensions, setSelectedExtensions] = useState<ExtensionType[]>(
		[]
	);

	const CREDIT_COSTS = {
		parts: 2,
		maintenance: 2,
	};

	const totalCredits = selectedExtensions.reduce(
		(total, extension) =>
			total + (CREDIT_COSTS[extension as keyof typeof CREDIT_COSTS] || 0),
		1
	);

	const form = useForm<z.infer<typeof newReportSchema>>({
		resolver: zodResolver(newReportSchema),
		defaultValues: {
			description: "",
			reportExtensions: [""],
		},
	});

	async function onSubmit(values: z.infer<typeof newReportSchema>) {
		toast({
			title: "Creating Report",
			description: "Your diagnostic report is being processed...",
		});

		startTransition(async () => {
			try {
				const reportResult = await createReport(values, totalCredits);

				if (reportResult.error) {
					toast({
						variant: "destructive",
						title: "Error",
						description: reportResult.error,
					});
					return;
				}

				if (reportResult.success && reportResult.newReport) {
					aiRequest(values, reportResult.newReport.id).then((aiResult) => {
						if (aiResult.error) {
							toast({
								variant: "destructive",
								title: "AI Analysis Failed",
								description: aiResult.error,
							});
						}

						if (aiResult.success) {
							toast({
								variant: "default",
								title: "Report Created",
								description: "AI analysis completed successfully.",
							});
						}
						router.refresh();
					});
					setTimeout(() => {
						router.push("/reports");
					});
				}
			} catch (error) {
				toast({
					variant: "destructive",
					title: "Error",
					description: "Something went wrong. Please try again.",
				});
			}
		});
	}

	useEffect(() => {
		if (carId) {
			const car = cars.find((car) => car.id === carId);
			setSelectedVehicle(car);
		}
		if (selectedVehicle) {
			const exists = cars.find((car) => car.id === selectedVehicle.id);
			if (!exists) setSelectedVehicle(undefined);
		}
	}, [cars]);

	const handleExtensionChange = (extensions: ExtensionType[]) => {
		setSelectedExtensions(extensions);
		form.setValue("reportExtensions", extensions);
	};

	return (
		<Form {...form}>
			{/* <AnimatePresence> */}
			<motion.form
				// layout
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-6"
			>
				<Card>
					<CardHeader>
						<CardTitle>Vehicle Selection</CardTitle>
						<CardDescription>
							Choose an existing vehicle or add a new one.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="flex flex-col items-center space-y-4">
							<div className="flex gap-20">
								<Dialog open={isSelectOpen} onOpenChange={setIsSelectOpen}>
									<DialogTrigger asChild>
										<Button variant="outline" className="w-[200px]">
											<CarIcon className="mr-2 h-4 w-4" />
											Select Vehicle
										</Button>
									</DialogTrigger>
									<DialogContent>
										<DialogHeader>
											<DialogTitle>Select a Vehicle</DialogTitle>
											<DialogDescription>
												Choose from your existing vehicles
											</DialogDescription>
										</DialogHeader>
										<div className="grid gap-4 py-4">
											{cars.map((car) => (
												<Button
													key={car.id}
													variant="outline"
													className="justify-start h-auto py-4 px-4"
													onClick={() => {
														setSelectedVehicle(car);
														form.setValue("carId", car.id);
														setIsSelectOpen(false);
													}}
												>
													<div className="flex flex-col items-start">
														<span className="font-semibold">
															{car.brand} {car.model}
														</span>
														<span className="text-sm text-muted-foreground">
															{car.mileage}
														</span>
													</div>
												</Button>
											))}
										</div>
									</DialogContent>
								</Dialog>

								<Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
									<DialogTrigger asChild>
										<Button variant="outline" className="w-[200px]">
											<Plus className="mr-2 h-4 w-4" />
											New Vehicle
										</Button>
									</DialogTrigger>
									<DialogContent>
										<DialogHeader>
											<DialogTitle>Add New Vehicle</DialogTitle>
											<DialogDescription>
												Enter your vehicle details
											</DialogDescription>
										</DialogHeader>
										<NewCarForm setIsCreateOpen={setIsCreateOpen} carList={carList} />
									</DialogContent>
								</Dialog>
							</div>

							<AnimatePresence>
								{selectedVehicle && (
									<motion.div
										exit={{ opacity: 0 }}
										className="bg-muted w-full p-4 rounded-lg"
									>
										<div className="flex items-center justify-between">
											<div>
												<p className="font-medium">
													{selectedVehicle.brand} {selectedVehicle.model}
												</p>
												<p className="text-sm text-muted-foreground">
													Selected Vehicle
												</p>
											</div>
											<Button
												variant="ghost"
												size="sm"
												onClick={() => {
													setSelectedVehicle(undefined);
													form.setValue("carId", "");
												}}
											>
												Cancel
											</Button>
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Report Extensions</CardTitle>
						<CardDescription>
							Select the extension of analysis you need. You can choose multiple
							options.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ReportExtension
							selectedExtensions={selectedExtensions}
							onExtensionChange={handleExtensionChange}
						/>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Problem Description</CardTitle>
						<CardDescription>
							Describe the issues you&apos;re experiencing with your vehicle.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>What&apos;s happening?</FormLabel>
									<FormControl>
										<Textarea
											placeholder={
												"Describe the main problem you're experiencing..."
											}
											className="min-h-[100px]"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<CreditCounter totalCredits={totalCredits} />
					</CardContent>
					<CardFooter>
						<Button disabled={isPending} type="submit">
							Submit for Analysis
						</Button>
					</CardFooter>
				</Card>
			</motion.form>
			{/* </AnimatePresence> */}
		</Form>
	);
}
