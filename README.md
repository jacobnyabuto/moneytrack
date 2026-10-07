# MoneyTrack: Personal Finance Tracker

A responsive personal finance app for recording income and expenses, tracking a monthly budget, and seeing where your money goes. Built with React, Vite, and Bootstrap.

**Live demo:** https://jacobnyabuto.github.io/moneytrack/

![MoneyTrack dashboard](docs/screenshots/dashboard.png)

## Features

- **Add, edit, and delete** transactions with validated forms
- **Dashboard** with balance, income, and expense cards
- **Monthly filter** that updates totals and recent transactions
- **Search, filter, and sort** by title, type, category, month, date, or amount
- **Pagination** for long transaction lists
- **Monthly budget** with a progress bar that turns yellow at 80% and red when exceeded
- **Reports page** with a spending-by-category doughnut chart and breakdown table
- **Export to CSV** of the currently filtered transactions
- **Dark mode** that follows your system setting and remembers your choice
- **Saved in your browser** using localStorage, so data survives a refresh
- **Responsive design** for phone, tablet, and desktop
- **Error handling**: corrupted-data protection, an error boundary, empty states, and a 404 page

## Screenshots

| Transactions | Reports |
|---|---|
| ![Transactions](docs/screenshots/transactions.png) | ![Reports](docs/screenshots/reports.png) |

| Dark mode | Mobile |
|---|---|
| ![Dark mode](docs/screenshots/dark-mode.png) | ![Mobile](docs/screenshots/mobile.png) |

## Technologies Used

- [React](https://react.dev/) (hooks, Context API, custom hooks)
- [Vite](https://vite.dev/) for development and building
- [React Router](https://reactrouter.com/) for multiple pages
- [Bootstrap 5.3](https://getbootstrap.com/) and Bootstrap Icons for styling
- [Chart.js](https://www.chartjs.org/) with react-chartjs-2 for the chart
- JavaScript (ES6+)
- GitHub Pages for deployment

## Installation

Requires Node.js 20.19+ (or 22.12+).

```bash
git clone https://github.com/jacobnyabuto/moneytrack.git
cd moneytrack
npm install
```

## Running Locally

```bash
npm run dev
```

Open the link shown in the terminal (usually http://localhost:5173/moneytrack/).

Other commands:

| Command | What it does |
|---|---|
| `npm run build` | Creates the production build in `dist/` |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Checks the code with ESLint |
| `npm run deploy` | Builds and publishes to GitHub Pages |

## Project Structure

```
moneytrack/
├── docs/screenshots/        # README images
├── scripts/
│   └── copy-404.js          # Makes refresh work on GitHub Pages
├── src/
│   ├── components/          # Reusable UI pieces (Navbar, TransactionForm, BudgetProgress, ...)
│   ├── context/             # TransactionContext and TransactionProvider (shared state)
│   ├── data/                # Sample transactions, categories, chart colors
│   ├── hooks/               # useLocalStorage, useTransactions, useMonthFilter, useTheme
│   ├── pages/               # Dashboard, Transactions, Add, Edit, Reports, NotFound
│   ├── utils/               # Calculations, date helpers, formatters, validators, CSV export
│   ├── App.jsx              # Routes and error boundary
│   └── main.jsx             # Entry point
├── index.html
└── vite.config.js
```

## How It Works

- **State:** Transactions and the budget live in a React Context provider, so every page can read and update them without passing props through many layers.
- **Persistence:** A custom `useLocalStorage` hook works like `useState` but saves to the browser automatically. Loaded data is validated and cleaned, so corrupted storage can't crash the app.
- **Derived data:** Totals, filtered lists, monthly views, and chart data are calculated from the transactions on every render, never stored separately, so they can't get out of sync.
- **Routing:** React Router provides the pages, including a dynamic `/edit/:id` route that reuses the same form as the Add page.
- **Deployment:** Vite builds static files, and the `gh-pages` package publishes them. A `404.html` copy lets React Router handle page refreshes on GitHub Pages.

> **Note:** There is no backend. Data is stored only in your own browser, so it is not shared between devices and is lost if you clear your browser data.

## Future Improvements

- User accounts and cloud sync with a backend and database
- Recurring transactions
- Per-category budgets and per-month budgets
- Multiple currencies
- AI features such as auto-categorization and spending insights
- Automated tests with Vitest and React Testing Library
- Install as an offline-capable app (PWA)

## Author

**Jacob Nyabuto**

- GitHub: [@jacobnyabuto](https://github.com/jacobnyabuto)
- LinkedIn: add your profile link here