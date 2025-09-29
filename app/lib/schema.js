import { z } from "zod"

export const journalSchema = z.object({
  title: z.string().min(1, "Title is Required"),
  content: z.string()
    .transform((val) => val.replace(/<(.|\n)*?>/g, "").trim()) // strip HTML
    .refine((val) => val.length > 0, { message: "Content is Required" }),
  mood: z.string().min(1, "Mood is Required"),
  collectionId: z.string().optional(),
})

export const collectionSchema = z.object({
  name: z.string().min(1, "Name is Required"),
  description: z.string().optional(),
})
