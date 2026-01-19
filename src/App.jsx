import { useState } from "react";
import "./App.css";
import AddTransactionForm from "./components/add-trans-form.jsx";
import DisplayExpenses from "./components/expenses.jsx";
import ExpensesByCategory from "./components/categorized-expenses.jsx";
import Header from "./components/header.jsx";
import KpiCard from "./components/kpi-card.jsx";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  let categories = {
    food: {
      name: "Food",
      icon: "lni lni-restaurant",
      bgcolor: "#FFEDD4",
    },
    entertainment: {
      name: "Entertainment",
      icon: "lni lni-game",
      bgcolor: "#FCE7F3",
    },
    transport: {
      name: "Transport",
      icon: "lni lni-car",
      bgcolor: "#DBEAFE",
    },
    other: {
      name: "Other",
      icon: "lni lni-archive",
      bgcolor: "#d5d5d5ff",
    },
  };

  const [expenses, setExpense] = useState([
    {
      id: 1,
      name: "Grocery Shopping",
      category: "Food",
      date: "Sep 27,2025",
      amount: "-$300",
      icon: categories.food.icon,
      bgcolor: categories.food.bgcolor,
    },
    {
      id: 2,
      name: "Salary",
      category: "Other",
      date: "Aug 19,2025",
      amount: "+$30000000000",
      icon: categories.other.icon,
      bgcolor: categories.other.bgcolor,
    },
    {
      id: 3,
      name: "Uber Ride",
      category: "Transport",
      date: "Nov 22,2025",
      amount: "-$389",
      icon: categories.transport.icon,
      bgcolor: categories.transport.bgcolor,
    },
    {
      id: 4,
      name: "Youtube Subscription",
      category: "Entertainment",
      date: "Nov 22,2025",
      amount: "-$200",
      icon: categories.entertainment.icon,
      bgcolor: categories.entertainment.bgcolor,
    },
  ]);

  const addTransaction = (data) => {
    const { title, amount, category, date, type } = data;

    const categoryKey = category.toLowerCase();
    const categoryStyle = categories[categoryKey] || categories.other;

    const newExpense = {
      id: Date.now(),
      name: title,
      category: category,
      date: new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      amount: type === "Expense" ? `-$${amount}` : `+$${amount}`,
      icon: categoryStyle.icon,
      bgcolor: categoryStyle.bgcolor,
    };

    setExpense((prev) => [newExpense, ...prev]);
  };

  const deleteTransaction = (id) => {
    setExpense((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== id)
    );
  };

  return (
    <>
      <div className="main-container">
        <Header onAddTransactionClick={() => setIsModalOpen(true)} />
        <div className="kpi-container">
          <KpiCard
            title="Total Balance"
            amount="$3250.29"
            icon="lni lni-dollar"
            color="#00b894"
          />

          <KpiCard
            title="Total Income"
            amount="$3500.78"
            icon="lni lni-stats-up"
            color="#445FFE"
          />

          <KpiCard
            title="Total Expenses"
            amount="$200"
            icon="lni lni-stats-down"
            color="#d63031"
          />
        </div>

        <div className="expenses-categories">
          <DisplayExpenses expenses={expenses} onDelete={deleteTransaction} />
          <ExpensesByCategory expenses={expenses} />
        </div>
        {isModalOpen && (
          <AddTransactionForm
            onClose={() => setIsModalOpen(false)}
            onAddTransaction={addTransaction}
          />
        )}
      </div>
    </>
  );
}

export default App;
