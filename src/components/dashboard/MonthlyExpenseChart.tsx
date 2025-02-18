"use client"

import { useMemo } from "react"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis,Tooltip } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import { Poppins, Roboto_Mono, Inter } from "next/font/google";


const poppins = Poppins({ weight: ["400", "600"], subsets: ["latin"] });
const robotoMono = Roboto_Mono({ weight: ["400", "600"], subsets: ["latin"] });
const inter = Inter({ weight: ["400", "500", "600"], subsets: ["latin"] });




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
import { useAppSelector } from "@/lib/hooks"

export function MonthlExpenseChart() {
  const transactionState = useAppSelector(
    (state) => state.transactionReducer
  );

  // Compute chart data using useMemo so it recalculates only when transaction data changes.
  const chartData = useMemo(() => {
    if (!transactionState.transaction || !transactionState.transaction.transaction_list) return [];
    // Get the date 30 days ago
    const now = new Date();
    const last30 = new Date(now);
    last30.setDate(now.getDate() - 30);

    // Filter transactions from the last 30 days
    const recentTransactions = transactionState.transaction.transaction_list.filter((tx: { date: Date | string; amount: number }) => {
      // Convert date if needed
      const txDate = typeof tx.date === "string" ? new Date(tx.date) : tx.date;
      return txDate >= last30;
    });

    // Group by day (formatted as "YYYY-MM-DD")
    const dailyTotals: Record<string, number> = {};
    recentTransactions.forEach((tx: { date: Date | string; amount: number }) => {
      const txDate = typeof tx.date === "string" ? new Date(tx.date) : tx.date;
      const day = txDate.toISOString().split("T")[0];
      dailyTotals[day] = (dailyTotals[day] || 0) + tx.amount;
    });

    // Convert the grouping object into an array sorted by date
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
                // Show day and month abbreviation, e.g., "15 Sep"
                const d = new Date(value);
                return `${d.getDate()} ${d.toLocaleString("default", { month: "short" })}`;
              }}
            />
            <Tooltip
              content={<ChartTooltipContent indicator="dashed" />}
              cursor={false}
            />
            <Bar dataKey="total" fill="var(--color-primary)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
