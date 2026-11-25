import ExpenseItem from "./ExpenseItem";

export default function ExpenseList({ expenses, onEdit, onDelete }) {
  if (expenses.length === 0) {
    return (
      <p className="border-2 border-dashed border-white p-6 text-center text-white">
        No matching expenses found.
      </p>
    );
  }
  return (
    <ul className="grid gap-3">
      {expenses.map((e) => (
        <ExpenseItem key={e.id} expense={e} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ul>
  );
}