import { useState, useEffect } from "react";
import "./App.css";
import AddTransactionForm from "./components/add-trans-form.jsx";
import DisplayExpenses from "./components/expenses.jsx";
import ExpensesByCategory from "./components/categorized-expenses.jsx";
import Header from "./components/header.jsx";
import KpiCard from "./components/kpi-card.jsx";
import { supabase } from "./supabaseClient.js";
import { v4 as uuidv4 } from "uuid";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const [categories, setCategories] = useState([]);
  const [expenses, setExpense] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [totalBalance, setTotalBalance] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  const fetchCategories = async () => {
    const { data, error } = await supabase.from("categories").select("*");
    if (error) {
      console.error("Error fetching categories: ", error);
      setError("Failed to fetch categories");
    } else {
      setCategories(data);
    }
  };

  const fetchExpenses = async () => {
    const { data, error } = await supabase.from("expenses").select(`
      *,
      category(
      id,
      name,
      icon,
      bgcolor
      ),
      type(id,typeName)
      `);
    if (error) {
      console.error("Error fetching expenses: ,error");
      setError("Failed to fetch categories");
    } else {
      const formattedData = data.map((expense) => ({
        ...expense,
        amount:
          expense.type.typeName === "Income"
            ? `+${expense.amount}`
            : `-${expense.amount}`,
      }));
      console.log("fetched expenses: ", formattedData);
      setExpense(formattedData);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchCategories();
      await fetchExpenses();
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    let income = 0;
    let expenseTotal = 0;

    expenses.forEach((expense) => {
      const amount = parseFloat(expense.amount);
      if (expense.type.id === 2) {
        income += amount;
      } else {
        expenseTotal += Math.abs(amount);
      }
    });
    setTotalBalance(income - expenseTotal);
    setTotalExpenses(expenseTotal);
    setTotalIncome(income);
  }, [expenses]);

  const toggleModal = () => {
    console.log("current state:", isModalOpen);
    setIsModalOpen(!isModalOpen);
  };

  const addTransaction = async (data) => {
    const { title, amount, categoryId, date, type, user } = data;
    const userId = uuidv4();
    console.log("category: ", categoryId);

    const newExpense = {
      name: title,
      category: categoryId,
      date: new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      amount: amount,
      type: type === "Expense" ? 1 : 2,
      user_id: userId,
    };

    const { error } = await supabase.from("expenses").insert([newExpense]);
    if (error) {
      console.error("Error adding transaction: ", error);
      setError("Failed to add transaction");
    } else {
      // setExpense((prev) => [newExpense, ...prev]);
      await refreshExpenses();
    }
  };

  const deleteTransaction = async (id) => {
    const { error } = await supabase.from("expenses").delete().eq("id", id);
    if (error) {
      console.error("Error deleting transactions: ", error);
      setError("Failed to delete transaction");
    } else {
      setExpense((prevExpenses) =>
        prevExpenses.filter((expense) => expense.id !== id),
      );
    }
  };

  const refreshExpenses = async () => {
    await fetchExpenses();
  };

  console.log(isModalOpen);
  return (
    <div className="main-container">
      <Header onAddTransactionClick={toggleModal} />
      <div className="kpi-container">
        <KpiCard
          title="Total Balance"
          amount={`$${totalBalance.toFixed(2)}`}
          icon="lni lni-dollar"
          color="#00b894"
        />

        <KpiCard
          title="Total Income"
          amount={`$${totalIncome.toFixed(2)}`}
          icon="lni lni-stats-up"
          color="#445FFE"
        />

        <KpiCard
          title="Total Expenses"
          amount={`$${totalExpenses.toFixed(2)}`}
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
          onClose={toggleModal}
          onAddTransaction={addTransaction}
        />
      )}
    </div>
  );
}

export default App;
