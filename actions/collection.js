"use server"
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma"
import { revalidatePath } from "next/cache";
import { collectionSchema } from "@/app/lib/schema";

export async function createCollection(data) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });
    if (!user) throw new Error("User not found");

    // ✅ validate + sanitize incoming data
    const validated = collectionSchema.parse(data);

    const collection = await db.collection.create({
      data: {
        name: validated.name,                  // guaranteed string
        description: validated.description ?? null, // avoid undefined
        userId: user.id,
      },
    });

    revalidatePath("/dashboard");
    return collection;
  } catch (error) {
    throw new Error(error.message);
  }
}


export async function getCollections() {
        const {userId} = await auth()
        if(!userId) throw new Error("Unauthorized")
        
        const user = await db.user.findUnique({
                    where: { clerkUserId: userId },
                })
        if (!user) throw new Error("User not found")
        
        const collections = await db.collection.findMany({
            where: {
                userId: user.Id,
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        return collections
}


export async function getCollection(collectionId) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) throw new Error("User not found");

  const collection = await db.collection.findUnique({
    where: { id: collectionId }, // <-- just pass the string here
  });

  if (!collection || collection.userId !== user.id) {
    throw new Error("Collection not found or not yours");
  }

  return collection;
}


