import React from "react";
import { Wallet, CreditCard, TrendingDown, ArrowUpRight, Shield } from "lucide-react";


export default function BalanceCards({ balances }) {
  const formatCurrency = (val) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2
    }).format(val || 0);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 text-white rounded-2xl p-5 shadow-lg shadow-blue-500/20 relative overflow-hidden flex flex-col justify-between border border-blue-500/30">
        <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-blue-100 uppercase tracking-wider">
              Total Account Balance
            </span>
            <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Wallet className="w-4 h-4 text-white" />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow-xs font-mono">
            {formatCurrency(balances?.totalBalance)}
          </h2>
        </div>

        <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs text-blue-100">
          <span className="flex items-center gap-1 font-semibold">
            <Shield className="w-3.5 h-3.5 text-emerald-300" /> RBI / DICGC Insured
          </span>
          <span className="font-mono text-[11px] font-medium opacity-90">Checking **** 4829</span>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200/90 dark:border-gray-700/60 shadow-md shadow-gray-200/50 dark:shadow-xl dark:shadow-black/20 flex flex-col justify-between transition-colors">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              Available Liquid Cash
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight font-mono">
            {formatCurrency(balances?.availableBalance)}
          </h2>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700/60 flex items-center justify-between text-xs">
          <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> Ready for Transfer
          </span>
          <span className="text-gray-500 dark:text-gray-400 font-medium">No holds</span>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200/90 dark:border-gray-700/60 shadow-md shadow-gray-200/50 dark:shadow-xl dark:shadow-black/20 flex flex-col justify-between transition-colors">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              Monthly Outflow
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center">
              <TrendingDown className="w-4 h-4 text-amber-700 dark:text-amber-400" />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight font-mono">
            {formatCurrency(balances?.monthlySpend)}
          </h2>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700/60 flex items-center justify-between text-xs">
          <span className="text-gray-600 dark:text-gray-400 font-semibold">September 2026</span>
          <span className="text-blue-700 dark:text-blue-400 font-bold">12% under budget</span>
        </div>
      </div>
    </div>
  );
}
