import { useState } from 'react';
import PropTypes from 'prop-types';

const ExpenseForm = ({ addTransaction }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && amount) {
      addTransaction({ type: 'expense', name, amount: parseFloat(amount) });
      setName('');
      setAmount('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-maroon-100 p-4 rounded shadow-md mb-4">
      <h2 className="text-lg font-bold text-maroon-700">Add Expense</h2>
      <input
        type="text"
        placeholder="Expense Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 my-2 border border-maroon-300 rounded"
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 my-2 border border-maroon-300 rounded"
      />
      <button type="submit" className="bg-maroon-500 text-white px-4 py-2 rounded">
        Add Expense
      </button>
    </form>
  );
};
ExpenseForm.propTypes = {
  addTransaction: PropTypes.func.isRequired,
};

export default ExpenseForm;
