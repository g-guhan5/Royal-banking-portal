import React from "react";
import { Send, FileText, Receipt, ArrowRightLeft } from "lucide-react";


export default function QuickActions({ onOpenTransfer, onPayBills, onDownloadStatement }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200/90 dark:border-gray-700/60 shadow-md shadow-gray-200/50 dark:shadow-xl dark:shadow-black/20 transition-colors">
      <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <ArrowRightLeft className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        Quick Financial Actions
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <button
          onClick={onOpenTransfer}
          className="group flex items-center justify-between p-3.5 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 hover:bg-blue-600 hover:border-blue-600 dark:hover:bg-blue-600 transition-all duration-200 text-left shadow-2xs"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 text-white group-hover:bg-white group-hover:text-blue-600 flex items-center justify-center transition-colors shrink-0 shadow-xs">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-white">
                Send Money
              </p>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-300 group-hover:text-blue-100">
                Instant Transfer
              </p>
            </div>
          </div>
        </button>

        <button
          onClick={onPayBills}
          className="group flex items-center justify-between p-3.5 rounded-xl bg-purple-50/80 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/60 hover:bg-purple-600 hover:border-purple-600 dark:hover:bg-purple-600 transition-all duration-200 text-left shadow-2xs"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-600 text-white group-hover:bg-white group-hover:text-purple-600 flex items-center justify-center transition-colors shrink-0 shadow-xs">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-white">
                Pay Bills
              </p>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-300 group-hover:text-purple-100">
                Utilities & Rent
              </p>
            </div>
          </div>
        </button>

        <button
          onClick={onDownloadStatement}
          className="group flex items-center justify-between p-3.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 hover:bg-emerald-600 hover:border-emerald-600 dark:hover:bg-emerald-600 transition-all duration-200 text-left shadow-2xs"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white group-hover:bg-white group-hover:text-emerald-600 flex items-center justify-center transition-colors shrink-0 shadow-xs">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-white">
                Download Statement
              </p>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-300 group-hover:text-emerald-100">
                Export CSV Record
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
