import { Trash } from 'lucide-react';
import React from 'react';

function ExpenseListTable({ expenselist = [], onDelete }) {
  if (!expenselist || expenselist.length === 0) {
    return <p className="mt-3 text-gray-500">No expenses found.</p>;
  }

  return (
    <div className="mt-3">
      <div className="grid grid-cols-4 bg-slate-300 p-4 font-bold">
        <p>Name</p>
        <p>Amount</p>
        <p>Date</p>
        <p>Action</p>
      </div>
      {expenselist.map((expense, index) => (
        <div
          key={expense.id || index}
          className={`grid grid-cols-4 p-4 ${index % 2 === 0 ? 'bg-slate-100' : 'bg-slate-200'}`}
        >
          <p>{expense.name}</p>
          <p>₹{expense.amount}</p>
          <p>{expense.createdAt ? new Date(expense.createdAt).toLocaleDateString() : 'N/A'}</p>
          <button onClick={() => onDelete && onDelete(expense.id)}>
            <Trash className="text-red-600 cursor-pointer hover:text-red-800" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default ExpenseListTable;
