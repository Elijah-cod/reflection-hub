"use server"

import { unstable_cache } from "next/cache";

export const getDailyPrompt = unstable_cache(
    async() => {
        try {
            const res = await fetch("https://api.adviceslip.com/advice", {
                next: {
                    revalidate: 86400,
                },
                signal: AbortSignal.timeout(1500),
            })

            const data = await res.json()
            return data.slip.advice
        } catch (error) {
            return "What's on your mind today"
        }
    },["daily-prompt"],
    {
        revalidate: 86400,
        tags: ["daily-prompt"]
    }
)

export async function getPixabayImage(image) {
  try {
    const res = await fetch(
      `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${encodeURIComponent(image)}&min_width=1280&min_height=720&image_type=illustration&category=feelings`
    );
    const data = await res.json();
    if (!data.hits || data.hits.length === 0) {
      console.warn(`No images found for query: ${image}`);
      return null;
    }

    return data.hits[0]?.largeImageURL || null; 
  } catch (error) {
    console.error("Pixabay API Error:", error);
    return null;
  }
}
