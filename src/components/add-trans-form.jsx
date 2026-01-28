import { useEffect, useState } from "react";
import CreateOptions from "./options-comp";
import "./add-trans-form.css";
import { supabase } from "../supabaseClient";
import { fetchCategories } from "../hooks/fetchCategories";
import { parse } from "uuid";

function AddTransactionForm({ onClose, onAddTransaction, userId }) {
  const [transactionType, setTransactionType] = useState("Expense");
  const options = ["Expense", "Income"];
  const { categories} = fetchCategories();
  const[error,setError]=useState(null);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    categoryId: "",
    date: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      //to copy the existing data first then change the value
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.amount ||
      parseFloat(formData.amount)<=0 ||
      !formData.categoryId ||
      !formData.date
    ) {
      setError("Please fill in all fields");
      return;
    }
    setError(null);
    await onAddTransaction({ ...formData,type:transactionType, userId });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <div className="form-header">
            <div>
              <h3>Add Transaction</h3>
              <p>Add a new income or expense transaction</p>
            </div>
            <button type="button" className="close-button" onClick={onClose}>
              &times;
            </button>
          </div>
          <CreateOptions
            options={options}
            activeTab={transactionType}
            setActiveTab={setTransactionType}
          />
          {error && <p className="error-message">{error}</p>}
          <div className="input-fields">
            <label>
              Title
              <input
                type="text"
                value={formData.title}
                name="title"
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Amount
              <input
                type="number"
                value={formData.amount}
                min="0.01"
                name="amount"
                step="0.01"
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Category
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select Category
                </option>
                {categories.map((element) => (
                  <option key={element.id} value={element.id}>
                    {element.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Date
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <div className="form-footer">
            <button type="submit" className="add-transaction-button">
              Add {transactionType}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTransactionForm;
