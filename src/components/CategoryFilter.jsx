
import { CATEGORIES } from "./ExpenseForm";

export default function CategoryFilter({ value, onChange }) {
  return (
    <div
      className="category-filter mb-4 flex flex-wrap gap-3"
      role="group"
      aria-label="Filter by category"
    >
      {["All", ...CATEGORIES].map((c) => (
        <button
          key={c}
          className={`btn ${
            c === value
              ? "border-brand bg-brand text-white"
              : ""
          }`}
          onClick={() => onChange(c)}
        >
          {c === value && "▶ "}
          {c}
        </button>
      ))}
    </div>
  );
}
