"use server"

import { auth } from "@/auth"
import db from "@/lib/db"
import { Notification } from "@prisma/client"

export const updateNotification = async (notification: Notification) => {
    const session = await auth()

    if (!session) return { error: "Not Authorized" }

    await db.notification.update({
        where: {
            id: notification.id
        },
        data: {
            seen: true
        }
    })

    return { success: "Notification updated" }
}