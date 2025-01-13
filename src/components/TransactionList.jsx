import PropTypes from 'prop-types';
import { useState } from 'react';

const TransactionList = ({ transactions, deleteTransaction, updateTransaction }) => {
  const [editId, setEditId] = useState(null); // Tracks which transaction is being edited
  const [editName, setEditName] = useState('');
  const [editAmount, setEditAmount] = useState('');

  // Function to start editing a transaction
  const handleEdit = (transaction) => {
    setEditId(transaction.id);
    setEditName(transaction.name);
    setEditAmount(transaction.amount);
  };

  // Function to save the updated transaction
  const handleUpdate = (e) => {
    e.preventDefault();
    updateTransaction(editId, { name: editName, amount: parseFloat(editAmount) });
    setEditId(null);
    setEditName('');
    setEditAmount('');
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-maroon-700">Transactions</h2>
      <ul>
        {transactions.map((transaction) => {
          return (
            <li
              key={transaction.id}
              className={`p-3 my-2 flex justify-between items-center rounded ${
                transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
              }`}
            >
              {/* Transaction Details here */}
              <span className="text-md font-medium">
                {transaction.name} - ${transaction.amount}
              </span>
              
              {/* Buttons here */}
              <div className="flex gap-2">
                {editId === transaction.id ? (
                  <form onSubmit={handleUpdate} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="border p-1 rounded text-sm"
                      placeholder="Name"
                    />
                    <input
                      type="number"
                      value={editAmount}
                      onChange={(e) => setEditAmount(e.target.value)}
                      className="border p-1 rounded text-sm"
                      placeholder="Amount"
                    />
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition-all"
                    >
                      Save
                    </button>
                  </form>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(transaction)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition-all"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTransaction(transaction.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-all"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

TransactionList.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
    })
  ).isRequired,
  deleteTransaction: PropTypes.func.isRequired,
  updateTransaction: PropTypes.func.isRequired,
};

export default TransactionList;
