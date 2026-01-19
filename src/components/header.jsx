import "./header.css";

function Header({ onAddTransactionClick }) {
  return (
    <header className="app-header">
      <div className="logo">
        <i className="lni lni-wallet"></i>
      </div>
      <div className="title">
        <h4>Expense Tracker</h4>
        <p>Manage your finances effortlessly</p>
      </div>
      <button className="header-button" onClick={onAddTransactionClick}>
        <i className="lni lni-plus"></i>
        Add Transaction
      </button>
    </header>
  );
}

export default Header;