"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExtendedUser } from "../../../next-auth";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { settings } from "@/actions/settings";
import { SettingsSchema } from "@/schemas/index";

export function SettingsTabs({ user }: { user: ExtendedUser }) {
	const [isPending, startTransition] = useTransition();

	const { toast } = useToast();

	const form = useForm<z.infer<typeof SettingsSchema>>({
		resolver: zodResolver(SettingsSchema),
		defaultValues: {
			username: user?.name || undefined,
			email: user?.email || undefined,
			password: undefined,
			newPassword: undefined,
			newPasswordConfirm: undefined,
		},
	});

	const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
		const updatedValues = {
			...values,
			password: values.password === "" ? undefined : values.password,
			newPassword: values.newPassword === "" ? undefined : values.newPassword,
			newPasswordConfirm:
				values.newPasswordConfirm === "" ? undefined : values.newPassword,
		};

		console.log(values, updatedValues);

		// startTransition(() => {
		// 	settings(updatedValues)
		// 		.then((data) => {
		// 			if (data?.error) {
		// 				toast({
		// 					variant: "destructive",
		// 					title: data.error,
		// 				});
		// 			}
		// 			if (data?.success) {
		// 				toast({
		// 					variant: "default",
		// 					title: data.success,
		// 				});
		// 			}
		// 		})
		// 		.catch(() => {
		// 			toast({
		// 				variant: "destructive",
		// 				title: "Something went wrong",
		// 			});
		// 		});
		// });
	};

	return (
		<Tabs defaultValue="general" className="space-y-4">
			<TabsList>
				<TabsTrigger value="general">General</TabsTrigger>
				<TabsTrigger value="notifications">Notifications</TabsTrigger>
				<TabsTrigger value="security">Security</TabsTrigger>
			</TabsList>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<TabsContent value="general">
						<Card>
							<CardHeader>
								<CardTitle>General Settings</CardTitle>
								<CardDescription>
									Manage your basic account settings and preferences.
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<FormField
									control={form.control}
									name="username"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Username</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder="johndoe"
													disabled={isPending}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder="john.doe@example.com"
													disabled={isPending}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label>Dark Mode</Label>
										<p className="text-sm text-muted-foreground">
											Toggle dark mode on or off
										</p>
									</div>
									<Switch />
								</div>
							</CardContent>
							<CardFooter>
								<Button type="submit">Save Changes</Button>
							</CardFooter>
						</Card>
					</TabsContent>

					<TabsContent value="notifications">
						<Card>
							<CardHeader>
								<CardTitle>Notification Preferences</CardTitle>
								<CardDescription>
									Choose what notifications you want to receive.
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label>Email Notifications</Label>
										<p className="text-sm text-muted-foreground">
											Receive email updates about your reports
										</p>
									</div>
									<Switch defaultChecked />
								</div>
								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label>Marketing Emails</Label>
										<p className="text-sm text-muted-foreground">
											Receive emails about new features and updates
										</p>
									</div>
									<Switch />
								</div>
							</CardContent>
							<CardFooter>
								<Button type="submit">Save Preferences</Button>
							</CardFooter>
						</Card>
					</TabsContent>

					<TabsContent value="security">
						<Card>
							<CardHeader>
								<CardTitle>Security Settings</CardTitle>
								<CardDescription>
									Manage your security preferences and password.
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Current Password</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder=""
													type="password"
													disabled={isPending}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="newPassword"
									render={({ field }) => (
										<FormItem>
											<FormLabel>New Password</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder=""
													type="password"
													disabled={isPending}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="newPasswordConfirm"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Confirm New Password</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder=""
													type="password"
													disabled={isPending}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</CardContent>
							<CardFooter>
								<Button type="submit">Update Password</Button>
							</CardFooter>
						</Card>
					</TabsContent>
				</form>
			</Form>
		</Tabs>
	);
}
