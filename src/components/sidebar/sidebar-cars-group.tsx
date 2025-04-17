"use client";

import {
	CarFront,
	MoreHorizontal,
	Pencil,
	Plus,
	Sparkles,
	Trash2,
} from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import {
	SidebarGroupAction,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
} from "../ui/sidebar";
import { NewCarForm } from "../new-car-form";
import Link from "next/link";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState, useTransition } from "react";
import { Car, CarList } from "@prisma/client";
import { useToast } from "@/hooks/use-toast";
import { deleteCar } from "@/actions/delete-car";
import { useRouter } from "next/navigation";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "../ui/alert-dialog";

export function SidebarCarGroup({ cars, carList }: { cars: Car[], carList: CarList[] }) {
	const [isPending, startTransition] = useTransition();

	const { toast } = useToast();

	const router = useRouter();

	const [isCreateOpen, setIsCreateOpen] = useState(false);
	const [isEditOpen, setIsEditOpen] = useState(false);

	const handleDelete = (carId: string) => {
		startTransition(() => {
			deleteCar(carId)
				.then((data) => {
					if (data?.error) {
						toast({
							variant: "destructive",
							title: data.error,
						});
					}
					if (data?.success) {
						toast({
							variant: "default",
							title: data.success,
						});
						router.refresh();
					}
				})
				.catch(() => {
					toast({
						variant: "destructive",
						title: "Something went wrong",
					});
				});
		});
	};

	return (
		<>
			<Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
				<DialogTrigger asChild>
					<SidebarGroupAction title="Add Project">
						<Plus /> <span className="sr-only">Add Car</span>
					</SidebarGroupAction>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle className="text-lg font-semibold leading-none tracking-tight">
							Add New Vehicle
						</DialogTitle>
						<DialogDescription>Enter your vehicle details</DialogDescription>
					</DialogHeader>
					<NewCarForm setIsCreateOpen={setIsCreateOpen} carList={carList} />
				</DialogContent>
			</Dialog>

			<SidebarGroupContent>
				<SidebarMenu>
					{cars.map((car) => (
						<SidebarMenuItem key={car.id}>
							<SidebarMenuButton asChild>
								<Link href={`/new-report?carId=${car.id}`}>
									<CarFront />
									<span>
										{car.brand} {car.model}
									</span>
								</Link>
							</SidebarMenuButton>
							<SidebarMenuButton asChild>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<SidebarMenuAction>
											<MoreHorizontal />
										</SidebarMenuAction>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="start" className="w-56">
										<DropdownMenuItem>
											<Sparkles className="mr-2 h-4 w-4" />
											<Link href={`/new-report?carId=${car.id}`}>
												Ai Assistant
											</Link>
										</DropdownMenuItem>

										<Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
											<DialogTrigger asChild>
												<DropdownMenuItem>
													<Pencil className="mr-2 h-4 w-4" />
													<button>Edit</button>
												</DropdownMenuItem>
											</DialogTrigger>
											<DialogContent>
												<DialogHeader>
													<DialogTitle>Add New Vehicle</DialogTitle>
													<DialogDescription>
														Enter your vehicle details
													</DialogDescription>
												</DialogHeader>
											</DialogContent>
										</Dialog>

										<DropdownMenuSeparator />
										<AlertDialog>
											<AlertDialogTrigger asChild>
												<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
													<Trash2 className="mr-2 h-4 w-4" />
													<button>Delete</button>
												</DropdownMenuItem>
											</AlertDialogTrigger>
											<AlertDialogContent>
												<AlertDialogHeader>
													<AlertDialogTitle>
														Are you absolutely sure?
													</AlertDialogTitle>
													<AlertDialogDescription>
														{`This action cannot be undone. This will permanently
														delete your ${car.brand} ${car.model} reports.`}
													</AlertDialogDescription>
												</AlertDialogHeader>
												<AlertDialogFooter>
													<AlertDialogCancel>Cancel</AlertDialogCancel>
													<AlertDialogAction
														onClick={() => handleDelete(car.id)}
														disabled={isPending}
													>
														Continue
													</AlertDialogAction>
												</AlertDialogFooter>
											</AlertDialogContent>
										</AlertDialog>
									</DropdownMenuContent>
								</DropdownMenu>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</>
	);
}
