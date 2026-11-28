import ExpenseItem from "./ExpenseItem";

// Show a message when there are no expenses to display.
export default function ExpenseList({ expenses, onEdit, onDelete }) {
  if (expenses.length === 0) {
    return (
      <p className="border-2 border-dashed border-white p-6 text-center text-white">
        No matching expenses found.
      </p>
    );
  }

  return (
    <ul className="expense-list" aria-label="Expenses">
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
