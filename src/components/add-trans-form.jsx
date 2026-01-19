import { useState } from "react";
import CreateOptions from "./options-comp";
import "./add-trans-form.css";

function AddTransactionForm({ onClose, onAddTransaction }) {
  const [transactionType, setTransactionType] = useState("Expense");
  const options = ["Expense", "Income"];
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  const categories = [
    "Food",
    "Transport",
    "Shopping",
    "Entertainment",
    "Bills",
    "Health",
    "Other",
  ];
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      //to copy the existing data first then change the value
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    if (onAddTransaction) {
      onAddTransaction({
        ...formData,
        type: transactionType
      });
    }
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
                name="amount"
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Category
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select Category
                </option>
                {categories.map((element) => (
                  <option key={element} value={element}>
                    {element}
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
