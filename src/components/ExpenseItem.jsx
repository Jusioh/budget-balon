import { useState } from "react";

export default function ExpenseItem({ expense, onEdit, onDelete }) {
  const [asking, setAsking] = useState(false);

  return (
    <li className="card grid grid-cols-[1fr_auto] items-center gap-3 sm:grid-cols-[1fr_auto_auto]">
      <div>
        <strong>{expense.description}</strong>
        <small className="block text-muted">{expense.category}, {expense.date}</small>
      </div>
      <span className="font-bold">₱{expense.amount.toFixed(2)}</span>
      <div className="col-span-full flex flex-wrap gap-2 sm:col-auto">
        {asking ? (
          <>
            <button className="btn text-danger" onClick={() => onDelete(expense.id)}>Confirm delete</button>
            <button className="btn" onClick={() => setAsking(false)}>Keep</button>
          </>
        ) : (
          <>
            <button className="btn" onClick={() => onEdit(expense)}>Edit</button>
            <button className="btn text-danger" onClick={() => setAsking(true)}>Delete</button>
          </>
        )}
      </div>
    </li>
  );
}