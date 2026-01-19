import { useState } from "react";
import "./expenses.css";

function DisplayExpenses({ expenses, onDelete }) {
  const [activeTab, setActiveTab] = useState("All");

  // Correctly filter the expenses based on the active tab
  const filteredExpenses = expenses.filter((expense) => {
    if (activeTab === "Income") {
      return expense.amount.startsWith("+");
    }
    if (activeTab === "Expenses") {
      return expense.amount.startsWith("-");
    }
    // If the tab is "All", return true for every item
    return true;
  });

  return (
    <>
      <div className="expenses-card">
        <div className="filter-categories">
          <div className="options-tab">
            <button
              onClick={() => setActiveTab("All")}
              className={activeTab == "All" ? "active" : ""}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab("Expenses")}
              className={activeTab == "Expenses" ? "active" : ""}
            >
              Expenses
            </button>
            <button
              onClick={() => setActiveTab("Income")}
              className={activeTab == "Income" ? "active" : ""}
            >
              Income
            </button>
          </div>
          <div className="categories-list">
            <select>
              <option value="All Categories" defaultChecked>
                All Categories
              </option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Shopping">Shopping</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Bills">Bills</option>
              <option value="Health">Health</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div className="expense-list">
          {filteredExpenses.map((expense) => (
            <div key={expense.id} className="expense-item">
              <div
                className="expense-item-icon"
                style={{ backgroundColor: expense.bgcolor }}
              >
                <i className={expense.icon}></i>
              </div>
              <div className="expense-item-details">
                <p className="expense-name">{expense.name}</p>
                <p className="expense-category-date">{`${expense.category}  -  ${expense.date}`}</p>
              </div>
              <div className="expense-item-end">
                <p
                  className={
                    expense.amount.startsWith("+")
                      ? "income-amount"
                      : "expense-item-amount"
                  }
                >
                  {expense.amount}
                </p>
                <i className="lni lni-trash-can" onClick={()=>onDelete(expense.id)}></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default DisplayExpenses;
