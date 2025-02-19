"use client"

import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useAppSelector } from "@/lib/hooks"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function MonthlExpenseChart() {
  const transactionState = useAppSelector(
    (state) => state.transactionReducer
  );

  const themeReducer= useAppSelector(
    state=>state.themeReducer
  )
  console.log(themeReducer.theme)
  const fillColor = themeReducer.theme === "dark" ? "#f97316" : "#22c55e"

  const chartData = useMemo(() => {
    if (!transactionState.transaction || !transactionState.transaction.transaction_list) return [];
    const now = new Date();
    const last30 = new Date(now);
    last30.setDate(now.getDate() - 30);

    const recentTransactions = transactionState.transaction.transaction_list.filter((tx: { date: Date | string; amount: number }) => {
      const txDate = typeof tx.date === "string" ? new Date(tx.date) : tx.date;
      return txDate >= last30;
    });

    const dailyTotals: Record<string, number> = {};
    recentTransactions.forEach((tx: { date: Date | string; amount: number }) => {
      const txDate = typeof tx.date === "string" ? new Date(tx.date) : tx.date;
      const day = txDate.toISOString().split("T")[0];
      dailyTotals[day] = (dailyTotals[day] || 0) + tx.amount;
    });

    return Object.keys(dailyTotals)
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
      .map((day) => ({ date: day, total: dailyTotals[day] }));
  }, [transactionState]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Expense Chart</CardTitle>
        <CardDescription>Last 30 Days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => {
                const d = new Date(value);
                return `${d.getDate()} ${d.toLocaleString("default", { month: "short" })}`;
              }}
            />
            <Tooltip
              content={<ChartTooltipContent indicator="dashed" />}
              cursor={false}
            />
            <Bar 
              fill={fillColor}
              dataKey="total" 
              radius={4} 
              className="bg-green-500 hover:bg-green-600 dark:bg-orange-500 dark:hover:bg-orange-600"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}