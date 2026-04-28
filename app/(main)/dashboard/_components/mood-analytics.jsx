"use client"

import dynamic from "next/dynamic";
import React, { useState, useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getAnalytics } from "@/actions/analytics";
import AnalyticsSkeleton from "./analytics-skeleton";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getMoodById, getMoodTrend } from "@/app/lib/moods";

const MoodChart = dynamic(() => import("./mood-chart"), {
    loading: () => (
        <div className="h-[300px] w-full animate-pulse rounded-lg bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 opacity-75" />
    ),
})

const timeOptions = [
  { value: "7d", label: "Last 7 Days" },
  { value: "15d", label: "Last 15 Days" },
  { value: "30d", label: "Last 30 Days" },
];

const MoodAnalytics = ({ initialAnalytics, initialPeriod = "7d" }) => {
    const [period, setPeriod] = useState(initialPeriod)
    const [analytics, setAnalytics] = useState(initialAnalytics)
    const [isPending, startTransition] = useTransition()

    const handlePeriodChange = (nextPeriod) => {
        setPeriod(nextPeriod)

        startTransition(async() => {
            const nextAnalytics = await getAnalytics(nextPeriod)
            setAnalytics(nextAnalytics)
        })
    }

    if (!analytics?.data) {
        return <AnalyticsSkeleton />
    }

    const {timeline, stats} = analytics.data
    const hasEntries = stats.hasEntries

    return(
        <>
            <div className="flex justify-between items-center">
                <h2 className="text-5xl font-bold gradient-title">Dashboard</h2>
                <Select value={period} onValueChange = {handlePeriodChange} disabled={isPending}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            timeOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-6">
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium">Total Entries</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">{stats.totalEntries}</p>
                            <p className="text-xs text-muted-foreground"> ~ {stats.dailyAverage} entries per day</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium">Average Mood</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">{hasEntries ? `${stats.averageScore} / 10` : "-- / 10"}</p>
                            <p className="text-xs text-muted-foreground">
                                {hasEntries ? "Overall mood score" : "Add your first entry to start tracking mood"}
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium">Mood Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold flex items-center gap-2">
                                {hasEntries ? (
                                    <>
                                        {getMoodById(stats.mostFrequentedMood)?.emoji} {" "}
                                        {getMoodTrend(stats.averageScore)}
                                    </>
                                ) : (
                                    <span>No mood data yet.</span>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts */}
                <Card>
                        <CardHeader>
                            <CardTitle>Mood Timeline</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <MoodChart timeline={timeline} />
                        </CardContent>
                </Card>
            </div>
        </>
    )
}

export default MoodAnalytics
