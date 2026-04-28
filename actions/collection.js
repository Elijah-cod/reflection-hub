"use server"
import { db } from "@/lib/prisma"
import { revalidatePath } from "next/cache";
import { collectionSchema } from "@/app/lib/schema";
import { requireCurrentDbUser } from "@/lib/current-user";

export async function createCollection(data) {
  try {
    const user = await requireCurrentDbUser();

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
        const user = await requireCurrentDbUser()

        const collections = await db.collection.findMany({
            where: {
                userId: user.id,
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        return collections
}


export async function getCollection(collectionId) {
  const user = await requireCurrentDbUser();

  const collection = await db.collection.findFirst({
    where: {
      id: collectionId,
      userId: user.id,
    },
  });

  return collection;
}


export async function deleteCollection(collectionId) {
  try{
    const user = await requireCurrentDbUser();

    const collection = await db.collection.findFirst({
      where: {
        id: collectionId,
        userId: user.id,
      },
    })

    if (!collection) throw new Error("Collection not found")
    await db.collection.delete({
      where: { id: collectionId }, 
    })
    return true;
  } catch (error) {
    throw new Error(error.message)
  }
}
