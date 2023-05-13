import React, { useState } from "react";
import './credit.css'
function Credit() {
  // State variables for credit card balance, interest rate, and monthly payment
  const [creditCardBalance, setCreditCardBalance] = useState(0);
  const [creditCardInterestRate, setCreditCardInterestRate] = useState(0);
  const [creditCardMonthlyPayment, setCreditCardMonthlyPayment] = useState(0);

  // State variables for loan balance, interest rate, and monthly payment
  const [loanBalance, setLoanBalance] = useState(0);
  const [loanInterestRate, setLoanInterestRate] = useState(0);
  const [loanMonthlyPayment, setLoanMonthlyPayment] = useState(0);

  // State variables for ad revenue and creator add revenue
  const [adRevenue, setAdRevenue] = useState(0);
  const [creatorAddRevenue, setCreatorAddRevenue] = useState(0);

  // Helper function to calculate the minimum monthly payment for the credit card based on the balance and interest rate
  const calculateCreditCardMinimumMonthlyPayment = () => {
    return creditCardBalance * (creditCardInterestRate / 1200 + 1 / 1200) ** -1;
  };

  // Helper function to calculate the total interest paid over the life of the credit card loan
  const calculateCreditCardTotalInterestPaid = () => {
    let totalInterest = 0;
    let currentBalance = creditCardBalance;
    let monthlyInterestRate = creditCardInterestRate / 1200;
    let monthlyPaymentWithAds = creditCardMonthlyPayment + adRevenue + creatorAddRevenue;
    while (currentBalance > 0) {
      const monthlyInterest = currentBalance * monthlyInterestRate;
      totalInterest += monthlyInterest;
      currentBalance += monthlyInterest - monthlyPaymentWithAds;
      if (currentBalance < 0) {
        monthlyPaymentWithAds += currentBalance;
        currentBalance = 0;
      }
    }
    return totalInterest;
  };

  // Helper function to calculate the total interest paid over the life of the loan
  const calculateLoanTotalInterestPaid = () => {
    let totalInterest = 0;
    let currentBalance = loanBalance;
    let monthlyInterestRate = loanInterestRate / 1200;
    let monthlyPaymentWithAds = loanMonthlyPayment + adRevenue + creatorAddRevenue;
    while (currentBalance > 0) {
      const monthlyInterest = currentBalance * monthlyInterestRate;
      totalInterest += monthlyInterest;
      currentBalance += monthlyInterest - monthlyPaymentWithAds;
      if (currentBalance < 0) {
        monthlyPaymentWithAds += currentBalance;
        currentBalance = 0;
      }
    }
    return totalInterest;
  };

  // Event handlers for credit card balance, interest rate, and monthly payment inputs
  const handleCreditCardBalanceChange = (event) => {
    setCreditCardBalance(parseFloat(event.target.value));
  };

  const handleCreditCardInterestRateChange = (event) => {
    setCreditCardInterestRate(parseFloat(event.target.value));
  };

  const handleCreditCardMonthlyPaymentChange = (event) => {
    setCreditCardMonthlyPayment(parseFloat(event.target.value));
  };

  // Event handlers for loan balance, interest rate, and monthly payment inputs
  const handleLoanBalanceChange = (event) => {
    setLoanBalance(parseFloat(event.target.value));
  };

  const handleLoanInterestRateChange = (event) => {
    setLoanInterestRate(parseFloat(event.target.value));
  };

  const handleLoanMonthlyPaymentChange = (event) => {
    setLoanMonthlyPayment(parseFloat(event.target.value));
  };

  // Event handlers for ad revenue and creator add revenue inputs
  const handleAdRevenueChange = (event) => {
    setAdRevenue(parseFloat(event.target.value));
  };

  const handleCreatorAddRevenueChange = (event) => {
    setCreatorAddRevenue(parseFloat(event.target.value));
  };

  // Helper function to format currency amounts
  const formatCurrency = (amount) => {
    return "$" + amount.toFixed(2);
  };

  // Render the credit card and loan calculator UI
  return (
    <div className="credit-card-and-loan-calculator">
      <h2>Credit Card and Loan Calculator</h2>

      {/* Credit card inputs */}
      <div className="credit-card-inputs">
        <h3>Credit Card</h3>
        <div className="input-group">
          <label htmlFor="credit-card-balance">Balance:</label>
          <input type="number" id="credit-card-balance" value={creditCardBalance} onChange={handleCreditCardBalanceChange} />
        </div>
        <div className="input-group">
          <label htmlFor="credit-card-interest-rate">Interest Rate (%):</label>
          <input type="number" id="credit-card-interest-rate" value={creditCardInterestRate} onChange={handleCreditCardInterestRateChange} />
        </div>
        <div className="input-group">
          <label htmlFor="credit-card-monthly-payment">Monthly Payment:</label>
          <input type="number" id="credit-card-monthly-payment" value={creditCardMonthlyPayment} onChange={handleCreditCardMonthlyPaymentChange} />
        </div>
      </div>

      {/* Loan inputs */}
      <div className="loan-inputs">
        <h3>Loan</h3>
        <div className="input-group">
          <label htmlFor="loan-balance">Balance:</label>
          <input type="number" id="loan-balance" value={loanBalance} onChange={handleLoanBalanceChange} />
        </div>
        <div className="input-group">
          <label htmlFor="loan-interest-rate">Interest Rate (%):</label>
          <input type="number" id="loan-interest-rate" value={loanInterestRate} onChange={handleLoanInterestRateChange} />
        </div>
        <div className="input-group">
          <label htmlFor="loan-monthly-payment">Monthly Payment:</label>
          <input type="number" id="loan-monthly-payment" value={loanMonthlyPayment} onChange={handleLoanMonthlyPaymentChange} />
        </div>
      </div>

      {/* Ad revenue inputs */}
      <div className="ad-revenue-inputs">
        <h3>Ad Revenue</h3>
        <div className="input-group">
          <label htmlFor="ad-revenue">Ad revenue:</label>
          <input type="number" id="ad-revenue" value={adRevenue} onChange={handleAdRevenueChange} />
        </div>
        <div className="input-group">
          <label htmlFor="creator-add-revenue">Creator add revenue:</label>
          <input type="number" id="creator-add-revenue" value={creatorAddRevenue} onChange={handleCreatorAddRevenueChange} />
        </div>
      </div>

      {/* Results */}
      <div className="results">
        <h3>Results</h3>
        <div className="result">
          <span>Credit Card Minimum Monthly Payment:</span>
          <span>{formatCurrency(calculateCreditCardMinimumMonthlyPayment())}</span>
        </div>
        <div className="result">
          <span>Credit Card Total Interest Paid:</span>
          <span>{formatCurrency(calculateCreditCardTotalInterestPaid())}</span>
        </div>
        <div className="result">
          <span>Loan Total Interest Paid:</span>
          <span>{formatCurrency(calculateLoanTotalInterestPaid())}</span>
        </div>
      </div>
    </div>
  );
}

export default Credit;