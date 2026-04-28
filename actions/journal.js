"use server"

import { revalidatePath, unstable_noStore as noStore } from "next/cache"
import { db } from "@/lib/prisma"
import { getMoodById } from "@/app/lib/moods"
import { getPixabayImage } from "@/actions/public";
import { request } from "@arcjet/next";
import aj from "@/lib/arcjet";
import { auth } from "@clerk/nextjs/server";
import { requireCurrentDbUser } from "@/lib/current-user";



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
            if (decision.reason.isRateLimit()) {
                const { remaining, reset } = decision.reason
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

        const user = await requireCurrentDbUser()

        const mood = getMoodById(data.mood)
        if (!mood) throw new Error("Invalid mood")

        if (data.collectionId) {
            const collection = await db.collection.findFirst({
                where: {
                    id: data.collectionId,
                    userId: user.id,
                },
                select: {
                    id: true,
                },
            })

            if (!collection) throw new Error("Collection not found")
        }

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

export async function getJournalEntries({ collectionId, orderBy = "desc" } = {}) {
    try {
        noStore()
        const user = await requireCurrentDbUser()

        const entries = await db.entry.findMany({
            where: {
                userId: user.id,
                ...(
                    collectionId === "unorganized" ? { collectionId: null } : collectionId ? { collectionId } : {}
                ),
            },
            include: {
                collection: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
            },
            orderBy: {
                createdAt: orderBy,
            },
        })

        const entriesWithMoodData = entries.map((entry) => ({
            ...entry,
            moodData: getMoodById(entry.mood),
        }))


        return {
            success: true,
            data: {
                entries: entriesWithMoodData,
            },
        }

    } catch (error) {
        return {
            success: false,
            error: error.message,
        }
    }
}

export async function getJournalEntry(entryId) {
    try {
        noStore()
        const user = await requireCurrentDbUser()

        const entry = await db.entry.findFirst({
            where: {
                id: entryId,
                userId: user.id,
            },
            include: {
                collection: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        })

        if (!entry) throw new Error("Entry not found")
        return entry
    } catch (error) {
        throw new Error(error.message)
    }
}

export async function deleteJournalEntry(entryId) {
    try {
        const user = await requireCurrentDbUser();

        const entry = await db.entry.findFirst({
            where: {
                id: entryId,
                userId: user.id,
            },
        })

        if (!entry) throw new Error("Entry not found")
        await db.entry.delete({
            where: { id: entryId },
        })

        revalidatePath("/dashboard")
        return entry;
    } catch (error) {
        throw new Error(error.message)
    }
}


export async function updateJournalEntry(data) {
    try {
        const user = await requireCurrentDbUser();

        const existingEntry = await db.entry.findFirst({
            where: {
                id: data.id,
                userId: user.id,
            },
        })

        if (!existingEntry) throw new Error("Entry not found")
        const mood = getMoodById(data.mood)
        if (!mood) throw new Error("Invalid mood")

        if (data.collectionId) {
            const collection = await db.collection.findFirst({
                where: {
                    id: data.collectionId,
                    userId: user.id,
                },
                select: {
                    id: true,
                },
            })

            if (!collection) throw new Error("Collection not found")
        }
        
        let moodImageUrl = existingEntry.moodImageUrl

        if(existingEntry.mood !== mood.id)
            moodImageUrl = await getPixabayImage(data.moodQuery)

        const updatedEntry = await db.entry.update({
            where: {id: data.id},
            data: {
                title: data.title,
                content: data.content,
                mood: mood.id,
                moodScore: mood.score,
                moodImageUrl,
                collectionId: data.collectionId || null,
            }
        })
        revalidatePath("/dashboard")
        revalidatePath(`/journal/${data.id}`)
        return updatedEntry
    } catch (error) {
        throw new Error(error.message)
    }
}


export async function getDraft() {
    try {
        noStore()
        const user = await requireCurrentDbUser();

        const draft = await db.draft.findUnique({
            where: { userId: user.id },
        })
        
        return {
            success: true,
            data: draft
        }
    } catch (error) {
        throw new Error(error.message)
    }
}


export async function saveDraft(data) {
    try {
        const user = await requireCurrentDbUser();

        const draft = await db.draft.upsert({
            where: { userId: user.id },
            create: {
                title: data.title,
                content: data.content,
                mood: data.mood,
                userId: user.id,
            },
            update: {
                title: data.title,
                content: data.content,
                mood: data.mood,
            }
        })

        revalidatePath('/dashboard')
        
        return {
            success: true,
            data: draft
        }
    } catch (error) {
        throw new Error(error.message)
    }
}
