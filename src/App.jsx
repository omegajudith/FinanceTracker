import { useState, useEffect } from 'react';
import Header from './components/Header';
import IncomeForm from './components/IncomeForm';
import ExpenseForm from './components/ExpenseForm';
import TransactionList from './components/TransactionList';
import PieChart from './components/PieChart';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

function App() {
  // State to store transactions
  const [transactions, setTransactions] = useState([]);

  // Load transactions from localStorage on component mount
  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem('transactions'));
    if (storedTransactions) {
      setTransactions(storedTransactions);
    }
  }, []);

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Function to add a new transaction
  const addTransaction = (transaction) => {
    setTransactions([...transactions, { id: uuidv4(), ...transaction }]);
  };

  // Function to delete a transaction
  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };

  // Function to update a transaction
  const updateTransaction = (id, updatedTransaction) => {
    setTransactions(
      transactions.map((transaction) =>
        transaction.id === id ? { ...transaction, ...updatedTransaction } : transaction
      )
    );
  };

  // Calculate total income, total expenses, and balance
  const totalIncome = transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const balance = totalIncome - totalExpenses;

  // Calculate expense ratio and determine background color
  const expenseRatio = totalIncome > 0 ? totalExpenses / totalIncome : 1; // Avoid division by zero
  const expenseColor = (() => {
    if (expenseRatio < 0.5) return '#4CAF50'; // Green (low expenses)
    if (expenseRatio < 0.75) return '#FFEB3B'; // Yellow (moderate expenses)
    return '#F44336'; // Red (high expenses)
  })();

  // Determine warning message based on expense ratio
  const financialHealthMessage = (() => {
    if (expenseRatio < 0.5) return 'Good financial health! Keep it up!';
    if (expenseRatio < 0.75) return 'Caution: You are spending a lot.';
    return 'Warning: Your expenses are exceeding your income!';
  })();

  return (
    <div className="container">
      <Header />
      {/* Summary Section */}
      <div className="card summary" style={{ backgroundColor: expenseColor }}>
        <h2>Summary</h2>
        <p><strong>Total Income:</strong> ${totalIncome}</p>
        <p><strong>Total Expenses:</strong> ${totalExpenses}</p>
        <p><strong>Balance:</strong> ${balance}</p>
        <p style={{ fontWeight: 'bold', marginTop: '10px' }}>{financialHealthMessage}</p>
      </div>
      {/* Forms for Adding Transactions */}
      <div className="card">
        <div style={{ display: 'flex', gap: '20px' }}>
          <IncomeForm addTransaction={addTransaction} />
          <ExpenseForm addTransaction={addTransaction} />
        </div>
      </div>
      {/* Lists for Income and Expenses */}
      <div className="card">
        <h2>Income</h2>
        <TransactionList
          transactions={transactions.filter((t) => t.type === 'income')}
          deleteTransaction={deleteTransaction}
          updateTransaction={updateTransaction}
        />
      </div>
      <div className="card">
        <h2>Expenses</h2>
        <TransactionList
          transactions={transactions.filter((t) => t.type === 'expense')}
          deleteTransaction={deleteTransaction}
          updateTransaction={updateTransaction}
        />
      </div>
      {/* Pie Chart */}
      <div className="card">
        <PieChart transactions={transactions} />
      </div>
    </div>
  );
}

export default App;
