# 🏦 Digital Banking Customer Portal

A responsive, modern, and user-friendly online banking dashboard built with **React.js (Vite)** and **Tailwind CSS**. This project simulates core online banking features such as user authentication, balance tracking, interactive 3D card preview, money transfers, and transaction filtering using local mock data.

---

## 🚀 Live Demo & Links

- **Live URL:** [https://your-bank-portal-demo.vercel.app](https://royal-banking-portal.vercel.app/)]
- **Repository:** [https://github.com/g-guhan5/Royal-banking-portal.git](https://github.com/g-guhan5/Royal-banking-portal.git)]

---

## ✨ Features

- **🔐 Mock Authentication:** Secure login screen with client-side validation, show/hide password toggle, loading spinner, and quick demo-login shortcuts.
- **💳 Interactive CSS 3D Bank Card:** Realistic credit/debit card with a 3D flip animation revealing the CVV and expiry date.
- **📊 Customer Dashboard:** Quick view of total balance, available balance, masked account numbers, and monthly spending.
- **💸 Money Transfer Simulation:** Multi-step modal workflow with dynamic balance deduction, beneficiary selection, and balance sufficiency validation.
- **📋 Transaction Management:**
  - Real-time search by merchant/description.
  - Category filter (Food, Bills, Shopping, Salary).
  - Client-side pagination (5 items per page).
  - Detailed transaction receipt modal.
- **📈 Spending Summary:** Visual breakdown of monthly category expenses using intuitive progress bars.
- **🌓 Dark / Light Mode:** Fully themed UI toggled with a single click and saved to `localStorage`.
- **📱 Fully Responsive:** Optimized for mobile phones, tablets, and desktop viewports.

---

## 🛠️ Tech Stack

- **Frontend:** React.js (Vite)
- **Language:** JavaScript (ES6+)
- **Styling:** Tailwind CSS, CSS 3D Transforms
- **Icons:** Lucide React
- **Deployment:** Vercel 

---

## 📁 Project Structure

src/
├── components/
│   ├── Navbar.jsx          # Top navigation with dark mode toggle
│   ├── Card3D.jsx          # Interactive 3D flip credit card
│   ├── SummaryCards.jsx    # Balance and quick statistics cards
│   ├── TransferModal.jsx   # Send money popup with validation
│   ├── TransactionTable.jsx# Paginated and searchable transactions
│   └── Modal.jsx           # Reusable generic popup wrapper
├── pages/
│   ├── Login.jsx           # Authentication view
│   └── Dashboard.jsx       # Primary customer portal view
├── data/
│   └── mockData.js         # Dummy accounts and transaction records
├── App.jsx                 # Routing and global layout
├── index.css               # Tailwind utility imports & base styles
└── main.jsx                # Vite entry point
