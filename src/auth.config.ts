import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";
import bcrypt from "bcryptjs";

export default {
	providers: [
		Credentials({
			credentials: {
				email: {},
				password: {},
			},
			async authorize(credentials) {
				const validation = LoginSchema.safeParse(credentials);

				if (validation.success) {
					const { email, password } = validation.data;
					const user = await getUserByEmail(email);

					if (!user || !user.password) return null;

					const passwordMatch = await bcrypt.compare(password, user.password);
					
					if (passwordMatch) return user;
				}

				return null;
			},
		}),
	],
} satisfies NextAuthConfig;
