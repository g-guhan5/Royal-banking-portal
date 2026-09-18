import React from "react";
import { X, CheckCircle2, CreditCard, Hash, Calendar, Tag, FileText, ArrowUpRight, ArrowDownLeft } from "lucide-react";


export default function TransactionModal({ transaction, onClose }) {
  if (!transaction) return null;

  const isCredit = transaction.type === "credit";

  const formatCurrency = (val) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2
    }).format(val || 0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-200 dark:border-gray-700 relative transition-transform transform scale-100">

        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 bg-gray-100 dark:bg-gray-700/60 transition-colors"
          title="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center mt-2 mb-6">
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-3 shadow-md ${isCredit
                ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400"
                : "bg-rose-100 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400"
              }`}
          >
            {isCredit ? <ArrowDownLeft className="w-8 h-8" /> : <ArrowUpRight className="w-8 h-8" />}
          </div>

          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {transaction.merchant}
          </h3>

          <div
            className={`text-3xl font-extrabold my-1 font-mono ${isCredit ? "text-emerald-600 dark:text-emerald-400" : "text-gray-900 dark:text-white"
              }`}
          >
            {isCredit ? "+" : "-"}{formatCurrency(transaction.amount)}
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {transaction.status || "Completed"}
          </span>
        </div>

        <div className="space-y-3 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-2xl border border-gray-200/80 dark:border-gray-800 text-sm">

          <div className="flex justify-between items-center py-1">
            <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2 font-medium">
              <Hash className="w-4 h-4 text-blue-500" /> Transaction ID
            </span>
            <span className="font-mono font-bold text-gray-900 dark:text-white">
              {transaction.id}
            </span>
          </div>

          <div className="flex justify-between items-center py-1 border-t border-gray-200/60 dark:border-gray-800">
            <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2 font-medium">
              <Calendar className="w-4 h-4 text-blue-500" /> Date
            </span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {transaction.date}
            </span>
          </div>

          <div className="flex justify-between items-center py-1 border-t border-gray-200/60 dark:border-gray-800">
            <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2 font-medium">
              <Tag className="w-4 h-4 text-blue-500" /> Category
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
              {transaction.category}
            </span>
          </div>

          <div className="flex justify-between items-center py-1 border-t border-gray-200/60 dark:border-gray-800">
            <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2 font-medium">
              <CreditCard className="w-4 h-4 text-blue-500" /> Payment Method
            </span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {transaction.paymentMethod || "Debit Card **** 4829"}
            </span>
          </div>

          <div className="flex justify-between items-center py-1 border-t border-gray-200/60 dark:border-gray-800">
            <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2 font-medium">
              <FileText className="w-4 h-4 text-blue-500" /> Reference No
            </span>
            <span className="font-mono text-xs text-gray-700 dark:text-gray-300 font-semibold">
              {transaction.reference || "N/A"}
            </span>
          </div>

          {transaction.note && (
            <div className="flex justify-between items-center py-1 border-t border-gray-200/60 dark:border-gray-800">
              <span className="text-gray-600 dark:text-gray-400 font-medium">Note</span>
              <span className="italic text-gray-700 dark:text-gray-300 text-xs font-medium">
                {transaction.note}
              </span>
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl hover:opacity-95 transition-opacity"
        >
          Close Receipt
        </button>
      </div>
    </div>
  );
}
