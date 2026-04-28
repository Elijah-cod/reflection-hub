import "server-only";

import { auth, currentUser } from "@clerk/nextjs/server";
import { unstable_noStore as noStore } from "next/cache";
import { cache } from "react";

import { db } from "@/lib/prisma";

const buildUserName = (user) => {
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ").trim();
  return fullName || user.username || user.emailAddresses[0]?.emailAddress || "Reflection Hub User";
};

export const getCurrentDbUser = cache(async () => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const existingUser = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (existingUser) {
    return existingUser;
  }

  const clerkUser = await currentUser();

  if (!clerkUser) {
    return null;
  }

  return db.user.create({
    data: {
      clerkUserId: clerkUser.id,
      email: clerkUser.emailAddresses[0].emailAddress,
      imageUrl: clerkUser.imageUrl,
      name: buildUserName(clerkUser),
    },
  });
});

export async function requireCurrentDbUser() {
  noStore();

  const user = await getCurrentDbUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
}
