import React, { useState } from "react";
import './pfm.css'
function Pfm() {
  // State variables for income, expenses, transactions, and ad revenue
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [adRevenue, setAdRevenue] = useState(0);

  // Event handlers for income, expenses, and transaction inputs
  const handleIncomeChange = (event) => {
    setIncome(parseFloat(event.target.value));
  };

  const handleExpensesChange = (event) => {
    setExpenses(parseFloat(event.target.value));
  };

  const handleAddTransaction = () => {
    const description = prompt("Enter transaction description:");
    const amount = parseFloat(prompt("Enter transaction amount:"));
    const newTransaction = { description, amount };
    setTransactions([...transactions, newTransaction]);
  };

  // Event handler for ad revenue input
  const handleAdRevenueChange = (event) => {
    setAdRevenue(parseFloat(event.target.value));
  };

  // Helper function to calculate total income from transactions
  const calculateTotalIncome = () => {
    return transactions
      .filter((t) => t.amount > 0)
      .reduce((acc, t) => acc + t.amount, 0);
  };

  // Helper function to calculate total expenses from transactions
  const calculateTotalExpenses = () => {
    return transactions
      .filter((t) => t.amount < 0)
      .reduce((acc, t) => acc + t.amount, 0);
  };

  // Helper function to calculate net income from income, expenses, and transactions
  const calculateNetIncome = () => {
    const totalIncome = calculateTotalIncome();
    const totalExpenses = calculateTotalExpenses();
    return income + totalIncome + totalExpenses - expenses;
  };

  // Helper function to calculate net income with ad revenue
  const calculateNetIncomeWithAdRevenue = () => {
    return calculateNetIncome() + adRevenue;
  };

  // Helper function to format currency amounts
  const formatCurrency = (amount) => {
    return "$" + amount.toFixed(2);
  };

  // Render the PFM UI
  return (
    <div className="finance-manager">
      <h2>Personal Finance Manager</h2>

      {/* Income and expenses inputs */}
      <div className="inputs">
        <div className="input-group">
          <label htmlFor="income">Monthly Income:</label>
          <input type="number" id="income" value={income} onChange={handleIncomeChange} />
        </div>
        <div className="input-group">
          <label htmlFor="expenses">Monthly Expenses:</label>
          <input type="number" id="expenses" value={expenses} onChange={handleExpensesChange} />
        </div>
      </div>

      {/* Transaction list */}
      <div className="transactions">
        <h3>Transactions</h3>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, i) => (
              <tr key={i}>
                <td>{t.description}</td>
                <td className={t.amount < 0 ? "expense" : "income"}>{formatCurrency(t.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleAddTransaction}>Add Transaction</button>
      </div>

      {/* Ad revenue input */}
      <div className="ad-revenue-input">
        <label htmlFor="ad-revenue">Monthly Ad Revenue:</label>
        <input type="number" id="ad-revenue" value={adRevenue} onChange={handleAdRevenueChange} />
      </div>

      {/* Totals */}
      <div className="totals">
        <div className="total-group">
          <span>Total Income:</span>
          <span className="amount">{formatCurrency(calculateTotalIncome())}</span>
        </div>
        <div className="total-group">
          <span>Total Expenses:</span>
          <span className="amount">{formatCurrency(calculateTotalExpenses())}</span>
        </div>
        <div className="total-group">
          <span>Net Income:</span>
          <span className="amount">{formatCurrency(calculateNetIncome())}</span>
        </div>
        <div className="total-group">
          <span>Net Income with Ad Revenue:</span>
          <span className="amount">{formatCurrency(calculateNetIncomeWithAdRevenue())}</span>
        </div>
      </div>
    </div>
  );
}

export default Pfm;