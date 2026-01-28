import { useState } from "react";
import "./expenses.css";
import { fetchCategories } from "../hooks/fetchCategories";

function DisplayExpenses({ expenses, onDelete }) {
  // console.log(expenses);
  const [activeTab, setActiveTab] = useState("All");
  const { categories, error } = fetchCategories();
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // filter the expenses based on the active tab
  const filteredExpenses = expenses.filter((expense) => {
    if (selectedCategory && expense.category?.id !== selectedCategory)
      return false;
    if (activeTab === "Income") {
      return expense.type.id === 2;
    }
    if (activeTab === "Expenses") {
      return expense.type.id === 1;
    }
    return true;
  });
  // order expenses in ascending order
  const sortedExpenses = filteredExpenses.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at),
  );

  // console.log("filtered expenses: ", filteredExpenses);
  const isEmpty = expenses.length === 0;

  return (
    <>
      <div className="expenses-card">
        <div className="filter-categories">
          <div className="options-tab">
            <button
              onClick={() => handleTabChange("All")}
              className={activeTab == "All" ? "active" : ""}
            >
              All
            </button>
            <button
              onClick={() => handleTabChange("Expenses")}
              className={activeTab == "Expenses" ? "active" : ""}
            >
              Expenses
            </button>
            <button
              onClick={() => handleTabChange("Income")}
              className={activeTab == "Income" ? "active" : ""}
            >
              Income
            </button>
          </div>
          <div className="categories-list">
            <select value={selectedCategory} onChange={handleCategoryChange}>
              <option value="">All Categories</option>
              {categories.map((element) => (
                <option value={element.id} key={element.id}>
                  {element.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="expense-list">
          {isEmpty && (
            <p className="empty-list-msg">
              No expenses recorded. Time to add your first transaction!
            </p>
          )}
          {sortedExpenses.map((expense) => (
            <div key={expense.id} className="expense-item">
              <div
                className="expense-item-icon"
                style={{ backgroundColor: expense.category.bgcolor }}
              >
                <i className={expense.category.icon}></i>
              </div>
              <div className="expense-item-details">
                <p className="expense-name">{expense.name}</p>
                <p className="expense-category-date">
                  {expense.category.name}
                  <span className="expense-date-separator"> - </span>
                  <span className="expense-date-mobile-block">
                    {expense.date}
                  </span>
                </p>
              </div>
              <div className="expense-item-end">
                <p
                  className={
                    expense.type.id == 2
                      ? "income-amount"
                      : "expense-item-amount"
                  }
                >
                  {`${expense.type.id == 1 ? "-" : "+"}JD${Math.abs(expense.amount)}`}
                </p>
                <i
                  className="lni lni-trash-can"
                  onClick={() => onDelete(expense.id)}
                ></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default DisplayExpenses;
