"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { formatAriary } from "@/lib/format";

type BudgetData = {
  name: string;
  montant: number;
};

const FinanceChart = () => {
  const [data, setData] = useState<BudgetData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/budgets/stats")
      .then((res) => res.json())
      .then((budgetData) => {
        setData(budgetData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des budgets:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl w-full h-full p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold">Budget</h1>
          <Image src="/moreDark.png" alt="" width={20} height={20} />
        </div>
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">Chargement des données...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Budget par Service</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      {data.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">Aucune donnée de budget disponible</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="90%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tick={{ fill: "#d1d5db", fontSize: 12 }}
              tickLine={false}
              tickMargin={10}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              axisLine={false} 
              tick={{ fill: "#d1d5db" }} 
              tickLine={false} 
              tickMargin={20}
              tickFormatter={(value) => {
                if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
                return value.toString();
              }}
            />
            <Tooltip 
              formatter={(value: number) => formatAriary(value, { withSuffix: true })}
              labelStyle={{ color: '#374151' }}
            />
            <Legend
              align="center"
              verticalAlign="top"
              wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }}
            />
            <Line
              type="monotone"
              dataKey="montant"
              name="Montant Disponible"
              stroke="#C3EBFA"
              strokeWidth={5}
              dot={{ fill: "#C3EBFA", r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default FinanceChart;
