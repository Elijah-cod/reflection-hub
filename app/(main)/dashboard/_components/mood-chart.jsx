"use client"

import React from "react";
import { format, parseISO } from "date-fns";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="rounded-lg border bg-white p-4 shadow-lg">
      <p className="font-medium">{format(parseISO(label), "MMM d, yyyy")}</p>
      <p className="text-orange-600">Average Mood: {payload[0].value}</p>
      <p className="text-blue-600">Entries: {payload[1].value}</p>
    </div>
  );
};

const MoodChart = ({ timeline }) => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={timeline}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(date) => format(parseISO(date), "MMM d")}
          />
          <YAxis yAxisId="left" domain={[0, 10]} />
          <YAxis yAxisId="right" domain={[0, "auto"]} orientation="right" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="averageScore"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            name="Average Mood"
            strokeWidth={2}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="entryCount"
            stroke="#82ca9d"
            name="Number of Entries"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MoodChart;
