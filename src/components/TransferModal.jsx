import React, { useState } from "react";
import { X, Send, Loader2, AlertCircle, IndianRupee, UserCheck, FileText } from "lucide-react";
import { executeMockTransfer } from "../data/mockData";

export default function TransferModal({
  isOpen,
  onClose,
  recipients = [],
  availableBalance = 0,
  onTransferSuccess
}) {
  const [selectedRecipientId, setSelectedRecipientId] = useState(recipients[0]?.id || "");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const formatCurrency = (val) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2
    }).format(val || 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const numAmount = parseFloat(amount);
    if (!selectedRecipientId) {
      setError("Please select a valid recipient.");
      return;
    }

    if (isNaN(numAmount) || numAmount <= 0) {
      setError("Please enter a valid transfer amount greater than ₹0.00.");
      return;
    }

    if (numAmount > availableBalance) {
      setError(`Insufficient funds. Your available balance is ${formatCurrency(availableBalance)}.`);
      return;
    }

    const recipient = recipients.find((r) => r.id === selectedRecipientId);
    const recipientName = recipient ? recipient.name : "Recipient";

    try {
      setIsLoading(true);
      const response = await executeMockTransfer({
        recipientName,
        amount: numAmount,
        note
      });

      if (response.success) {
        setAmount("");
        setNote("");
        setIsLoading(false);
        onTransferSuccess(numAmount, response.transaction, response.message);
        onClose();
      }
    } catch (err) {
      setIsLoading(false);
      setError(err.message || "Transfer failed. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 dark:border-gray-700 relative">

        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Send Money</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                Instant UPI / IMPS peer-to-peer transfer
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 bg-gray-100 dark:bg-gray-700/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex justify-between items-center bg-amber-50 dark:bg-amber-950/40 px-3.5 py-2 rounded-xl text-xs border border-amber-200/60 dark:border-amber-900/40">
            <span className="text-gray-700 dark:text-gray-300 font-semibold">Available Balance:</span>
            <span className="font-bold text-amber-700 dark:text-amber-400 font-mono text-sm">
              {formatCurrency(availableBalance)}
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-amber-500" /> Select Recipient
            </label>
            <select
              value={selectedRecipientId}
              onChange={(e) => setSelectedRecipientId(e.target.value)}
              disabled={isLoading}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
            >
              {recipients.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} ({r.bank} - {r.accountMask})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1.5">
              <IndianRupee className="w-3.5 h-3.5 text-amber-500" /> Transfer Amount (₹ INR)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500 dark:text-gray-400 font-bold text-base">
                ₹
              </div>
              <input
                type="number"
                step="1"
                min="1"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={isLoading}
                className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-base font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-amber-500" /> Optional Note / Reference
            </label>
            <input
              type="text"
              placeholder="e.g. Rent share, Bill split, Dinner"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              disabled={isLoading}
              className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-sm font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" /> Processing...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Confirm Transfer
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
