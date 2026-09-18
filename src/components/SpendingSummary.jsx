import React, { useMemo } from "react";
import { PieChart as PieIcon, PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ShoppingBag, Utensils, Zap, Film, Layers } from "lucide-react";


export default function SpendingSummary({ transactions = [] }) {
  const spendingByCategory = useMemo(() => {
    const categoryTotals = {
      Food: 0,
      Bills: 0,
      Shopping: 0,
      Entertainment: 0,
      Others: 0
    };

    let totalDebitSum = 0;

    transactions.forEach((txn) => {
      if (txn.type === "debit") {
        const cat = categoryTotals.hasOwnProperty(txn.category) ? txn.category : "Others";
        categoryTotals[cat] += txn.amount;
        totalDebitSum += txn.amount;
      }
    });

    const categoryColors = {
      Food: "#3B82F6",
      Bills: "#8B5CF6",
      Shopping: "#EC4899",
      Entertainment: "#F59E0B",
      Others: "#10B981"
    };

    const categoryIcons = {
      Food: Utensils,
      Bills: Zap,
      Shopping: ShoppingBag,
      Entertainment: Film,
      Others: Layers
    };

    const chartData = Object.keys(categoryTotals).map((cat) => ({
      name: cat,
      value: categoryTotals[cat],
      color: categoryColors[cat],
      percentage: totalDebitSum > 0 ? ((categoryTotals[cat] / totalDebitSum) * 100).toFixed(1) : 0
    }));

    return { chartData, totalDebitSum, categoryIcons };
  }, [transactions]);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/90 dark:border-gray-700/60 shadow-md shadow-gray-200/50 dark:shadow-xl dark:shadow-black/20 p-5 flex flex-col justify-between transition-colors">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <PieIcon className="w-5 h-5 text-amber-500" /> Spending Breakdown (₹ INR)
        </h3>
        <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
          Monthly expenditure categorized by merchant type
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">

        <div className="lg:col-span-5 h-48 w-full flex items-center justify-center relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={spendingByCategory.chartData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={4}
                dataKey="value"
              >
                {spendingByCategory.chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(val) => [`₹${val.toLocaleString("en-IN")}`, "Amount Spent"]}
                contentStyle={{
                  backgroundColor: "rgba(17, 24, 39, 0.95)",
                  borderColor: "#374151",
                  borderRadius: "12px",
                  color: "#fff",
                  fontSize: "12px",
                  fontWeight: "bold"
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">Total Spent</span>
            <span className="text-xs font-bold text-gray-900 dark:text-white font-mono">
              {formatCurrency(spendingByCategory.totalDebitSum)}
            </span>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-3">
          {spendingByCategory.chartData.map((item) => {
            const Icon = spendingByCategory.categoryIcons[item.name] || Layers;
            return (
              <div key={item.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <Icon className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
                    <span className="font-bold text-gray-800 dark:text-gray-200">
                      {item.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="font-extrabold text-gray-900 dark:text-white">
                      ₹{item.value.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold w-11 text-right">
                      ({item.percentage}%)
                    </span>
                  </div>
                </div>

                <div className="w-full h-2.5 bg-gray-100 dark:bg-gray-700/80 rounded-full overflow-hidden border border-gray-200/60 dark:border-gray-600/40">
                  <div
                    className="h-full rounded-full transition-all duration-500 shadow-2xs"
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor: item.color
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
