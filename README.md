# 🏦 Digital Banking Customer Portal

A responsive, high-performance, and accessible customer banking portal built using **React.js** and **Tailwind CSS**. This application simulates an online banking platform featuring client-side authentication, account balance monitoring, an interactive CSS 3D debit card, instant simulated money transfers with balance deduction, a searchable and paginated transaction ledger, and persistent Dark/Light mode.

---

## 🔗 Project Links

- **Live Application URL: [https://royal-banking-portal.vercel.app/](https://royal-banking-portal.vercel.app/)
- **GitHub Repository: [https://github.com/g-guhan5/Royal-banking-portal.git](https://github.com/g-guhan5/Royal-banking-portal.git)

---

## 1. Project Overview

The **Digital Banking Customer Portal** is designed to provide retail banking customers with a streamlined, secure-feeling, and intuitive interface to manage daily finances. 

Key product capabilities include:
- **Authentication:** Simulated login with field validation, show/hide password toggle, and fast-fill demo credentials.
- **Account Summary:** Masked account numbers, live balances, and a visual category spending breakdown.
- **Interactive 3D Card:** A CSS-powered bank card featuring a 3D flip animation to inspect CVV and expiry details.
- **Transaction Hub:** Real-time search, category filters, client-side pagination, and an itemized transaction detail receipt modal.
- **Transfer Engine:** Modal workflow with beneficiary selection, transfer amount validation against available balance, reference notes, and instantaneous ledger updates.
- **Personalization:** Persistent Dark/Light theme switching stored in local memory.

---

## 2. Technology Stack

- **Frontend Core:** React.js (v18+) via Vite
- **Programming Language:** JavaScript (ES6+)
- **Styling & Design System:** Tailwind CSS (Utility-first styling, CSS custom transforms)
- **Icons:** Lucide React (Clean, accessible SVG icon set)
- **Build & Development Tooling:** Vite (Fast ESM-based HMR and bundling)
- **Deployment:** Vercel / Netlify

---

## 3. Installation Instructions

Follow these prerequisites and steps to set up the codebase on your local machine:

### Prerequisites
- **Node.js:** `v16.x` or higher installed ([Download Node.js](https://nodejs.org/))
- **Package Manager:** `npm` (comes with Node) or `yarn` / `pnpm`
- **Git:** Installed on your local machine

### Step-by-Step Installation
1. Open your terminal and clone the repository:
   ```bash
   git clone [https://github.com/g-guhan5/Royal-banking-portal.git](https://github.com/g-guhan5/Royal-banking-portal.git)
   
## 4. How to Run the Project Locally

1. **Start the local development server:**
   ```bash
   npm run dev
   
Open the application:
   
Navigate in your browser to:
http://localhost:5173
Log in:
Use the default test credentials user@bank.com / password123 or click the one-click demo button on the login screen.

5. API / Mock-Data Approach

To provide an authentic asynchronous experience without requiring a backend server:
Central Data Store: All mock entities (user profile, account balances, beneficiaries, and historical credit/debit records) reside in src/data/mockData.js.
Asynchronous Lifecycle Simulation: A promise-based wrapper with simulated setTimeout delays (300ms to 700ms) replicates network latency.

State Handling:

isLoading: Shows spinners or skeleton placeholders during data fetching.
error: Triggers explicit alert banners with retry actions.
data: Dynamically populates UI cards and tables upon completion.
Local Mutations: Money transfers update the in-memory balance and immediately prepend the new record to the active transaction array.

6. Application Architecture
```text
The application adopts a feature-oriented, modular architecture with clean separation of concerns:

digital-banking-portal/
├── public/
│   └── favicon.svg              # Bank portal favicon
├── src/
│   ├── components/
│   │   ├── common/              # Shared UI primitives
│   │   │   ├── Button.jsx       # Custom variant buttons (primary, outline, danger)
│   │   │   ├── Input.jsx        # Accessible input fields with validation labels
│   │   │   └── Modal.jsx        # Generic accessible popup wrapper
│   │   ├── dashboard/           # Dashboard visual components
│   │   │   ├── BalanceCard.jsx  # Balance and account stats
│   │   │   ├── QuickActions.jsx # Action triggers (Transfer, Pay, Export)
│   │   │   └── SpendingChart.jsx# Visual category spending breakdown
│   │   ├── transactions/        # Transaction management
│   │   │   ├── TransactionTable.jsx # Data grid with responsive mobile card feed
│   │   │   ├── FilterBar.jsx        # Search query and category filter dropdown
│   │   │   └── TransactionModal.jsx # Detailed receipt modal
│   │   ├── transfer/            # Money transfer sub-system
│   │   │   └── TransferModal.jsx    # Recipient picker, amount validation, submit
│   │   ├── Card3D.jsx           # Interactive pure CSS 3D debit card
│   │   └── Navbar.jsx           # Navigation header, theme toggle, logout
│   ├── data/
│   │   └── mockData.js          # Baseline mock datasets & mock API handlers
│   ├── pages/
│   │   ├── Login.jsx            # Sign-in page with validation
│   │   └── Dashboard.jsx        # Primary authenticated portal view
│   ├── utils/
│   │   └── formatters.js        # Currency, date, and account masking utilities
│   ├── App.jsx                  # Main route switch & layout wrapper
│   ├── index.css                # Tailwind directives & 3D CSS transforms
│   └── main.jsx                 # React root DOM mount
├── package.json
├── tailwind.config.js
└── vite.config.js
```
7. Key Technical Decisions

Pure CSS 3D Transforms over WebGL / Three.js:
Instead of bundling large 3D graphics libraries (Three.js / React Three Fiber), the interactive debit card uses native CSS properties (perspective, transform-style: preserve-3d, and rotateY(180deg)). This provides a visually impressive flip animation with zero performance or bundle overhead.

Standard React Hooks (useState, useEffect):
State management relies on native hooks and one-way prop data flow rather than external state libraries (like Redux or Zustand). This keeps the code accessible, predictable, and easy to explain during technical interviews.

Tailwind CSS Design Tokens:
Tailwind CSS was chosen to maintain rapid, unified design consistency across spacing, typography, and responsive breakpoints, while simplifying theme persistence via the dark: utility class.

In-Memory Filtering & Pagination:
Search matching, category filtering, and pagination slices are computed dynamically using standard JavaScript array methods (.filter(), .slice()), guaranteeing instant UI response times.

8. Assumptions

Single Primary Account: The dashboard reflects a single primary checking/savings account for the active customer session.
Client Session Scope: Login status and theme preference persist across browser reloads via localStorage, but generated transactions exist in runtime memory.
Simulated Financial Transactions: No external payment gateway is connected; transfers strictly validate inputs against the active mock balance.

9. Known Limitations

State Reset on Refresh: Newly created transfer records and modified balances reset to the default mock baseline upon a hard page reload.
Visual Analytics: Expense charts use styled HTML/CSS progress meters rather than heavy third-party charting libraries to maintain minimal bundle weight.
Static Beneficiary Pool: Transfer recipients are chosen from a predefined mock list rather than a full dynamic address book CRUD engine.

10. Potential Future Improvements

Persistent Offline Storage: Connect IndexedDB or localStorage to retain created transfers across page refreshes.
Automated Testing: Implement unit and component tests with Vitest and React Testing Library.
Export Formats: Add client-side CSV or PDF statement generation (using jspdf or html2pdf.js).
Multi-Account Switching: Enable tabbed switching between Checking, Savings, and Credit accounts.
2FA Verification Modal: Introduce a simulated SMS/Email OTP verification step before finalizing transfers.
