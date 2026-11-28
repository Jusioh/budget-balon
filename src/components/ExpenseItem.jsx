import { useState } from "react";

const iconProps = {
  viewBox: "0 0 24 24",
  width: "20",
  height: "20",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2.5",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true"
};

const EditIcon = () => (
  <svg {...iconProps}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
  </svg>
);

const TrashIcon = () => (
  <svg {...iconProps}>
    <path d="M3 6h18" />
    <path d="M8 6V4h8v2" />
    <path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6M14 11v6" />
  </svg>
);

const CheckIcon = () => (
  <svg {...iconProps}>
    <path d="M5 13l4 4L19 7" />
  </svg>
);

const CloseIcon = () => (
  <svg {...iconProps}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export default function ExpenseItem({ expense, onEdit, onDelete }) {
  const [asking, setAsking] = useState(false);

  return (
    <li className="expense-item card">

      {/* Description and category */}
      <div className="expense-details">
        <strong title={expense.description}>
          {expense.description}
        </strong>

        <small className="block text-muted">
          {expense.category}, {expense.date}
        </small>
      </div>

      {/* Amount */}
      <span className="expense-amount">
        ₱{expense.amount.toFixed(2)}
      </span>

      {/* Action buttons */}
      <div className="expense-actions">

        {asking ? (
          <>
            <button
              type="button"
              className="btn text-danger flex items-center justify-center"
              onClick={() => onDelete(expense.id)}
              aria-label="Confirm delete"
              title="Confirm delete"
            >
              <CheckIcon />
            </button>

            <button
              type="button"
              className="btn flex items-center justify-center"
              onClick={() => setAsking(false)}
              aria-label="Keep expense"
              title="Keep"
            >
              <CloseIcon />
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="btn flex items-center justify-center"
              onClick={() => onEdit(expense)}
              aria-label="Edit expense"
              title="Edit"
            >
              <EditIcon />
            </button>

            <button
              type="button"
              className="btn text-danger flex items-center justify-center"
              onClick={() => setAsking(true)}
              aria-label="Delete expense"
              title="Delete"
            >
              <TrashIcon />
            </button>
          </>
        )}

      </div>
    </li>
  );
}
