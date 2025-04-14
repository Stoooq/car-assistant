import { z } from "zod";

export const LoginSchema = z.object({
	email: z.string().email({
		message: "Please enter a valid email address.",
	}),
	password: z.string().min(8, {
		message: "Password must be at least 8 characters.",
	}),
});

export const RegisterSchema = z
	.object({
		name: z.string().min(2, {
			message: "Name must be at least 2 characters.",
		}),
		email: z.string().email({
			message: "Please enter a valid email address.",
		}),
		password: z.string().min(8, {
			message: "Password must be at least 8 characters.",
		}),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

export const ResetSchema = z.object({
	email: z.string().email({
		message: "Please enter a valid email address.",
	}),
});

export const NewPasswordSchema = z
	.object({
		password: z.string().min(8, {
			message: "Password must be at least 8 characters.",
		}),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

export const newCarSchema = z.object({
	brand: z.string().min(1, "Please select a car make"),
	model: z.string().min(1, "Please enter your car model"),
	year: z.string().min(4).max(4, "Please enter a valid year (YYYY)"), //! change to number
	mileage: z.string().min(1, "Please enter the current mileage"), //! change to number
});

export const newReportSchema = z.object({
	carId: z.string({
		required_error: "Please select or create a vehicle",
	}),
	description: z.string().min(10, {
		message: "Description must be at least 10 characters.",
	}),
	reportExtensions: z
		.array(z.enum(["", "parts", "maintenance"]))
		.optional(),
});

export const SettingsSchema = z
	.object({
		username: z.optional(z.string()),
		email: z.optional(z.string().email()),
		password: z.optional(z.string().min(8)),
		newPassword: z.optional(z.string().min(8)),
		newPasswordConfirm: z.optional(z.string().min(8)),
	})
	.refine((data) => {
		if (data.password && !data.newPassword) return false;

		if (!data.password && data.newPassword) return false;

		if (data.newPassword !== data.newPasswordConfirm) return false;

		return true;
	});
