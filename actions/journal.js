"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/lib/prisma"
import { getMoodById } from "@/app/lib/moods"
import { getPixabayImage } from "@/actions/public";
import { request } from "@arcjet/next";
import aj from "@/lib/arcjet";

const { auth } = require("@clerk/nextjs/server")

export async function createJournalEntry(data) {
    try {
        const { userId } = await auth()
        if (!userId) throw new Error("Unauthorized")
        
        //Rate limiting
        const req = await request()
        const decision = await aj.protect(req, {
            userId,
            requested: 1, // Specify how many tokens to consume
            });

        if (decision.isDenied()) {
            if(decision.reason.isRateLimit()) {
                const {remaining, reset } = decision.reason
                console.error({
                    code: "RATE_LIMIT_EXCEEDED",
                    details: {
                        remaining,
                        resetInSeconds: reset,
                    },
                })
                throw new Error("Too many requests. Please try again later.")
            }
            throw new Error("Request Blocked.")
        }

        const user = await db.user.findUnique({
            where: { clerkUserId: userId },
        })
        if (!user) throw new Error("User not found")

        const mood = getMoodById(data.mood)
        if (!mood) throw new Error("Invalid mood")

        const moodImageUrl = await getPixabayImage(data.moodQuery)

        const entry = await db.entry.create({
            data: {
                title: data.title,
                content: data.content,
                mood: mood.id,
                moodScore: mood.score,
                moodImageUrl,
                userId: user.id,
                collectionId: data.collectionId || null,
            }
        })

        await db.draft.deleteMany({
            where: { userId: user.id },
        })

        revalidatePath("/dashboard")
        return entry
    } catch (error) {
        throw new Error(error.message)
    }
}
