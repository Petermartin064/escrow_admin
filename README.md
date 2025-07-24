# Escrow Courier Admin Web App

An admin dashboard web application for managing parcels, agents, vendors, and delivery reports. Built as part of a practical assessment, the app provides a clean, modern UI with filtering, charts, and export capabilities.

---

##  Features

### Dashboard
- Metric cards for key stats (e.g. parcels today, pending deliveries)
- Weekly parcel summary chart (bar chart)

###  Parcels Management
- View all parcels in a table
- Filter by:
  - Status (in transit, delivered, failed)
  - Date range
  - Agent
- Update parcel status

### Agents Management
- View agents
- Activate / Deactivate agents
- View agent delivery history (modal)

### Vendor Management
- View registered vendors
- Approve or reject pending vendors
- Show registration date & status

### Wallet & Payouts
- View agent wallet balances
- Trigger payouts
- Update last payout date and reset balance

### Reports Page
- Pie chart: delivery status breakdown
- Line chart: daily delivery trend
- Export data as:
  -  CSV
  -  PDF (via jsPDF)

---

## Tech Stack

- **Frontend:** React + Vite
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **PDF Export:** jsPDF
- **Routing:** React Router

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/escrow-admin.git
cd escrow-admin
