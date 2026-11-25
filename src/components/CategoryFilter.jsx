import { CATEGORIES } from "./ExpenseForm";

const SearchIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" />
  </svg>
);

export default function CategoryFilter({ value, onChange, onSearch }) {
  return (
    <div
      className="category-filter mb-4 flex flex-wrap gap-3 md:ml-4 md:flex-nowrap md:gap-2"
      role="group"
      aria-label="Filter by category"
    >
      {/* Search icon on the far left */}
      <button
        type="button"
        className="btn flex items-center justify-center md:px-3"
        onClick={onSearch}
        aria-label="Search expenses"
        title="Search expenses"
      >
        <SearchIcon />
      </button>

      {["All", ...CATEGORIES].map((c) => (
        <button
          key={c}
          className={`btn whitespace-nowrap md:px-3 ${
            c === value ? "border-brand bg-brand text-white" : ""
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