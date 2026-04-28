"use server"
import { db } from "@/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";
import { requireCurrentDbUser } from "@/lib/current-user";


export async function getAnalytics(period = "30d") {
    noStore();
    const user = await requireCurrentDbUser();

    const startDate = new Date()
    switch (period) {
        case "7d":
            startDate.setDate(startDate.getDate() - 7)
            break
        case "15d":
            startDate.setDate(startDate.getDate() - 15)
            break
        case "30d":
        default:
            startDate.setDate(startDate.getDate() - 30)
            break
    }

    // Get entries for the period
    const entries = await db.entry.findMany({
        where: {
        userId: user.id,
        createdAt: {
            gte: startDate,
        },
        },
        orderBy: {
        createdAt: "asc",
        },
    })

    const moodData = entries.reduce((acc, entry) => {
        const date = entry.createdAt.toISOString().split('T')[0]
        if(!acc[date]) {
            acc[date] = {
                totalScore: 0,
                count: 0,
                entries: [],
            }
        }
        acc[date].totalScore += entry.moodScore
        acc[date].count += 1
        acc[date].entries.push(entry)
        return acc
    }, {})

    const analyticsData = Object.entries(moodData).map(([date, data]) => (
        {
            date,
            averageScore: Number((data.totalScore / data.count).toFixed(1)),
            entryCount: data.count,
        }
    ))

    const overallStats = {
        totalEntries: entries.length,
        averageScore: entries.length > 0
            ? Number(
                (
                    entries.reduce((acc, entry) => acc + entry.moodScore, 0) / entries.length
                ).toFixed(1)
            )
            : 0,
        mostFrequentedMood: Object.entries(
            entries.reduce((acc, entry) => {
                acc[entry.mood] = (acc[entry.mood] || 0) + 1
                return acc
            }, {})
        ).sort((a,b) => b[1] - a[1])[0]?.[0],
        dailyAverage: Number(
            (
                entries.length / (period === "7d" ? 7 : period === "15d" ? 15 : 30)
            ).toFixed(1)
        ),
        hasEntries: entries.length > 0,
    }


    return {
        success: true,
        data: {
            timeline: analyticsData,
            stats: overallStats,
        },
    }
}
