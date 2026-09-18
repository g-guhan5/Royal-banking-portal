import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import BankCard3D from "../components/BankCard3D";
import BalanceCards from "../components/BalanceCards";
import QuickActions from "../components/QuickActions";
import TransactionLedger from "../components/TransactionLedger";
import TransactionModal from "../components/TransactionModal";
import TransferModal from "../components/TransferModal";
import SpendingSummary from "../components/SpendingSummary";
import Toast from "../components/Toast";
import { fetchMockData } from "../data/mockData";
import { Loader2 } from "lucide-react";


export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [balances, setBalances] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const [toast, setToast] = useState({ message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchMockData();
        setUserData(data.user);
        setBalances(data.balances);
        setTransactions(data.transactions);
        setRecipients(data.recipients);
      } catch (err) {
        console.error("Error fetching mock data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const handleTransferSuccess = (transferredAmount, newTransaction, successMessage) => {
    setBalances((prev) => ({
      ...prev,
      availableBalance: Math.max(prev.availableBalance - transferredAmount, 0),
      totalBalance: Math.max(prev.totalBalance - transferredAmount, 0),
      monthlySpend: prev.monthlySpend + transferredAmount
    }));

    setTransactions((prev) => [newTransaction, ...prev]);

    showToast(successMessage || "Money transfer completed!", "success");
  };

  const handlePayBills = () => {
    showToast("Bill Pay active: Select utility provider to schedule automated payment.", "success");
  };

  const handleDownloadStatement = () => {
    if (transactions.length === 0) {
      showToast("No transactions available to export.", "error");
      return;
    }

    const headers = ["Transaction ID", "Date", "Merchant", "Category", "Type", "Amount (₹)", "Status", "Reference"];
    const rows = transactions.map((t) => [
      t.id,
      t.date,
      `"${t.merchant.replace(/"/g, '""')}"`,
      t.category,
      t.type,
      t.amount.toFixed(2),
      t.status || "Completed",
      t.reference
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Royal_Bank_Statement_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast("Transaction statement downloaded as CSV file!", "success");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Loading secure banking session...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">

      <Navbar />

      <main className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-8 space-y-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          <div className="order-1 lg:order-2 lg:col-span-8 space-y-6">
            <BalanceCards balances={balances} />
            <QuickActions
              onOpenTransfer={() => setIsTransferModalOpen(true)}
              onPayBills={handlePayBills}
              onDownloadStatement={handleDownloadStatement}
            />
          </div>

          <div className="order-2 lg:order-1 lg:col-span-4 bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200/90 dark:border-gray-700/60 shadow-md shadow-gray-200/50 dark:shadow-xl dark:shadow-black/20 flex flex-col justify-center items-center transition-colors">
            <h3 className="w-full text-sm font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-between">
              <span>Primary Debit Card</span>
              <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800 font-bold">
                ACTIVE
              </span>
            </h3>
            <BankCard3D userCard={userData} />
          </div>

        </div>

        <SpendingSummary transactions={transactions} />

        <TransactionLedger
          transactions={transactions}
          onSelectTransaction={(txn) => setSelectedTransaction(txn)}
        />
      </main>

      <TransferModal
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        recipients={recipients}
        availableBalance={balances?.availableBalance || 0}
        onTransferSuccess={handleTransferSuccess}
      />

      <TransactionModal
        transaction={selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
      />

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "success" })}
      />
    </div>
  );
}
