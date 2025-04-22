"use server"

import { auth } from "@/auth"
import db from "@/lib/db"
import { newReportSchema } from "@/schemas"
import { z } from "zod"

export const createReport = async (values: z.infer<typeof newReportSchema>) => {
    const validation = newReportSchema.safeParse(values)
    if (!validation.success) return { error: "Invalid fields" };

    const { carId, description } = values

    const session = await auth()

    if (!session) return { error: "Not Authorized" }

    const user = session.user

    if (!user.id) return { error: "User not found" }

    const newReport = await db.report.create({
        data: {
            userId: user.id,
            carId,
            status: 'PENDING',
            issueText: description,
            aiResponse: null,
        }
    })

    return { success: "Report created", newReport }
}