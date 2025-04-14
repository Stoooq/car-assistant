"use server"

import { auth } from "@/auth"
import db from "@/lib/db"
import { newCarSchema } from "@/schemas"
import { z } from "zod"

export const createCar = async (values: z.infer<typeof newCarSchema>) => {
    const validation = newCarSchema.safeParse(values)

    if (!validation.success) return { error: "Invalid fields" };

    const { brand, model, year, mileage } = validation.data

    const session = await auth()

    if (!session) return { error: "Not Authorized" }

    const user = session.user

    await db.car.create({
        data: {
            userId: user.id!,
            brand: brand,
            model: model,
            year: parseInt(year),
            mileage: parseInt(mileage)
        }
    })

    return { success: "Car created" }
}