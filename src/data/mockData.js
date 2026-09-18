export const mockUserProfile = {
  name: "Alex Morgan",
  email: "user@bank.com",
  accountNumber: "9876543210",
  routingNumber: "ROYAL000432",
  cardHolder: "ALEX MORGAN",
  cardNumberMasked: "**** **** **** 4829",
  cardFullNumber: "4532 8901 2345 4829",
  cardExpiry: "08/28",
  cardCvv: "839",
  cardType: "Visa Signature Platinum",
  accountType: "Checking Savings Account (Tier 1)",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80"
};

export const mockInitialBalances = {
  totalBalance: 248500.50,
  availableBalance: 214300.00,
  monthlySpend: 34205.50
};

export const mockRecipients = [
  { id: "rcp_1", name: "Sarah Jenkins", email: "sarah.j@gmail.com", bank: "HDFC Bank", accountMask: "**** 1092" },
  { id: "rcp_2", name: "Marcus Vance", email: "marcus.v@outlook.com", bank: "ICICI Bank", accountMask: "**** 5541" },
  { id: "rcp_3", name: "Tech Solutions Inc", email: "billing@techsolutions.com", bank: "State Bank of India", accountMask: "**** 8832" },
  { id: "rcp_4", name: "Metro Power & Light", email: "payments@metropower.in", bank: "Axis Bank", accountMask: "**** 3390" },
  { id: "rcp_5", name: "Elena Rostova", email: "elena.r@designhub.io", bank: "Kotak Mahindra Bank", accountMask: "**** 7120" }
];

export const mockInitialTransactions = [
  {
    id: "TXN-9841",
    date: "2026-09-16",
    merchant: "TechCorp Global Salary",
    category: "Salary",
    type: "credit",
    amount: 142500.00,
    status: "Completed",
    reference: "REF-SALARY-SEP1",
    paymentMethod: "NEFT / Direct Salary Deposit"
  },
  {
    id: "TXN-9840",
    date: "2026-09-15",
    merchant: "Nature's Basket Grocery",
    category: "Food",
    type: "debit",
    amount: 3428.00,
    status: "Completed",
    reference: "REF-GROC-88932",
    paymentMethod: "Debit Card **** 4829"
  },
  {
    id: "TXN-9839",
    date: "2026-09-14",
    merchant: "Netflix Premium Subscription",
    category: "Entertainment",
    type: "debit",
    amount: 649.00,
    status: "Completed",
    reference: "REF-NTFX-0192",
    paymentMethod: "UPI Auto-Debit **** 4829"
  },
  {
    id: "TXN-9838",
    date: "2026-09-13",
    merchant: "State Electricity Board",
    category: "Bills",
    type: "debit",
    amount: 2850.50,
    status: "Completed",
    reference: "REF-UTIL-5531",
    paymentMethod: "BBPS Bill Pay"
  },
  {
    id: "TXN-9837",
    date: "2026-09-12",
    merchant: "Amazon India Electronics",
    category: "Shopping",
    type: "debit",
    amount: 14299.00,
    status: "Completed",
    reference: "REF-AMZ-99120",
    paymentMethod: "Debit Card **** 4829"
  },
  {
    id: "TXN-9836",
    date: "2026-09-11",
    merchant: "Starbucks Coffee",
    category: "Food",
    type: "debit",
    amount: 650.00,
    status: "Completed",
    reference: "REF-SBUX-4410",
    paymentMethod: "UPI Debit **** 4829"
  },
  {
    id: "TXN-9835",
    date: "2026-09-10",
    merchant: "Uber Cabs Ride",
    category: "Food",
    type: "debit",
    amount: 480.00,
    status: "Completed",
    reference: "REF-UBER-7712",
    paymentMethod: "Debit Card **** 4829"
  },
  {
    id: "TXN-9834",
    date: "2026-09-08",
    merchant: "Apple Store India",
    category: "Shopping",
    type: "debit",
    amount: 79900.00,
    status: "Completed",
    reference: "REF-AAPL-1002",
    paymentMethod: "Debit Card **** 4829"
  },
  {
    id: "TXN-9833",
    date: "2026-09-06",
    merchant: "Freelance Project Payout",
    category: "Salary",
    type: "credit",
    amount: 28500.00,
    status: "Completed",
    reference: "REF-IMPS-4491",
    paymentMethod: "IMPS Instant Transfer"
  },
  {
    id: "TXN-9832",
    date: "2026-09-05",
    merchant: "Cult.fit Fitness Club",
    category: "Entertainment",
    type: "debit",
    amount: 2450.00,
    status: "Completed",
    reference: "REF-GYM-9911",
    paymentMethod: "UPI Auto-Debit **** 4829"
  },
  {
    id: "TXN-9831",
    date: "2026-09-03",
    merchant: "Decathlon Sports",
    category: "Shopping",
    type: "debit",
    amount: 3890.00,
    status: "Completed",
    reference: "REF-DEC-3329",
    paymentMethod: "Debit Card **** 4829"
  },
  {
    id: "TXN-9830",
    date: "2026-09-01",
    merchant: "Apartment Monthly Rent",
    category: "Bills",
    type: "debit",
    amount: 25000.00,
    status: "Completed",
    reference: "REF-RENT-9001",
    paymentMethod: "RTGS Bank Transfer"
  }
];


export const fetchMockData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: mockUserProfile,
        balances: mockInitialBalances,
        transactions: mockInitialTransactions,
        recipients: mockRecipients
      });
    }, 400);
  });
};


export const executeMockTransfer = ({ recipientName, amount, note }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const numAmount = parseFloat(amount);
      if (isNaN(numAmount) || numAmount <= 0) {
        reject(new Error("Transfer amount must be greater than ₹0.00"));
        return;
      }

      const formattedAmountStr = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR"
      }).format(numAmount);

      const newTxn = {
        id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toISOString().split("T")[0],
        merchant: `Transfer to ${recipientName}`,
        category: "Bills",
        type: "debit",
        amount: numAmount,
        status: "Completed",
        reference: `REF-TRSF-${Math.floor(100000 + Math.random() * 900000)}`,
        paymentMethod: "Instant UPI / IMPS Bank Transfer",
        note: note || "N/A"
      };

      resolve({
        success: true,
        message: `Successfully transferred ${formattedAmountStr} to ${recipientName}`,
        transaction: newTxn
      });
    }, 1000);
  });
};
