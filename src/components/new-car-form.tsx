"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
	Dispatch,
	SetStateAction,
	useEffect,
	useState,
	useTransition,
} from "react";
import { newCarSchema } from "@/schemas";
import { createCar } from "@/actions/create-car";
import { useRouter } from "next/navigation";
import { CarList } from "@prisma/client";

export function NewCarForm({
	setIsCreateOpen,
	carList,
}: {
	setIsCreateOpen: Dispatch<SetStateAction<boolean>>;
	carList: CarList[];
}) {
	const [selectedBrand, setSelectedBrand] = useState<string>("");
	const [filteredModels, setFilteredModels] = useState<string[]>([]);
	const [selectedModel, setSelectedModel] = useState<string>("");
	const [filteredYears, setFilteredYears] = useState<string[]>([]);

	const [isPending, startTransition] = useTransition();

	const router = useRouter();

	const { toast } = useToast();

	const form = useForm<z.infer<typeof newCarSchema>>({
		resolver: zodResolver(newCarSchema),
		defaultValues: {
			brand: "",
			model: "",
			year: "",
			mileage: "",
		},
	});

	const carBrands = new Set(carList.map((car) => car.brand));

	useEffect(() => {
		if (selectedBrand) {
			const models = carList
				.filter((car) => car.brand === selectedBrand)
				.map((car) => car.model);

			setFilteredModels(Array.from(new Set(models)));
		}
		if (selectedModel) {
			const years = carList
				.filter((car) => car.model === selectedModel)
				.map((car) => car.year.toString());

			setFilteredYears(years);
		}
	}, [selectedBrand, selectedModel]);

	function onSubmit(values: z.infer<typeof newCarSchema>) {
		setIsCreateOpen(false);
		startTransition(() => {
			createCar(values)
				.then((data) => {
					if (data?.error) {
						form.reset();
						toast({
							variant: "destructive",
							title: data.error,
						});
					}
					if (data?.success) {
						form.reset();
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
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="brand"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Brand</FormLabel>
							<Select
								onValueChange={(value) => {
									field.onChange(value);
									setSelectedBrand(value);
								}}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select brand" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{[...carBrands].map((brand) => (
										<SelectItem key={brand} value={brand}>
											{brand}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="model"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Model</FormLabel>
							<Select
								onValueChange={(value) => {
									field.onChange(value);
									setSelectedModel(value);
								}}
								disabled={form.getValues("brand") === ""}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select model" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{[...filteredModels].map((model) => (
										<SelectItem key={model} value={model}>
											{model}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							{/* <FormControl>
								<Input placeholder="Camry" {...field} />
							</FormControl> */}
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="year"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Year</FormLabel>
							<Select
								onValueChange={field.onChange}
								disabled={form.getValues("model") === ""}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select year" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{[...filteredYears].map((year) => (
										<SelectItem key={year} value={year.toString()}>
											{year}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							{/* <FormControl>
								<Input placeholder="2024" {...field} />
							</FormControl> */}
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="mileage"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Current Mileage</FormLabel>
							<FormControl>
								<Input placeholder="50000" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<DialogFooter>
					<Button type="submit" disabled={isPending}>
						Add Vehicle
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
}
